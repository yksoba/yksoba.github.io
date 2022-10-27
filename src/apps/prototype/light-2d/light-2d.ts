import {
  Mesh,
  WebGLRenderer,
  ShaderMaterial,
  Camera,
  Scene,
  RawShaderMaterial,
  WebGLRenderTarget,
  Vector2,
  Line,
  Box2,
  DataTexture,
} from "three";
import * as THREE from "three";
import computeFrag from "!!raw-loader!./compute_frag.glsl";
import computeVert from "!!raw-loader!./compute_vert.glsl";
import accFrag from "!!raw-loader!./acc_frag.glsl";
import accVert from "!!raw-loader!./acc_vert.glsl";
import { collateBVH, constructBVH } from "../bvh";

const CURVE_TYPE_LINEAR = 0;

export class Light2D {
  private _computeShader: ShaderMaterial;
  private _accShader: ShaderMaterial;
  private _computeScene: Scene;
  private _computeCamera: Camera;

  private _scene?: Scene;

  private _textures: {
    elems: DataTexture;
    nodes: DataTexture;
  };
  private _targets: {
    cur: WebGLRenderTarget;
    prev: WebGLRenderTarget;
    acc: WebGLRenderTarget;
  };

  private _nPasses = 0;

  constructor(private _renderer: WebGLRenderer) {
    this._computeShader = new RawShaderMaterial({
      vertexShader: computeVert,
      fragmentShader: computeFrag,
      uniforms: {
        matrixWorld: { value: null },
        projectionMatrixInverse: { value: null },
        randomSeed: { value: null },

        elems: { value: null },
        nodes: { value: null },
      },
      defines: {
        PI: Math.PI,
        CURVE_TYPE_LINEAR,
        N_ELEMS: 0,
        N_NODES: 0,
      },
      glslVersion: THREE.GLSL3,
    });

    this._accShader = new RawShaderMaterial({
      vertexShader: accVert,
      fragmentShader: accFrag,
      uniforms: {
        mode: { value: 0 },
        alpha: { value: 1 },

        cur: { value: null },
        prev: { value: null },
        acc: { value: null },
      },
      glslVersion: THREE.GLSL3,
    });

    this._computeCamera = new Camera();
    this._computeCamera.position.z = 1;
    this._computeScene = new Scene();
    const mesh = new Mesh(new THREE.PlaneGeometry(2, 2), this._computeShader);
    this._computeScene.add(mesh);

    const { width, height } = _renderer.getSize(new Vector2());
    this._textures = {
      elems: new DataTexture(null, width, height),
      nodes: new DataTexture(null, width, height),
    };
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
    this._nPasses = 0;
  }

  loadScene(scene?: Scene) {
    if (scene) this._scene = scene;
    if (!this._scene) return;

    // Extract lights and curve segments
    const curveSegments: {
      aabb: Box2;
      data: { type: "linear"; v1: Vector2; v2: Vector2 };
    }[] = [];

    scene!.traverse((obj) => {
      if ((obj as Line).isLine) {
        const line = obj as Line;
        const geometry = line.geometry.clone();

        line.updateWorldMatrix(true, true);
        geometry.applyMatrix4(line.matrixWorld);

        const position = geometry.getAttribute("position");
        for (let i = 0; i < position.count - 1; i++) {
          const x1 = position.array[i * position.itemSize + 0];
          const y1 = position.array[i * position.itemSize + 1];

          const x2 = position.array[(i + 1) * position.itemSize + 0];
          const y2 = position.array[(i + 1) * position.itemSize + 1];

          const v1 = new Vector2(x1, y1);
          const v2 = new Vector2(x2, y2);
          const aabb = new Box2().setFromPoints([v1, v2]);
          curveSegments.push({ aabb, data: { type: "linear", v1, v2 } });
        }
      }
    });

    // Create BVH
    const bvh = constructBVH(curveSegments);
    const { elems, nodes } = collateBVH(bvh);

    // Create Textures
    this._textures.elems.dispose();
    this._textures.elems = new DataTexture(
      new Float32Array(
        elems.flatMap((elem) => [
          elem.data.type === "linear" ? CURVE_TYPE_LINEAR : -1,
          elem.data.v1.x,
          elem.data.v1.y,
          0,
          elem.data.v2.x,
          elem.data.v2.y,
          0,
          0,
        ])
      ),
      2,
      elems.length,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    this._textures.elems.needsUpdate = true;
    this._computeShader.uniforms.elems.value = this._textures.elems;
    this._computeShader.defines.N_ELEMS = elems.length;

    this._textures.nodes.dispose();
    this._textures.nodes = new DataTexture(
      new Float32Array(
        nodes.flatMap((node) => [
          node.aabb.min.x,
          node.aabb.min.y,
          node.aabb.max.x,
          0,
          node.aabb.max.y,
          node.left ?? -1,
          node.right ?? -(node.next ?? nodes.length),
          0,
        ])
      ),
      2,
      nodes.length,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    this._textures.nodes.needsUpdate = true;
    this._computeShader.uniforms.nodes.value = this._textures.nodes;
    this._computeShader.defines.N_NODES = nodes.length;
  }

  render(camera: Camera) {
    camera.updateMatrixWorld();

    this._renderer.clear();
    const prevRT = this._renderer.getRenderTarget();

    ////////////////////
    /// COMPUTE PASS ///
    ////////////////////

    this._computeScene.overrideMaterial = null;
    this._computeShader.uniforms.projectionMatrixInverse.value =
      camera.projectionMatrixInverse;
    this._computeShader.uniforms.matrixWorld.value = camera.matrixWorld;
    this._computeShader.uniforms.randomSeed.value = [
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
