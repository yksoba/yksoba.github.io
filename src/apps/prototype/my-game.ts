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
    {
      const light = new THREE.PointLight(new Color(1, 1, 1), 1);
      light.position.set(0, 3, 0);
      light.rotateX(-Math.PI / 2);

      this.scene.add(light);
    }

    // {
    //   const loader = new GLTFLoader();

    //   loader.load("/assets/prototype/cornell-1.glb", (gltf) => {
    //     this.scene.add(gltf.scene);
    //     this.pathTracer.updateScene(this.scene);
    //   });
    // }

    {
      const geom = new THREE.IcosahedronGeometry(1);
      const mat = new THREE.MeshPhongMaterial();
      const mesh = new Mesh(geom, mat);
      this.scene.add(mesh);
    }

    this.pathTracer.updateScene(this.scene);

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

class PathTracer {
  private _computeShader: ShaderMaterial;
  private _computeScene: Scene;
  private _computeCamera: Camera;

  private _indsTex?: DataTexture;
  private _vertsTex?: DataTexture;
  private _scene?: Scene;

  constructor(private _renderer: WebGLRenderer) {
    this._computeShader = new RawShaderMaterial({
      vertexShader: PathTracer._vertexShader,
      fragmentShader: PathTracer._fragmentShader,
      uniforms: {
        inds: { value: null },
        verts: { value: null },
        matrixWorld: { value: null },
        projectionMatrixInverse: { value: null },
      },
      defines: {
        N_FACES: 0,
      },
    });

    this._computeCamera = new Camera();
    this._computeCamera.position.z = 1;
    this._computeScene = new Scene();
    const mesh = new Mesh(new THREE.PlaneGeometry(2, 2), this._computeShader);
    this._computeScene.add(mesh);
  }

  updateScene(scene?: Scene) {
    if (scene) this._scene = scene;
    if (!this._scene) return;

    // Free old textures
    if (this._indsTex) this._indsTex.dispose();
    if (this._vertsTex) this._vertsTex.dispose();

    // Extract geometry data from messages
    let numFaces = 0;
    let offset = 0;
    const indsArr: number[] = [];
    const vertsArr: number[] = [];

    this._scene.traverse((object) => {
      if ((object as Mesh).isMesh) {
        const mesh = object as Mesh;

        const geometry = mesh.geometry;
        const position = geometry.getAttribute("position");

        // Copy indices
        if (geometry.index) {
          for (let i = 0; i < geometry.index.count; i += 3) {
            indsArr.push(geometry.index.array[i + 0] + offset);
            indsArr.push(geometry.index.array[i + 1] + offset);
            indsArr.push(geometry.index.array[i + 2] + offset);

            numFaces++;
          }
        } else {
          console.log(
            `Note: Geometry for mesh ${
              mesh.name ? mesh.name + " " : ""
            }is not indexed.`
          );

          for (let i = 0; i < position.count; i += 3) {
            indsArr.push(i + 0 + offset);
            indsArr.push(i + 1 + offset);
            indsArr.push(i + 2 + offset);

            numFaces++;
          }
        }

        // Copy vertices
        for (
          let i = 0;
          i < position.count * position.itemSize;
          i += position.itemSize
        ) {
          vertsArr.push(position.array[i + 0]);
          vertsArr.push(position.array[i + 1]);
          vertsArr.push(position.array[i + 2]);
          vertsArr.push(1);

          offset++;
        }
      }
    });

    // Create textures
    this._indsTex = new DataTexture(
      new Int16Array(indsArr),
      3,
      numFaces,
      THREE.RGBFormat,
      THREE.IntType
    );
    this._indsTex.needsUpdate = true;

    this._vertsTex = new DataTexture(
      new Float32Array(vertsArr),
      3,
      numFaces,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    this._vertsTex.needsUpdate = true;

    // Bind textures to shader
    // this._computeShader.uniforms.inds.value = this._indsTex;
    this._computeShader.uniforms.verts.value = this._vertsTex;
    this._computeShader.defines.N_FACES = numFaces;
  }

  render(camera: Camera) {
    if (this._scene) {
      // this._renderer.render(this._scene, camera);

      this._computeShader.uniforms.projectionMatrixInverse.value =
        camera.projectionMatrixInverse;

      camera.updateMatrixWorld();
      this._computeShader.uniforms.matrixWorld.value = camera.matrixWorld;

      this._renderer.render(this._computeScene, this._computeCamera);
    }
  }

  private static _vertexShader = `
    attribute vec3 position;

    uniform mat4 matrixWorld;
    uniform mat4 projectionMatrixInverse;

    varying vec3 vO;
    varying vec3 vD;

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

    uniform sampler2D verts;
    varying vec3 vO;
    varying vec3 vD;
    
    const vec2 uv = vec2(1.0/3.0, 1.0/float(N_FACES));

    vec3 intersect_triangle(vec3 o, vec3 d, vec3 a, vec3 b, vec3 c) {
      vec3 t = o-a;
      vec3 e1 = b-a;
      vec3 e2 = c-a;
      vec3 p = cross(d,e2);
      vec3 q = cross(t,e1);

      return vec3(dot(q,e2), dot(p,t), dot(q,d)) / dot(p,e1);
    }

    void main() {
      vec3 color;

      vec3 o = vO;
      vec3 d = normalize(vD);

      float t = 1000.0;

      for(int i = 0; i < N_FACES; i++) {
        vec3 a = texture2D(verts, vec2(0,i)*uv).xyz;
        vec3 b = texture2D(verts, vec2(1,i)*uv).xyz;
        vec3 c = texture2D(verts, vec2(2,i)*uv).xyz;

        vec3 xyz = intersect_triangle(o, d, a, b, c);

        if(
             xyz.y > 0.0 
          && xyz.z > 0.0
          && xyz.y + xyz.z < 1.0 
          && xyz.x > 0.0
          && xyz.x < t
        ) {
          color = vec3(1.0, 1.0, 1.0) * xyz.x / 4.0;
          t = xyz.x;
        }
      }

      gl_FragColor = vec4(color, 1.0);
    }

  `;
}
