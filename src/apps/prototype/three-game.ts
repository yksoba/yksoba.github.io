import { Camera, Scene, WebGLRenderer } from "three";

export abstract class ThreeGame {
  private _didInit = false;
  private _resizeObserver = new ResizeObserver(() => this._resize());
  private _renderer = new WebGLRenderer();
  private _container?: HTMLElement;
  private _animationFrame?: number;
  private _lastTime?: number;
  private _layers: Scene[] = [new Scene()];

  get renderer() {
    return this._renderer;
  }

  get scene() {
    return this._layers[0];
  }
  set scene(scene: Scene) {
    this._layers[0] = scene;
  }

  layer(index: number, scene?: Scene) {
    while (this._layers.length <= index) this._layers.push(new Scene());
    if (scene) this._layers[index] = scene;
    return this._layers[index];
  }

  camera: Camera = new Camera();

  constructor() {
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") this._pause();
      else this._start();
    });
  }

  mount(container: HTMLElement) {
    if (this._container || this._renderer) this.unmount();

    this._container = container;
    container.appendChild(this._renderer.domElement);

    if (!this._didInit) {
      this.init();
      this._didInit = true;
    }

    this._resize();
    this._resizeObserver.observe(container);

    this._start();
  }

  unmount() {
    this._pause();
    if (this._container) this._resizeObserver.unobserve(this._container);

    this._container?.removeChild(this._renderer?.domElement!);
    this._container?.removeEventListener("resize", this._resize);
    this._container = undefined;
  }

  private _resize() {
    if (this._container) {
      const { clientWidth: width, clientHeight: height } = this._container;
      this._renderer.setSize(width, height);
      this.resize(width, height, this.camera);
    }
  }

  private _loop(time?: number) {
    const dt = time && this._lastTime ? time - this._lastTime : 0;
    this._lastTime = time;

    this.tick(dt);
    this.render();

    this._animationFrame = requestAnimationFrame((time) => this._loop(time));
  }

  private _start() {
    if (!this._animationFrame) this._loop();
  }

  private _pause() {
    if (this._animationFrame) {
      cancelAnimationFrame(this._animationFrame);
      this._animationFrame = undefined;
    }
    this._lastTime = undefined;
  }

  render(): void {
    if (this._layers.length === 1) {
      this._renderer.autoClear = true;
      this._renderer.render(this.scene, this.camera);
    } else {
      this._renderer.autoClear = false;
      this._renderer.clear();

      for (const scene of this._layers) {
        this._renderer.render(scene, this.camera);
        this._renderer.clearDepth();
      }
    }
  }
  abstract init(): void;
  abstract resize(width: number, height: number, prev: Camera): void;
  abstract tick(dt: number): void;
}
