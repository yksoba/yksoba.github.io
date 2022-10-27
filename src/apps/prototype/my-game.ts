import {
  PerspectiveCamera,
  Mesh,
  Object3D,
  Light,
  Color,
  mergeUniforms,
  UniformsUtils,
  Texture,
  Vector4,
  MeshBasicMaterial,
  OrthographicCamera,
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
import { PathTracer } from "./path-tracer/path-tracer";

const persistent: { camera?: PerspectiveCamera; controls?: OrbitControls } = ((
  window as any
).persistent ??= {});

export class MyGame extends ThreeGame {
  declare camera: PerspectiveCamera;

  fpsCap = 20;

  controls: OrbitControls = new OrbitControls(
    this.camera,
    this.renderer.domElement
  );

  pathTracer = new PathTracer(this.renderer);

  init() {
    // {
    //   const light = new THREE.PointLight(new Color(1, 1, 1), 1);
    //   light.position.set(0, 3, 0);
    //   light.rotateX(-Math.PI / 2);

    //   this.scene.add(light);
    // }

    {
      const loader = new GLTFLoader();

      loader.load("/assets/prototype/cornell-0.glb", (gltf) => {
        this.scene.add(gltf.scene);

        this.scene.traverse((object) => {
          if (object.name === "Sphere") {
            const mat = (object as Mesh).material as any;
            mat.smoothNormals = true;
          }

          // console.log(object)
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

    this.pathTracer.resize(width, height);
  }

  tick(dt: number) {}
}
