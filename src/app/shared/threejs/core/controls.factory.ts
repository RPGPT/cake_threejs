import { PerspectiveCamera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const DAMPING_FACTOR = 0.05;
const MIN_DISTANCE = 3;
const MAX_DISTANCE = 15;
const MAX_POLAR_ANGLE = Math.PI / 2.2;

export function createControls(camera: PerspectiveCamera, domElement: HTMLElement): OrbitControls {
  const controls = new OrbitControls(camera, domElement);

  controls.enableDamping = true;
  controls.dampingFactor = DAMPING_FACTOR;
  controls.minDistance = MIN_DISTANCE;
  controls.maxDistance = MAX_DISTANCE;
  controls.maxPolarAngle = MAX_POLAR_ANGLE;
  controls.enablePan = false;

  return controls;
}
