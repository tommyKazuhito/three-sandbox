import * as THREE from 'three';

import groundTexture from '../img/ground.png';

import ParticleEmitter from './ParticleEmitter';
import Pillar from './Pillar';
import Swirl from './Swirl';

export default class SavePoint extends THREE.Object3D {
  /** 縦長の光の柱オブジェクトです。 */
  private pillar: Pillar;

  /** 広がる光のオブジェクトです。 */
  private pillar2: Pillar;

  /** 渦のオブジェクトです。 */
  private swirl: Swirl;

  /** パーティクルエミッターオブジェクトです。 */
  private particleEmitter: ParticleEmitter;

  constructor() {
    super();

    // 光の柱
    this.pillar = new Pillar(3, 3, 10);
    this.add(this.pillar);

    // 光の柱2
    this.pillar2 = new Pillar(8, 5, 2.5);
    this.add(this.pillar2);

    // 渦
    this.swirl = new Swirl();
    this.add(this.swirl);

    // パーティクルエミッター
    this.particleEmitter = new ParticleEmitter();
    this.add(this.particleEmitter);

    // 地面の光
    {
      const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 10, 32, 32),
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          map: new THREE.TextureLoader().load(groundTexture),
          side: THREE.DoubleSide,
          transparent: true,
          blending: THREE.AdditiveBlending,
        })
      );
      ground.scale.multiplyScalar(1.35);
      ground.rotation.x = (90 * Math.PI) / 180;
      ground.position.y = 0.02;
      this.add(ground);
    }
  }

  update(speedRate: number) {
    this.pillar.update(speedRate);
    this.pillar2.update(speedRate);
    this.swirl.update(speedRate);
    this.particleEmitter.update(speedRate);
  }
}
