import * as THREE from 'three';

import particleTexture from '../img/particle.png';

import { random } from '@script/helper/util';

export default class Particle extends THREE.Sprite {
  private static material = new THREE.SpriteMaterial({
    color: 0x007eff,
    map: new THREE.TextureLoader().load(particleTexture),
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
  });

  /** フレーム毎にカウントされる値です。 */
  private counter = 0;

  /** パーティクルの速度です。 */
  private velocity = new THREE.Vector3();

  constructor() {
    super(Particle.material.clone());

    this.reset();
  }

  /**
   * ランダムな場所に位置を設定します。
   *
   * @private
   * @memberof Particle
   */
  private reset() {
    const radian = Math.random() * Math.PI * 2;
    const x = Math.cos(radian) * 2;
    const z = Math.sin(radian) * 2;

    this.position.set(x, 0, z);
    this.scale.set(1, 1, 1);
    this.velocity.set(
      random(-0.015, 0.015),
      random(0.05, 0.1),
      random(-0.015, 0.015)
    );

    this.material.opacity = 1;
  }

  update(speedRate: number) {
    this.counter += speedRate;

    this.position.add(this.velocity);
    this.material.opacity -= 0.009;

    const rad = Math.sin((this.counter * 30 * Math.PI) / 180);
    const scale = rad + 0.75;
    this.scale.set(scale, scale, scale);

    if (this.material.opacity <= 0) {
      this.reset();
    }
  }
}
