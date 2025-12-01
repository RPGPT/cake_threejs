import { WebGLRenderer, SRGBColorSpace } from 'three';

const MAX_PIXEL_RATIO = 2;

export function createRenderer(container: HTMLElement, backgroundColor: number): WebGLRenderer {
  const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO));
  renderer.setClearColor(backgroundColor, 1);
  renderer.shadowMap.enabled = true;
  renderer.outputColorSpace = SRGBColorSpace;

  container.appendChild(renderer.domElement);

  return renderer;
}
