import {
  PerspectiveCamera,
  Mesh,
  Object3D,
  Light,
  WebGLRenderer,
  ShaderMaterial,
  Camera,
  Scene,
  Vector3,
  Color,
  mergeUniforms,
  UniformsUtils,
  Texture,
  DataTexture,
  RawShaderMaterial,
  Vector4,
  Box3,
  MeshBasicMaterial,
  Material,
} from "three";
import * as THREE from "three";
import { ThreeGame } from "./three-game";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  GPUComputationRenderer,
  Variable,
} from "three/examples/jsm/misc/GPUComputationRenderer";
import { Box } from "@mui/system";
import { BVHNode, constructBVH, Face } from "./bvh";

const persistent: { camera?: PerspectiveCamera; controls?: OrbitControls } = ((
  window as any
).persistent ??= {});

export class MyGame extends ThreeGame {
  declare camera: PerspectiveCamera;

  controls: OrbitControls = new OrbitControls(
    this.camera,
    this.renderer.domElement
  );

  pathTracer = new PathTracer(this.renderer);

  init() {
    {
      const light = new THREE.PointLight(new Color(1, 1, 1), 1);
      light.position.set(0, 3, 0);
      light.rotateX(-Math.PI / 2);

      this.scene.add(light);
    }

    {
      const loader = new GLTFLoader();

      loader.load("/assets/prototype/cornell-1.glb", (gltf) => {
        this.scene.add(gltf.scene);

        this.scene.traverse((object) => {
          if (object.name === "Sphere") {
            ((object as Mesh).material as any).smoothNormals = true;
          }
        });

        this.pathTracer.loadScene(this.scene);
      });
    }

    // {
    //   // const geom = new THREE.IcosahedronGeometry(1);
    //   const geom = new THREE.CylinderGeometry(1, 1, 2, 8, 2);
    //   const mat = new THREE.MeshPhongMaterial();
    //   const mesh = new Mesh(geom, mat);
    //   this.scene.add(mesh);
    // }

    // this.pathTracer.loadScene(this.scene);

    ////////////
    // CAMERA //
    ////////////

    this.camera = new PerspectiveCamera(75, 1, 0.1, 1000);
    if (persistent.camera) {
      this.camera.position.copy(persistent.camera.position);
      this.camera.rotation.copy(persistent.camera.rotation);
    } else {
      this.camera.position.set(15, 0, 0);
    }
    persistent.camera = this.camera;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    if (persistent.controls) {
      this.controls.target.copy(persistent.controls.target);
    } else {
      this.controls.target.set(0, 0, 0);
    }
    persistent.controls = this.controls;
  }

  render() {
    this.pathTracer.render(this.camera);
  }

  resize(width: number, height: number) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  tick(dt: number) {}
}

const SMOOTH_NORMALS_FLAG = 1;

class PathTracer {
  private _computeShader: ShaderMaterial;
  private _computeScene: Scene;
  private _computeCamera: Camera;

  private _textures: {
    faces?: DataTexture;
    bvhNodes?: DataTexture;
    materialFlags?: DataTexture;
  } = {};

  private _scene?: Scene;

