import * as THREE from 'three';

export default class Camera extends THREE.PerspectiveCamera {
  constructor() {
    super(45, window.innerWidth / window.innerHeight, 10, 500);
  }

  /**
   * 毎フレームの更新をかけます。
   */
  update() {
    // 原点に注目
    this.lookAt(new THREE.Vector3(0, 0, 0));
  }
}
