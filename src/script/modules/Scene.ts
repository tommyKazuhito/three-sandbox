import * as THREE from 'three';

import Camera from '@script/modules/Camera';

export default abstract class Scene extends THREE.Scene {
  camera: Camera;

  constructor() {
    super();

    this.camera = new Camera();
  }

  abstract update(start: number): void;
}
