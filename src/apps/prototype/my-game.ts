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
import { BVHNode, constructBVH, Triangle } from "./bvh";

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
      // const geom = new THREE.IcosahedronGeometry(1);
      const geom = new THREE.CylinderGeometry(1, 1, 2, 8, 2);
      const mat = new THREE.MeshPhongMaterial();
      const mesh = new Mesh(geom, mat);
      this.scene.add(mesh);
    }

    this.pathTracer.loadScene(this.scene);

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

  private _trisTex?: DataTexture;
  private _nodesTex?: DataTexture;
  private _scene?: Scene;

  constructor(private _renderer: WebGLRenderer) {
    this._computeShader = new RawShaderMaterial({
      vertexShader: PathTracer._vertexShader,
      fragmentShader: PathTracer._fragmentShader,
      uniforms: {
        tris: { value: null },
        nodes: { value: null },

        matrixWorld: { value: null },
        projectionMatrixInverse: { value: null },
      },
      defines: {
        N_TRIS: 0,
        N_NODES: 0,
      },
    });

    this._computeCamera = new Camera();
    this._computeCamera.position.z = 1;
    this._computeScene = new Scene();
    const mesh = new Mesh(new THREE.PlaneGeometry(2, 2), this._computeShader);
    this._computeScene.add(mesh);
  }

  loadScene(scene?: Scene) {
    if (scene) this._scene = scene;
    if (!this._scene) return;

    // Free old textures
    if (this._trisTex) this._trisTex.dispose();
    if (this._nodesTex) this._nodesTex.dispose();

    // Extract triangles from geometry
    const triangles: Triangle[] = [];

    this._scene.traverse((object) => {
      if ((object as Mesh).isMesh) {
        const mesh = object as Mesh;

        // Get non-indexed verts
        let geometry = mesh.geometry;
        if (geometry.index) geometry = geometry.toNonIndexed();
        const position = geometry.getAttribute("position");

        // Copy vertices
        for (let i = 0; i < position.count * 3; i += 9) {
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

          triangles.push(verts);
        }
      }
    });

    // Create BVH
    const bvh = constructBVH(triangles);

    // Serialize BVH
    const tris: Triangle[] = [];
    const nodes: { aabb: Box3; element: number; next: number }[] = [];

    const serializeBVH = (node: BVHNode) => {
      if (node.children) {
        const data = { aabb: node.aabb, element: 1, next: 1 };
        nodes.push(data);

        if (node.children[0].element) {
          const i = tris.length;
          tris.push(node.children[0].element);
          data.element = -i;
        } else {
          serializeBVH(node.children[0]);
        }

        if (node.children[1].element) {
          const i = tris.length;
          tris.push(node.children[1].element);
          data.next = -i;
        } else {
          serializeBVH(node.children[1]);
          data.next = nodes.length;
        }
      }
    };
    serializeBVH(bvh);

    // console.log(nodes);

    // Create textures from data
    this._trisTex = new DataTexture(
      new Float32Array(tris.flat().flatMap((v) => [v.x, v.y, v.z, 1])),
      3,
      tris.length,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    this._trisTex.needsUpdate = true;

    this._nodesTex = new DataTexture(
      new Float32Array(
        nodes.flatMap((n) => [
          ...n.aabb.min.toArray(),
          n.element,
          ...n.aabb.max.toArray(),
          n.next,
        ])
      ),
      2,
      nodes.length,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    this._nodesTex.needsUpdate = true;

    // Bind textures to shader
    this._computeShader.uniforms.tris.value = this._trisTex;
    this._computeShader.uniforms.nodes.value = this._nodesTex;

    this._computeShader.defines.N_TRIS = tris.length;
    this._computeShader.defines.N_NODES = nodes.length;
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

    uniform sampler2D tris;
    uniform sampler2D nodes;

    varying vec3 vO;
    varying vec3 vD;
    
    vec3 get_tri(float i, float j) {
      return texture2D(tris, vec2(j/3.0, i/float(N_TRIS))).xyz;
    }

    vec4 get_node(float i, float j) {
      return texture2D(nodes, vec2(j/2.0, i/float(N_NODES)));
    }

    void get_node2(float i, out vec3 mn, out vec3 mx, out float enter, out float next) {
      vec4 node0 = get_node(i, 0.0);
      mn = node0.xyz;
      enter = node0.w;

      vec4 node1 = get_node(i, 1.0);
      mx = node1.xyz;
      next = node1.w;
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

    bool intersect_tri2(vec3 o, vec3 d, float i, out float t) {
      vec3 a = get_tri(i, 0.0);
      vec3 b = get_tri(i, 1.0);
      vec3 c = get_tri(i, 2.0);

      vec3 tuv = intersect_tri(o, d, a, b, c);

      if(tuv.y > 0.0 
      && tuv.z > 0.0 
      && tuv.y + tuv.z < 1.0 
      && tuv.x > 0.0) {
        t = tuv.x;
        return true;
      } else {
        return false;
      }
    }

    void main() {
      vec3 color;

      vec3 o = vO;
      vec3 d = normalize(vD);
      vec3 inv_d = 1.0/d;

      float t = 1000.0;

      float node_idx = 0.0;

      for(int i = 0; i < N_NODES; i++) {
        if(node_idx >= float(N_NODES)) break;

        vec3 mn;
        float elem;
        vec3 mx;
        float next;
        get_node2(node_idx, mn, mx, elem, next);

        node_idx += 1.0;

        if(elem <= 0.0) {
          float t0;
          if(intersect_tri2(o, d, -elem, t0) && t0 < t) {
            t = t0;
            color = vec3(1.0, 1.0, 1.0) * t / 10.0;
          }
        }

        if(next <= 0.0) {
          float t0;
          if(intersect_tri2(o, d, -next, t0) && t0 < t) {
            t = t0;
            color = vec3(1.0, 1.0, 1.0) * t / 10.0;
          }
        } else if(!intersect_box(o, inv_d, mn, mx)) {
          node_idx = next;
        }
      }

      gl_FragColor = vec4(color, 1.0);
    }

  `;
}
