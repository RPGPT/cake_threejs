import {
  Component,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy,
  signal,
  effect,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { ThreeSceneService } from '../shared/threejs/three-scene.service';

@Component({
  selector: 'app-cake-viewer',
  standalone: true,
  templateUrl: './cake-viewer.component.html',
  styleUrls: ['./cake-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ThreeSceneService],
})
export class CakeViewerComponent implements AfterViewInit, OnDestroy {
  readonly canvasContainer = viewChild.required<ElementRef<HTMLDivElement>>('canvasContainer');

  readonly width = input(3);
  readonly height = input(0.4);
  readonly depth = input(2);
  readonly autoRotate = input(true);
  readonly rotationSpeed = input(0.5);
  readonly backgroundColor = input(0xf5f5f0);

  readonly loaded = output<void>();
  readonly errorOccurred = output<Error>();

  private isLoaded = signal(false);
  private hasError = signal(false);
  private resizeObserver?: ResizeObserver;

  private readonly sceneService = inject(ThreeSceneService);

  constructor() {
    effect(() => {
      if (this.isLoaded()) {
        this.loaded.emit();
      }
    });
  }

  ngAfterViewInit(): void {
    const canvasContainer = this.canvasContainer();
    if (!canvasContainer) {
      console.error('Canvas container not found');
      return;
    }

    this.sceneService
      .init(canvasContainer.nativeElement, {
        width: this.width(),
        height: this.height(),
        depth: this.depth(),
        autoRotate: this.autoRotate(),
        rotationSpeed: this.rotationSpeed(),
        backgroundColor: this.backgroundColor(),
      })
      .then(() => {
        this.isLoaded.set(true);
      })
      .catch(err => {
        this.hasError.set(true);
        this.errorOccurred.emit(err);
      });

    this.setupResizeObserver();
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    this.sceneService.dispose();
  }

  private setupResizeObserver(): void {
    const canvasContainer = this.canvasContainer();
    if (!canvasContainer) {
      return;
    }

    this.resizeObserver = new ResizeObserver(() => {
      this.sceneService.handleResize();
    });

    this.resizeObserver.observe(canvasContainer.nativeElement);
  }
}
