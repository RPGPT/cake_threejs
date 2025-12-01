import { AmbientLight, DirectionalLight, HemisphereLight, Light } from 'three';

const LIGHT_COLOR = 0xffffff;
const GROUND_COLOR = 0xf5f5f0;
const AMBIENT_INTENSITY = 0.4;
const HEMISPHERE_INTENSITY = 0.5;
const MAIN_LIGHT_INTENSITY = 0.7;
const FILL_LIGHT_INTENSITY = 0.25;
const SHADOW_MAP_SIZE = 2048;

export function createLights(): Light[] {
  const lights: Light[] = [];

  const ambientLight = new AmbientLight(LIGHT_COLOR, AMBIENT_INTENSITY);
  lights.push(ambientLight);

  const hemisphereLight = new HemisphereLight(LIGHT_COLOR, GROUND_COLOR, HEMISPHERE_INTENSITY);
  lights.push(hemisphereLight);

  const mainLight = new DirectionalLight(LIGHT_COLOR, MAIN_LIGHT_INTENSITY);
  mainLight.position.set(5, 10, 5);
  mainLight.castShadow = true;
  mainLight.shadow.mapSize.width = SHADOW_MAP_SIZE;
  mainLight.shadow.mapSize.height = SHADOW_MAP_SIZE;
  mainLight.shadow.camera.near = 0.5;
  mainLight.shadow.camera.far = 50;
  mainLight.shadow.camera.left = -10;
  mainLight.shadow.camera.right = 10;
  mainLight.shadow.camera.top = 10;
  mainLight.shadow.camera.bottom = -10;
  lights.push(mainLight);

  const fillLight = new DirectionalLight(LIGHT_COLOR, FILL_LIGHT_INTENSITY);
  fillLight.position.set(-5, 5, -5);
  lights.push(fillLight);

  return lights;
}
