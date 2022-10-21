import {
  Mesh,
  WebGLRenderer,
  ShaderMaterial,
  Camera,
  Scene,
  Vector3,
  DataTexture,
  RawShaderMaterial,
  Box3,
  Material,
  MeshStandardMaterial,
  Color,
  WebGLRenderTarget,
  Vector2,
  Matrix4,
} from "three";
import * as THREE from "three";
import { BVHNode, constructBVH, Face } from "../bvh";
import computeFrag from "!!raw-loader!./compute_frag.glsl";
import computeVert from "!!raw-loader!./compute_vert.glsl";
import accFrag from "!!raw-loader!./acc_frag.glsl";
import accVert from "!!raw-loader!./acc_vert.glsl";

const SMOOTH_NORMALS_FLAG = 1;

type FaceData = {
  materialIndex: number;
  normalsIndex: number;
};

export class PathTracer {
  private _computeShader: ShaderMaterial;
  private _accShader: ShaderMaterial;

  private _computeScene: Scene;
  private _computeCamera: Camera;

  private _textures: {
    faces?: DataTexture;
    normals?: DataTexture;
    bvhNodes?: DataTexture;
    materials?: DataTexture;
  } = {};

  private _targets: {
    cur: WebGLRenderTarget;
    prev: WebGLRenderTarget;
    acc: WebGLRenderTarget;
  };

  private _scene?: Scene;

  private _nPasses = 0;

  private _prevCamMatrix = new Matrix4();

  constructor(private _renderer: WebGLRenderer) {
    this._computeShader = new RawShaderMaterial({
      vertexShader: computeVert,
      fragmentShader: computeFrag,
      uniforms: {
        faces: { value: null },
        normals: { value: null },
        bvhNodes: { value: null },
        materials: { value: null },

        matrixWorld: { value: null },
        projectionMatrixInverse: { value: null },

        seed: { value: null },
      },
      defines: {
        N_BVH_NODES: 0,
        SMOOTH_NORMALS_FLAG,
        PI: Math.PI,
      },
      glslVersion: THREE.GLSL3,
    });

    this._accShader = new RawShaderMaterial({
      vertexShader: accVert,
      fragmentShader: accFrag,
      uniforms: {
        cur: { value: null },
        prev: { value: null },
        acc: { value: null },

        mode: { value: 0 },
        alpha: { value: 1 },
      },
      glslVersion: THREE.GLSL3,
    });

    this._computeCamera = new Camera();
    this._computeCamera.position.z = 1;
    this._computeScene = new Scene();
    const mesh = new Mesh(new THREE.PlaneGeometry(2, 2), this._computeShader);
    this._computeScene.add(mesh);

    const { width, height } = _renderer.getSize(new Vector2());
    this._targets = {
      cur: new WebGLRenderTarget(width, height, { depthBuffer: false }),
      prev: new WebGLRenderTarget(width, height, { depthBuffer: false }),
      acc: new WebGLRenderTarget(width, height, { depthBuffer: false }),
    };
  }

  resize(width: number, height: number) {
    Object.values(this._targets).forEach((target) =>
      target.setSize(width, height)
    );
  }

  private disposeTextures() {
    Object.values(this._textures).forEach((texture) => texture.dispose());
    this._textures = {};
  }

  private bindTextures() {
    Object.entries(this._textures).forEach(([name, texture]) => {
      texture.needsUpdate = true;
      this._computeShader.uniforms[name].value = texture;
    });
  }

  private _extractSceneData(scene: Scene) {
    const materials: Material[] = [];
    const materialIndices = new Map<string, number>();
    const getMaterialIndex = (material: Material) => {
      if (materialIndices.has(material.uuid))
        return materialIndices.get(material.uuid)!;
      const i = materials.length;
      materials.push(material);
      materialIndices.set(material.uuid, i);
      return i;
    };

    const faces: Face<FaceData>[] = [];
    const normals: [Vector3, Vector3, Vector3][] = [];

    scene.traverse((object) => {
      if ((object as Mesh).isMesh) {
        const mesh = object as Mesh;

        // Bake transforms into geometry
        mesh.updateWorldMatrix(true, true);
        let geometry = mesh.geometry.clone();
        geometry.applyMatrix4(mesh.matrixWorld);

        // Get non-indexed verts
        if (geometry.index) geometry = geometry.toNonIndexed();
        const position = geometry.getAttribute("position");
        const normal = geometry.getAttribute("normal");

        for (let i = 0; i < position.count * 3; i += 9) {
          // Register material
          let materialIndex: number;
          let material: Material;
          if (Array.isArray(mesh.material)) {
            const group = geometry.groups.find(
              ({ start, count }) => i >= start && i < start + count
            );
            if (typeof group?.materialIndex !== "number") throw new Error();
            materialIndex = getMaterialIndex(
              (material = mesh.material[group.materialIndex])
            );
          } else {
            materialIndex = getMaterialIndex((material = mesh.material));
          }

          // Copy vertices
          const verts = [
            new Vector3(
              position.array[i + 0],
              position.array[i + 1],
              position.array[i + 2]
            ),
            new Vector3(
              position.array[i + 3],
              position.array[i + 4],
              position.array[i + 5]
            ),
            new Vector3(
              position.array[i + 6],
              position.array[i + 7],
              position.array[i + 8]
            ),
          ] as [Vector3, Vector3, Vector3];

          // Copy normals (if needed)
          let normalsIndex = -1;
          if ((material as any).smoothNormals) {
            normalsIndex = normals.length;
            normals.push([
              new Vector3(
                normal.array[i + 0],
                normal.array[i + 1],
                normal.array[i + 2]
              ),
              new Vector3(
                normal.array[i + 3],
                normal.array[i + 4],
                normal.array[i + 5]
              ),
              new Vector3(
                normal.array[i + 6],
                normal.array[i + 7],
                normal.array[i + 8]
              ),
            ] as [Vector3, Vector3, Vector3]);
          }

          faces.push({ verts, data: { materialIndex, normalsIndex } });
        }
      }
    });
    return { faces, normals, materials };
  }

