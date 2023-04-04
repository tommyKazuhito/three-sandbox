import * as THREE from 'three';

import Particle from './Particle';

export default class ParticleEmitter extends THREE.Object3D {
  /** フレーム毎にカウントされる値です。 */
  private counter = 0;

  /** パーティクル格納配列です。 */
  private pool: Particle[] = [];

  /** 生成するパーティクルの数です。 */
  private readonly num = 50;

  /** パーティクルを発生させる間隔です。 */
  private readonly interval = 2;

  private addParticle() {
    if (this.pool.length < this.num) {
      const particle = new Particle();

      this.pool.push(particle);
      this.add(particle);
    }
  }

  update(speedRate: number) {
    // カウンターをインクリメント
    this.counter += speedRate;

    // パーティクルを数分更新
    this.pool.forEach((particle) => {
      particle.update(speedRate);
    });

    if (Math.round(this.counter) % this.interval === 0) {
      this.addParticle();
    }
  }
}
