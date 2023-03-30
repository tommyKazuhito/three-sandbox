import * as THREE from 'three';

import burstTexture from '../../img/texture/Burst01.png';

import Object3D from './Object3D';

export default class Spark extends Object3D {
  /** スピード */
  speed = Math.random() * 0.2 + 0.2;

  /** 透明度 */
  opacity = 0.5;

  constructor() {
    super();

    // ジオメトリ
    this.geometry = new THREE.PlaneGeometry(0.15, 2);

    // カラーマップ
    const loader = new THREE.TextureLoader();
    this.map = loader.load(burstTexture);
    this.map.wrapS = THREE.RepeatWrapping;
    this.map.wrapT = THREE.RepeatWrapping;

    // マテリアル
    this.material = new THREE.MeshBasicMaterial({
      map: this.map,
      opacity: this.opacity,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });

    // メッシュ
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.y = Math.random() * 5;
    this.mesh.rotation.y = Math.random() * 2;

    this.add(this.mesh);
  }

  update() {
    if (this.mesh) {
      this.mesh.position.y -= this.speed;

      const material = this.mesh.material as THREE.Material;
      material.opacity -= 0.05;

      if (this.mesh.position.y < 0) {
        this.mesh.position.y = 6;
        material.opacity = this.opacity;
      }
    }
  }
}
