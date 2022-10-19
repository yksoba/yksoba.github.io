import { Camera, PerspectiveCamera, Mesh } from "three";
import * as THREE from "three";
import { ThreeGame } from "./three-game";

// @ts-ignore
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class MyGame extends ThreeGame {
  controls?: any;
  cube?: Mesh;

  init() {
    {
      const axesHelper = new THREE.AxesHelper(1);
      this.layer(1).add(axesHelper);
    }

    {
      const size = 10;
      const divisions = 10;
      const gridHelper = new THREE.GridHelper(size, divisions);
      this.scene.add(gridHelper);
    }

    {
      const geometry = new THREE.DodecahedronGeometry();
      const material = new THREE.MeshPhysicalMaterial({ color: 0xffffff });
      this.cube = new Mesh(geometry, material);
      this.scene.add(this.cube);
    }

    // {
    //   const geometry = new THREE.PlaneGeometry(10, 10);
    //   const material = new THREE.MeshPhysicalMaterial({ color: 0xffffff });
    //   const plane = new Mesh(geometry, material);
    //   plane.rotateZ(Math.PI / 2);
    //   plane.position.y = -1;
    //   this.scene.add(plane);
    // }

    {
      const light = new THREE.DirectionalLight(0xffc58f, 0.5);
      this.scene.add(light);
    }

    {
      const light = new THREE.AmbientLight(0x404040); // soft white light
      this.scene.add(light);
    }

    this.camera.position.z = 5;
  }

  updateCamera(width: number, height: number, prev: Camera) {
    const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
    if (prev) {
      camera.position.copy(prev.position);
      camera.rotation.copy(prev.rotation);
    }
    this.camera = camera;

    if (this.renderer)
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  tick(dt: number) {
    this.cube!.rotation.x += 0.001 * dt;
    this.cube!.rotation.y += 0.001 * dt;
  }
}
