import { Camera, PerspectiveCamera, Mesh } from "three";
import * as THREE from "three";
import { ThreeGame } from "./three-game";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const persistent: { camera?: Camera; controls?: OrbitControls } = ((
  window as any
).persistent ??= {});

export class MyGame extends ThreeGame {
  controls: OrbitControls = new OrbitControls(
    this.camera,
    this.renderer.domElement
  );

  cube?: Mesh;

  init() {
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // {
    //   const axesHelper = new THREE.AxesHelper(1);
    //   this.layer(1).add(axesHelper);
    // }

    // {
    //   const size = 10;
    //   const divisions = 10;
    //   const gridHelper = new THREE.GridHelper(size, divisions);
    //   this.scene.add(gridHelper);
    // }

    {
      // const geometry = new THREE.DodecahedronGeometry();
      // const geometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
      // const geometry = new THREE.SphereGeometry(0.5);
      // const material = new THREE.MeshPhysicalMaterial({ color: 0xffffff });
      // this.cube = new Mesh(geometry, material);
      // this.cube.castShadow = true;
      // this.cube.position.y = 1;
      // this.scene.add(this.cube);
    }

    {
      const geometry = new THREE.PlaneGeometry(10, 10);
      const material = new THREE.MeshPhysicalMaterial({ color: 0xffffff });
      const plane = new Mesh(geometry, material);
      plane.receiveShadow = true;
      plane.rotateX(-Math.PI / 2);
      this.scene.add(plane);
    }

    {
      const light = new THREE.PointLight(0xff22aa, 1, 10, Math.PI / 8);
      light.castShadow = true;
      light.position.set(3, 5, 1);
      this.scene.add(light);
    }

    {
      const light = new THREE.PointLight(0x22aaff, 1, 10, Math.PI / 8);
      light.castShadow = true;
      light.position.set(-5, 5, 1);
      this.scene.add(light);
    }

    {
      // const light = new THREE.AmbientLight(0x404040);
      // this.scene.add(light);
    }

    if (persistent.camera) {
      this.camera = persistent.camera;
    } else {
      this.camera.position.set(0, 1, 2);
    }

    if (persistent.controls) {
      this.controls = persistent.controls;
    } else {
      this.controls.target.set(0, 1, 0);
    }
  }

  updateCamera(width: number, height: number, prevCamera: Camera) {
    this.camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
    if (prevCamera) {
      this.camera.position.copy(prevCamera.position);
      this.camera.rotation.copy(prevCamera.rotation);
    }
    persistent.camera = this.camera;

    const prevControls = this.controls;
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    if (prevControls) {
      this.controls.target.copy(prevControls.target);
      this.controls.update();
    }
    persistent.controls = this.controls;
  }

  tick(dt: number) {
    // this.cube!.rotation.x += 0.001 * dt;
    // this.cube!.rotation.y += 0.001 * dt;
  }
}
