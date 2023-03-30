import * as THREE from 'three';

export default class Plane extends THREE.Object3D {
  constructor() {
    super();

    this.add(new THREE.GridHelper(10, 20));
  }
}
