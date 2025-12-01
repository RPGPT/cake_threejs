import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

interface Updatable {
  tick?: (delta: number) => void;
  update?: () => void;
}

export class LoopService {
  private updatables: Updatable[] = [];
  private clock = new Clock();

  constructor(
    private camera: PerspectiveCamera,
    private scene: Scene,
    private renderer: WebGLRenderer,
  ) {}

  start(): void {
    this.renderer.setAnimationLoop(() => {
      this.tick();
      this.renderer.render(this.scene, this.camera);
    });
  }

  stop(): void {
    this.renderer.setAnimationLoop(null);
  }

  private tick(): void {
    const delta = this.clock.getDelta();

    for (const object of this.updatables) {
      if (object.tick) {
        object.tick(delta);
      }
      if (object.update) {
        object.update();
      }
    }
  }

  addUpdatable(object: Updatable): void {
    this.updatables.push(object);
  }
}
