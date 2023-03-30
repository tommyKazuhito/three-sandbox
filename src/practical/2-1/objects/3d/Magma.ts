import * as THREE from 'three';

import magmaTexture from '../../img/texture/magma.png';

import Object3D from './Object3D';

export default class Magma extends Object3D {
  constructor() {
    super();

    // ジオメトリ
    this.geometry = new THREE.SphereGeometry(2, 20, 20);

    // カラーマップ
    const loader = new THREE.TextureLoader();
    this.map = loader.load(magmaTexture);
    this.map.wrapS = THREE.RepeatWrapping;
    this.map.wrapT = THREE.RepeatWrapping;

    // マテリアル
    this.material = new THREE.MeshBasicMaterial({
      map: this.map,
    });

    // メッシュ
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.add(this.mesh);
  }

  update() {
    // UVアニメーション
    if (this.map) {
      this.map.offset.x += 0.007;
      this.map.offset.y += 0.008;
    }
  }
}