  loadScene(scene?: Scene) {
    if (scene) this._scene = scene;
    if (!this._scene) return;

    // Free old textures
    this.disposeTextures();

    // Extract face data from geometry
    const { faces, normals, materials } = this._extractSceneData(this._scene);

    // Create BVH
    const bvh = constructBVH(faces);

    // Collate BVH Data
    const facesArr: Face<FaceData>[] = [];
    const nodesArr: { aabb: Box3; element: number; next: number }[] = [];

    const collateBVH = (node: BVHNode<FaceData>) => {
      if (node.children) {
        const data = { aabb: node.aabb, element: 1, next: 1 };
        nodesArr.push(data);

        if (node.children[0].element) {
          const i = facesArr.length;
          facesArr.push(node.children[0].element);
          data.element = -i;
        } else {
          collateBVH(node.children[0]);
        }

        if (node.children[1].element) {
          const i = facesArr.length;
          facesArr.push(node.children[1].element);
          data.next = -i;
        } else {
          collateBVH(node.children[1]);
          data.next = nodesArr.length;
        }
      }
    };
    collateBVH(bvh);

    // Encode data into textures
    this._textures.faces = new DataTexture(
      new Float32Array(
        facesArr.flatMap((face) => [
          face.verts[0].x,
          face.verts[0].y,
          face.verts[0].z,
          face.data.materialIndex,
          face.verts[1].x,
          face.verts[1].y,
          face.verts[1].z,
          face.data.normalsIndex,
          face.verts[2].x,
          face.verts[2].y,
          face.verts[2].z,
          1,
        ])
      ),
      3,
      facesArr.length,
      THREE.RGBAFormat,
      THREE.FloatType
    );

    this._textures.normals = new DataTexture(
      new Float32Array(
        normals.flatMap((n) => [
          n[0].x,
          n[0].y,
          n[0].z,
          1,
          n[1].x,
          n[1].y,
          n[1].z,
          1,
          n[2].x,
          n[2].y,
          n[2].z,
          1,
        ])
      ),
      3,
      normals.length,
      THREE.RGBAFormat,
      THREE.FloatType
    );

    this._textures.bvhNodes = new DataTexture(
      new Float32Array(
        nodesArr.flatMap((n) => [
          ...n.aabb.min.toArray(),
          n.element,
          ...n.aabb.max.toArray(),
          n.next,
        ])
      ),
      2,
      nodesArr.length,
      THREE.RGBAFormat,
      THREE.FloatType
    );

    this._textures.materials = new DataTexture(
      new Float32Array(
        materials.flatMap((mat) => {
          let flags = 0;

          if ((mat as any).smoothNormals) flags |= SMOOTH_NORMALS_FLAG;

          const mat2 = mat as Partial<MeshStandardMaterial>;
          const color = mat2.color ?? new Color();

          return [
            flags,
            mat2.metalness ?? 0,
            0,
            0,
            color.r,
            color.g,
            color.b,
            1.0,
          ];
        })
      ),
      2,
      materials.length,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    this._textures.materials.unpackAlignment = 1;

    // Bind textures to shader
    this.bindTextures();
    this._computeShader.defines.N_BVH_NODES = nodesArr.length;
  }

  render(camera: Camera) {
    if (this._scene) {
      camera.updateMatrixWorld();

      if (!camera.matrixWorld.equals(this._prevCamMatrix)) {
        this._nPasses = 0;
        this._prevCamMatrix.copy(camera.matrixWorld);
      }

      // this._renderer.clear();

      const prevRT = this._renderer.getRenderTarget();

      ////////////////////
      /// COMPUTE PASS ///
      ////////////////////

      this._computeScene.overrideMaterial = null;
      this._computeShader.uniforms.projectionMatrixInverse.value =
        camera.projectionMatrixInverse;
      this._computeShader.uniforms.matrixWorld.value = camera.matrixWorld;
      this._computeShader.uniforms.seed.value = [
        Math.random(),
        Math.random(),
        Math.random(),
        Math.random(),
      ];

      this._renderer.setRenderTarget(this._targets.cur);
      this._renderer.render(this._computeScene, this._computeCamera);

      /////////////////////////
      /// ACCUMULATION PASS ///
      /////////////////////////

      this._computeScene.overrideMaterial = this._accShader;
      this._accShader.uniforms.cur.value = this._targets.cur.texture;
      this._accShader.uniforms.prev.value = this._targets.prev.texture;
      this._accShader.uniforms.alpha.value = 1 / (this._nPasses + 1);
      this._accShader.uniforms.mode.value = 0;

      this._renderer.setRenderTarget(this._targets.acc);
      this._renderer.render(this._computeScene, this._computeCamera);

      ///////////////////
      /// RENDER PASS ///
      ///////////////////

      this._accShader.uniforms.acc.value = this._targets.acc.texture;
      this._accShader.uniforms.mode.value = 1;

      this._renderer.setRenderTarget(prevRT);
      this._renderer.render(this._computeScene, this._computeCamera);

      //////////
      // SWAP //
      //////////

      [this._targets.acc, this._targets.prev] = [
        this._targets.prev,
        this._targets.acc,
      ];

      this._nPasses++;
    }
  }
}
