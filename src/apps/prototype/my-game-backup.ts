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
} from "three";
import * as THREE from "three";
import { ThreeGame } from "./three-game";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  GPUComputationRenderer,
  Variable,
} from "three/examples/jsm/misc/GPUComputationRenderer";

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
    // this.renderer.shadowMap.enabled = true;
    // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    /////////////
    // SHADERS //
    /////////////

    /////////////
    // HELPERS //
    /////////////

    {
      const axesHelper = new THREE.AxesHelper(1);
      this.layer(1).add(axesHelper);
    }

    // {
    //   const size = 10;
    //   const divisions = 10;
    //   const gridHelper = new THREE.GridHelper(size, divisions);
    //   this.scene.add(gridHelper);
    // }

    /////////////
    // OBJECTS //
    /////////////

    // {
    //   const geom = new THREE.SphereGeometry(1);
    //   const mat = new THREE.MeshPhongMaterial();
    //   const mesh = new Mesh(geom, mat);
    //   mesh.position.set(0, 1, 0);
    //   this.scene.add(mesh);
    // }
    // {
    //   const geom = new THREE.PlaneGeometry(10, 10);
    //   const mat = new THREE.MeshPhongMaterial();
    //   const mesh = new Mesh(geom, mat);
    //   mesh.rotateX(-Math.PI / 2);
    //   this.scene.add(mesh);
    // }

    //////////////
    // LIGHTING //
    //////////////

    // {
    //   const light = new THREE.DirectionalLight(0xff22aa);
    //   light.castShadow = true;
    //   light.position.set(3, 5, 1);
    //   this.scene.add(light);
    // }

    // {
    //   const light = new THREE.PointLight(0x22aaff, 1, 10, Math.PI / 8);
    //   light.castShadow = true;
    //   light.position.set(-5, 5, 1);
    //   this.scene.add(light);
    // }

    // {
    // const light = new THREE.AmbientLight(0xa5aeb0, 0.5);
    // this.scene.add(light);
    // }

    {
      // const light = new THREE.RectAreaLight(new Color(1, 1, 1), 1, 2, 2);
      const light = new THREE.PointLight(new Color(1, 1, 1), 1);
      light.position.set(0, 3, 0);
      light.rotateX(-Math.PI / 2);

      this.scene.add(light);
    }

    {
      const loader = new GLTFLoader();

      loader.load("/assets/prototype/cornell-1.glb", (gltf) => {
        this.scene.add(gltf.scene);
        this.pathTracer.updateScene(this.scene);
      });
    }

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

    this.pathTracer.resize(width, height);
  }

  tick(dt: number) {}
}

class PathTracer {
  private _gpuCompute?: GPUComputationRenderer;
  private _computeShader?: ShaderMaterial;

  private _vertsTex?: DataTexture;
  private _idxTex?: DataTexture;

  private _scene?: Scene;

  constructor(private _renderer: WebGLRenderer) {}

  resize(width: number, height: number) {
    if (this._gpuCompute) this._gpuCompute.dispose();

    this._gpuCompute = new GPUComputationRenderer(
      width,
      height,
      this._renderer
    );

    this._computeShader = this._gpuCompute.createShaderMaterial(
      PathTracer._fragmentShader,
      { geometry: { value: null } }
    );

    this.updateScene();
  }

  updateScene(scene?: Scene) {
    if (scene) this._scene = scene;
    if (!this._scene) return;

    // Free old textures
    if (this._vertsTex) this._vertsTex.dispose();
    if (this._idxTex) this._idxTex.dispose();

    // Extract geometry data from mesges
    let offset = 0;
    const indexArr: number[] = [];
    const positionArr: number[] = [];

    this._scene.traverse((object) => {
      if ((object as Mesh).isMesh) {
        const mesh = object as Mesh;
        const index = mesh.geometry.getIndex();
        const position = mesh.geometry.getAttribute("position");

        if (index) {
          // Copy indices
          for (let i = 0; i < index.count; i++) {
            indexArr.push(index.array[i]);
          }
        } else {
          // If geometry is not indexed, assume every three vertices makes a face
          for (let i = 0; i < position.count / position.itemSize; i++) {
            indexArr.push(i + offset);
          }
        }

        // Copy vertices
        for (let i = 0; i < position.count; i++) {
          positionArr.push(position.array[i]);
        }

        // Advance offset by #vertices
        offset += position.count / position.itemSize;
      }
    });

    // this._idxTex = new DataTexture(
    //   new Int16Array(indexArr),
    //   3,
    //   indexArr.length / 3
    // );

    // const positionTex = new DataTexture(
    //   position.array as Float32Array,
    //   3,
    //   position.count / 2,
    //   THREE.RGBFormat,
    //   THREE.FloatType
    // );

    // this._geomTex.
  }

  render(camera: Camera) {
    if (this._scene) {
      this._renderer.render(this._scene, camera);
    }
  }

  private static _fragmentShader = `
  void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    gl_FragColor = vec4(uv, 0.0, 1.0);
  }
  `;
}
