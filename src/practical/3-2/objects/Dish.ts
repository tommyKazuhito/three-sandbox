import * as THREE from 'three';

export default class Dish extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.CylinderGeometry(25, 18, 10, 100, 30);
    const material = new THREE.MeshToonMaterial({ color: 0xffffff });

    super(geometry, material);

    this.position.set(0, -5, 0);
  }
}
