import { Injectable } from '@angular/core';
import { Scene, PerspectiveCamera, WebGLRenderer, Object3D, Mesh, Material } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createCamera } from './core/camera.factory';
import { createRenderer } from './core/renderer.factory';
import { createControls } from './core/controls.factory';
import { createLights } from './core/lights.factory';
import { createCake, UpdatableGroup } from './models/cake.factory';
import { createRoom } from './models/room.factory';
import { LoopService } from './core/loop.service';

const MAX_PIXEL_RATIO = 2;

export interface CakeViewerConfig {
  width: number;
  height: number;
  depth: number;
  autoRotate: boolean;
  rotationSpeed: number;
  backgroundColor: number;
}

@Injectable({
  providedIn: 'root',
})
export class ThreeSceneService {
  private scene!: Scene;
  private camera!: PerspectiveCamera;
  private renderer!: WebGLRenderer;
  private controls!: OrbitControls;
  private loopService!: LoopService;
  private cakeGroup!: UpdatableGroup;
  private container!: HTMLElement;

  async init(container: HTMLElement, config: CakeViewerConfig): Promise<void> {
    this.container = container;

    this.scene = new Scene();
    this.camera = createCamera();
    this.renderer = createRenderer(container, config.backgroundColor);
    this.controls = createControls(this.camera, this.renderer.domElement);

    const lights = createLights();
    lights.forEach(light => this.scene.add(light));

    const room = createRoom();
    this.scene.add(room);

    this.cakeGroup = createCake({
      width: config.width,
      height: config.height,
      depth: config.depth,
      rotationSpeed: config.rotationSpeed || 0.5,
    });
    this.cakeGroup.userData.autoRotate = config.autoRotate;
    this.scene.add(this.cakeGroup);

    this.loopService = new LoopService(this.camera, this.scene, this.renderer);
    this.loopService.addUpdatable(this.controls);
    this.loopService.addUpdatable(this.cakeGroup);

    this.handleResize();
    this.start();
  }

  start(): void {
    if (this.loopService) {
      this.loopService.start();
    }
  }

  stop(): void {
    if (this.loopService) {
      this.loopService.stop();
    }
  }

  handleResize(): void {
    if (!this.container || !this.camera || !this.renderer) {
      return;
    }

    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO));
  }

  dispose(): void {
    this.stop();

    if (this.scene) {
      this.scene.traverse((object: Object3D) => {
        if (object instanceof Mesh) {
          if (object.geometry) {
            object.geometry.dispose();
          }
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((mat: Material) => mat.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
    }

    if (this.renderer) {
      this.renderer.dispose();
      if (this.container && this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      }
    }

    if (this.controls) {
      this.controls.dispose();
    }
  }
}
