import { PerspectiveCamera } from 'three';

const FOV = 45;
const NEAR_PLANE = 0.1;
const FAR_PLANE = 100;
const CAMERA_POSITION = { x: 5, y: 3, z: 5 };

export function createCamera(): PerspectiveCamera {
  const camera = new PerspectiveCamera(FOV, window.innerWidth / window.innerHeight, NEAR_PLANE, FAR_PLANE);

  camera.position.set(CAMERA_POSITION.x, CAMERA_POSITION.y, CAMERA_POSITION.z);
  camera.lookAt(0, 0, 0);

  return camera;
}
