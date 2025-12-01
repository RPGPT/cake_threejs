import { Group, BoxGeometry, MeshStandardMaterial, Mesh, BufferGeometry } from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

const CAKE_COLOR = 0xf5deb3;
const BASE_COLOR = 0xffd700;
const FROSTING_RADIUS_RATIO = { width: 0.08, height: 0.15, depth: 0.08 };
const BASE_SIZE_MULTIPLIER = 1.15;
const BASE_HEIGHT = 0.05;
const ROUNDED_SEGMENTS = 5;

export interface CakeConfig {
  width: number;
  height: number;
  depth: number;
  rotationSpeed?: number;
}

export interface UpdatableGroup extends Group {
  tick?: (delta: number) => void;
  userData: {
    autoRotate?: boolean;
    rotationSpeed?: number;
  };
}

export function createCake(config: CakeConfig): UpdatableGroup {
  const { width, height, depth, rotationSpeed = 0.5 } = config;
  const cakeGroup = new Group() as UpdatableGroup;
  cakeGroup.userData = { autoRotate: true, rotationSpeed };

  const frostingRadius = Math.min(
    width * FROSTING_RADIUS_RATIO.width,
    height * FROSTING_RADIUS_RATIO.height,
    depth * FROSTING_RADIUS_RATIO.depth,
  );

  let cakeGeometry: BufferGeometry;

  try {
    const geo = new RoundedBoxGeometry(width, height, depth, ROUNDED_SEGMENTS, frostingRadius);
    const pos = geo.attributes['position'];
    const count = pos.count;
    const isBottomVertex = new Array(count).fill(false);

    for (let i = 0; i < count; i++) {
      const y = pos.getY(i);
      if (y < 0) {
        isBottomVertex[i] = true;
        const x = pos.getX(i);
        const z = pos.getZ(i);
        pos.setX(i, Math.sign(x) * (width / 2));
        pos.setZ(i, Math.sign(z) * (depth / 2));
      }
    }

    pos.needsUpdate = true;
    geo.computeVertexNormals();

    const normals = geo.attributes['normal'];
    for (let i = 0; i < count; i++) {
      if (isBottomVertex[i]) {
        normals.setX(i, Math.sign(pos.getX(i)));
        normals.setY(i, 0);
        normals.setZ(i, Math.sign(pos.getZ(i)));
      }
    }
    normals.needsUpdate = true;

    cakeGeometry = geo;
  } catch (_err) {
    console.warn('RoundedBoxGeometry unavailable, using BoxGeometry fallback');
    cakeGeometry = new BoxGeometry(width, height, depth);
  }

  const cakeMaterial = new MeshStandardMaterial({
    color: CAKE_COLOR,
    roughness: 0.9,
    metalness: 0.0,
  });

  const baseWidth = width * BASE_SIZE_MULTIPLIER;
  const baseDepth = depth * BASE_SIZE_MULTIPLIER;

  const baseGeometry = new BoxGeometry(baseWidth, BASE_HEIGHT, baseDepth);
  const baseMaterial = new MeshStandardMaterial({
    color: BASE_COLOR,
    roughness: 0.4,
    metalness: 0.6,
  });

  const baseMesh = new Mesh(baseGeometry, baseMaterial);
  baseMesh.position.y = -(height / 2) - BASE_HEIGHT / 2;
  baseMesh.castShadow = true;
  baseMesh.receiveShadow = true;

  const cakeMesh = new Mesh(cakeGeometry, cakeMaterial);
  cakeMesh.castShadow = true;
  cakeMesh.receiveShadow = true;

  cakeGroup.add(baseMesh);
  cakeGroup.add(cakeMesh);

  cakeGroup.tick = (delta: number) => {
    if (cakeGroup.userData.autoRotate) {
      cakeGroup.rotation.y += delta * (cakeGroup.userData.rotationSpeed || rotationSpeed);
    }
  };

  return cakeGroup;
}