  constructor(private _renderer: WebGLRenderer) {
    this._computeShader = new RawShaderMaterial({
      vertexShader: PathTracer._vertexShader,
      fragmentShader: PathTracer._fragmentShader,
      uniforms: {
        faces: { value: null },
        bvhNodes: { value: null },
        materialFlags: { value: null },

        matrixWorld: { value: null },
        projectionMatrixInverse: { value: null },
      },
      defines: {
        N_FACES: 0,
        N_BVH_NODES: 0,
        N_MATERIALS: 0,
        SMOOTH_NORMALS_FLAG,
      },
      glslVersion: THREE.GLSL3,
    });

    this._computeCamera = new Camera();
    this._computeCamera.position.z = 1;
    this._computeScene = new Scene();
    const mesh = new Mesh(new THREE.PlaneGeometry(2, 2), this._computeShader);
    this._computeScene.add(mesh);
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

  loadScene(scene?: Scene) {
    if (scene) this._scene = scene;
    if (!this._scene) return;

    // Free old textures
    this.disposeTextures();

    // Extract face data from geometry
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

    type FaceData = { materialIndex: number };
    const faces: Face<FaceData>[] = [];

    this._scene.traverse((object) => {
      if ((object as Mesh).isMesh) {
        const mesh = object as Mesh;

        // Bake transforms into geometry
        mesh.updateWorldMatrix(true, true);
        let geometry = mesh.geometry.clone();
        geometry.applyMatrix4(mesh.matrixWorld);

        // Get non-indexed verts
        if (geometry.index) geometry = geometry.toNonIndexed();
        const position = geometry.getAttribute("position");

        console.log(mesh);

        // Copy vertices
        for (let i = 0; i < position.count * 3; i += 9) {
          let materialIndex: number;
          if (Array.isArray(mesh.material)) {
            const group = geometry.groups.find(
              ({ start, count }) => i >= start && i < start + count
            );
            if (typeof group?.materialIndex !== "number") throw new Error();
            materialIndex = getMaterialIndex(
              mesh.material[group.materialIndex]
            );
          } else {
            materialIndex = getMaterialIndex(mesh.material);
          }

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

          faces.push({ verts, data: { materialIndex } });
        }
      }
    });

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
          1,
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

    this._textures.materialFlags = new DataTexture(
      new Uint16Array(
        materials.map((mat) => {
          let flags = 0;

          if ((mat as any).smoothNormals) flags |= SMOOTH_NORMALS_FLAG;

          return flags;
        })
      ),
      1,
      materials.length,
      THREE.RGBAIntegerFormat,
      THREE.UnsignedIntType
    );

    // Bind textures to shader
    this.bindTextures();
    this._computeShader.defines.N_FACES = facesArr.length;
    this._computeShader.defines.N_BVH_NODES = nodesArr.length;
    this._computeShader.defines.N_MATERIALS = materials.length;
  }

  render(camera: Camera) {
    if (this._scene) {
      this._computeShader.uniforms.projectionMatrixInverse.value =
        camera.projectionMatrixInverse;

      camera.updateMatrixWorld();
      this._computeShader.uniforms.matrixWorld.value = camera.matrixWorld;

      this._renderer.render(this._computeScene, this._computeCamera);
    }
  }

  private static _vertexShader = `
    in vec3 position;

    uniform mat4 matrixWorld;
    uniform mat4 projectionMatrixInverse;

    out vec3 vO;
    out vec3 vD;

    void main() {
      vec4 o4 = matrixWorld * vec4(0.0, 0.0, 0.0, 1.0);
      vO = o4.xyz / o4.w;

      vec4 p4 = matrixWorld * projectionMatrixInverse * vec4(position.xy, 0.5, 1.0);
      vec3 p = p4.xyz / p4.w;

      vD = normalize(p - vO);

      gl_Position = vec4(position, 1.0);
    }
`;

  private static _fragmentShader = `    
    precision highp float;

    uniform sampler2D faces;
    uniform sampler2D bvhNodes;
    uniform highp usampler2D materialFlags;

    in vec3 vO;
    in vec3 vD;

    out vec4 fragColor;
    
    vec4 get_face_raw(int face, int j) {
      return texelFetch(faces, ivec2(j, face), 0);
    }

    void unpack_face(int face, out vec3 v1, out vec3 v2, out vec3 v3, out int material) {
      vec4 tri0 = get_face_raw(face, 0);
      vec4 tri1 = get_face_raw(face, 1);
      vec4 tri2 = get_face_raw(face, 2);

      v1 = tri0.xyz;
      v2 = tri1.xyz;
      v3 = tri2.xyz;

      material = int(tri0.w);
    }

    vec4 get_node_raw(int node, int j) {
      return texelFetch(bvhNodes, ivec2(j, node), 0);
    }

    void unpack_node(int node, out vec3 mn, out vec3 mx, out int elem, out int next) {
      vec4 node0 = get_node_raw(node, 0);
      mn = node0.xyz;
      elem = int(node0.w);

      vec4 node1 = get_node_raw(node, 1);
      mx = node1.xyz;
      next = int(node1.w);
    }

    bool intersect_box(vec3 o, vec3 inv_d, vec3 mn, vec3 mx) {
      vec3 t1 = (mn - o) * inv_d;
      vec3 t2 = (mx - o) * inv_d;

      float tmin = min(t1.x, t2.x);
      float tmax = max(t1.x, t2.x);

      tmin = max(tmin, min(t1.y, t2.y));
      tmax = min(tmax, max(t1.y, t2.y));

      tmin = max(tmin, min(t1.z, t2.z));
      tmax = min(tmax, max(t1.z, t2.z));

      return tmax >= tmin;
    }

    vec3 intersect_tri(vec3 o, vec3 d, vec3 a, vec3 b, vec3 c) {
      vec3 t = o-a;
      vec3 e1 = b-a;
      vec3 e2 = c-a;
      vec3 p = cross(d,e2);
      vec3 q = cross(t,e1);

      return vec3(dot(q,e2), dot(p,t), dot(q,d)) / dot(p,e1);
    } 

    bool intersect_tri2(vec3 o, vec3 d, vec3 a, vec3 b, vec3 c, inout float t) {
      vec3 tuv = intersect_tri(o, d, a, b, c);

      if (
           tuv.y >= 0.0 
        && tuv.z >= 0.0 
        && tuv.y + tuv.z <= 1.0 
        && tuv.x > 0.0
        && (t < 0.0 || tuv.x < t)
      ) {
        t = tuv.x;
        return true;
      } else {
        return false;
      }
    }

    void intersect_tri3(vec3 o, vec3 d, int i, inout float t, inout vec4 color) {
      vec3 a, b, c;
      int material;
      unpack_face(i,a,b,c,material);
      if (intersect_tri2(o,d,a,b,c,t)) {

        vec3 normal = normalize(cross(b-a,c-a));
        color = vec4((normal/2.0 + 0.5) * t / 20.0, 1.0);

      }
    }

    void cast_ray(vec3 o, vec3 d, out vec4 color) {
      vec3 inv_d = 1.0/d;
      float t = -1.0;
      int node = 0;

      for (int i = 0; i < N_BVH_NODES; i++) {
        if (node >= N_BVH_NODES) break;

        vec3 mn, mx;
        int elem, next;
        unpack_node(node, mn, mx, elem, next);

        node++;

        if (elem <= 0) { intersect_tri3(o,d,-elem,t,color); }
        if (next <= 0) { intersect_tri3(o,d,-next,t,color); } 
        else if (!intersect_box(o, inv_d, mn, mx)) {
          node = next;
        }
      }
    }

    void main() {
      vec4 color;

      vec3 o = vO;
      vec3 d = normalize(vD);
      
      cast_ray(o,d,color);

      fragColor = color;
    }
  `;
}
