import * as THREE from 'three';

import particleTexture from '../img/particle.png';

export default class ParticleEmitter extends THREE.Object3D {
  /** パーティクルの数 */
  static readonly COUNT = 3000;

  /** カラーリスト */
  static readonly COLORS = [0xffff00, 0xffffdd, 0xffffff];

  /** 球の半径 */
  static readonly RADIUS = 50;

  private store: THREE.Sprite[] = [];

  private texture: THREE.Texture;

  constructor() {
    super();

    // テクスチャ
    this.texture = new THREE.TextureLoader().load(particleTexture);

    // 数分のパーティクルを生成
    for (let i = 0; i < ParticleEmitter.COUNT; i++) {
      const particle = this.createParticle();
      this.add(particle);

      this.store.push(particle);
    }
  }

  private createParticle() {
    // ランダムに色を設定
    const rand = Math.floor(Math.random() * 3);
    const color = ParticleEmitter.COLORS[rand];

    // マテリアル
    const material = new THREE.SpriteMaterial({
      color,
      map: this.texture,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    });

    // スプライト
    const sprite = new THREE.Sprite(material);

    // 球の表面にランダムに配置
    // 仰角
    const phi = ((Math.random() * 180 - 90) * Math.PI) / 180;
    // 方位角
    const theta = (Math.random() * 360 * Math.PI) / 180;

    const x = ParticleEmitter.RADIUS * Math.cos(phi) * Math.cos(theta) * -1;
    const y = ParticleEmitter.RADIUS * Math.sin(phi);
    const z = ParticleEmitter.RADIUS * Math.cos(phi) * Math.sin(theta);

    sprite.position.set(x, y, z);

    // ランダムに大きさを変更
    sprite.scale.multiplyScalar(Math.random() * 5 + 1);

    return sprite;
  }

  update(lightFrontVector: THREE.Vector3, aperture: number) {
    const target = lightFrontVector.clone();

    // 全てのパーティクルに対して照らされているか判定
    this.store.forEach((particle) => {
      // 絞り値から透明度の割合を算出
      const dot = particle.position.clone().normalize().dot(target);

      let opacity = (dot - (1 - aperture)) / aperture;
      opacity *= Math.random();

      particle.material.opacity = opacity;
    });
  }
}
