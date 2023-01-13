import * as THREE from 'three';

export default class Track extends THREE.Object3D {
  constructor() {
    super();

    // 本体
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(3, 3, 6),
      new THREE.MeshBasicMaterial({ color: 0xcccccc })
    );
    body.position.y = 3;
    this.add(body);

    // 車輪１
    const wheel1 = new THREE.Mesh(
      new THREE.CylinderGeometry(1, 1, 4, 40),
      new THREE.MeshBasicMaterial({ color: 0xffff00 })
    );
    wheel1.rotation.x = (90 * Math.PI) / 180;
    wheel1.rotation.z = (90 * Math.PI) / 180;
    wheel1.position.y = 1;
    wheel1.position.z = -2;
    this.add(wheel1);

    // 車輪２
    const wheel2 = new THREE.Mesh(
      new THREE.CylinderGeometry(1, 1, 4, 40),
      new THREE.MeshBasicMaterial({ color: 0xffff00 })
    );
    wheel2.rotation.x = (90 * Math.PI) / 180;
    wheel2.rotation.z = (90 * Math.PI) / 180;
    wheel2.position.y = 1;
    wheel2.position.z = 2;
    this.add(wheel2);
  }
}
