import * as THREE from 'three';

import auraTexture from '../../img/texture/aura3_type2.png';

import Object3D from './Object3D';

export default class Aura extends Object3D {
  constructor() {
    super();

    // ジオメトリ
    this.geometry = new THREE.SphereGeometry(2.05, 20, 20);

    // カラーマップ
    const loader = new THREE.TextureLoader();
    this.map = loader.load(auraTexture);
    this.map.wrapS = THREE.RepeatWrapping;
    this.map.wrapT = THREE.RepeatWrapping;

    // マテリアル
    this.material = new THREE.MeshBasicMaterial({
      map: this.map,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });

    // メッシュ
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.add(this.mesh);
  }

  update() {
    // UVアニメーション
    if (this.map) {
      this.map.offset.x -= 0.005;
      this.map.offset.y -= 0.005;
    }
  }
}
