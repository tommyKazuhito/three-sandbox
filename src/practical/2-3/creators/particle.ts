/* eslint-disable import/prefer-default-export */
import * as THREE from 'three';

import cloudTexture from '../img/fire_particle.png';

export const cloud = (): THREE.Points => {
  // 形状データを作成
  const geometry = new THREE.BufferGeometry();
  const numParticles = 50000;
  const size = 10000;

  const vertices = [];
  for (let i = 0; i < numParticles; i++) {
    const x = size * (Math.random() - 0.5);
    const y = size * (Math.random() - 0.5);
    const z = size * (Math.random() - 0.5);
    vertices.push(x, y, z);
  }
  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(vertices, 3)
  );

  // マテリアルを作成
  const material = new THREE.PointsMaterial({
    size: 20,
    color: 0x666666,
    map: new THREE.TextureLoader().load(cloudTexture),
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthTest: false,
  });

  return new THREE.Points(geometry, material);
};
