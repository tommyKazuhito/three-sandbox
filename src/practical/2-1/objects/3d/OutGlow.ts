import * as THREE from 'three';

import glowTexture from '../../img/texture/Particle01.png';

export default class OutGlow extends THREE.Object3D {
  private sprite: THREE.Sprite;

  constructor() {
    super();

    // テクスチャ
    const loader = new THREE.TextureLoader();
    const map = loader.load(glowTexture);

    // マテリアル
    const material = new THREE.SpriteMaterial({
      map,
      color: 0xffffff,
      blending: THREE.AdditiveBlending,
      opacity: 0.8,
      transparent: true,
    });

    this.sprite = new THREE.Sprite(material);
    this.sprite.scale.multiplyScalar(11);

    this.add(this.sprite);
  }
}
