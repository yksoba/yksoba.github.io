import { PerspectiveCamera, OrthographicCamera, Vector2 } from "three";
import * as THREE from "three";
import { ThreeGame } from "./three-game";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Light2D } from "./light-2d/light-2d";

const persistent: { camera?: PerspectiveCamera; controls?: OrbitControls } = ((
  window as any
).persistent ??= {});

export class MyGame extends ThreeGame {
  declare camera: OrthographicCamera;

  fpsCap = 30;

  pathTracer = new Light2D(this.renderer);

  init() {
    {
      const curve = new THREE.EllipseCurve(
        2.0,
        2.0,
        0.7,
        0.7,
        0,
        2 * Math.PI,
        false,
        0
      );
      const points = curve.getPoints(Math.floor(curve.getLength() * 5));
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.MeshStandardMaterial();
      const mesh = new THREE.Line(geometry, material);

      this.scene.add(mesh);
    }

    {
      const light = new THREE.PointLight(0xffffff, 1, 100);
      light.position.set(0, 0, 0);
      this.scene.add(light);
    }

    this.pathTracer.loadScene(this.scene);

    this.camera = new OrthographicCamera(-10, 10, -10, 10);
    this.camera.position.z = 1;
  }

  render() {
    this.pathTracer.render(this.camera);
  }

  resize(width: number, height: number) {
    const lt = new Vector2(this.camera.left, this.camera.top);
    const rb = new Vector2(this.camera.right, this.camera.bottom);

    const center = lt.clone().add(rb).divideScalar(2);

    if (width < height) {
      this.camera.left = center.x - 5;
      this.camera.right = center.x + 5;
      this.camera.top = center.y - (5 * height) / width;
      this.camera.bottom = center.y + (5 * height) / width;
    } else {
      this.camera.top = center.y - 5;
      this.camera.bottom = center.y + 5;
      this.camera.left = center.x - (5 * width) / height;
      this.camera.right = center.x + (5 * width) / height;
    }
    this.camera.updateProjectionMatrix();

    this.pathTracer.resize(width, height);
  }

  tick(dt: number) {}
}
