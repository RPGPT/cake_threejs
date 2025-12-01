import { Group, PlaneGeometry, MeshStandardMaterial, Mesh } from 'three';

const FLOOR_SIZE = 20;
const FLOOR_COLOR = 0xf5f5f0;
const FLOOR_OPACITY = 0.01;
const FLOOR_Y_POSITION = -1;

export function createRoom(): Group {
  const room = new Group();

  const floorGeometry = new PlaneGeometry(FLOOR_SIZE, FLOOR_SIZE);
  const floorMaterial = new MeshStandardMaterial({
    color: FLOOR_COLOR,
    roughness: 1.0,
    metalness: 0.0,
    transparent: true,
    opacity: FLOOR_OPACITY,
  });

  const floor = new Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = FLOOR_Y_POSITION;
  floor.receiveShadow = true;
  room.add(floor);

  return room;
}
