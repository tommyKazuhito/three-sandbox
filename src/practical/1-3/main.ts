import * as THREE from 'three';

import FlashLight from './objects/FlashLight';
import ParticleEmitter from './objects/ParticleEmitter';

import AppVector from '@script/modules/AppVector';
import SceneModule from '@script/modules/Scene';

class Scene extends SceneModule {
  private flashLight: FlashLight;

  private particleEmitter: ParticleEmitter;

  constructor() {
    super();

    // カメラ
    this.camera.position.x = 10;
    this.camera.position.y = 50;
    this.camera.position.z = 10;

    // 環境光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.add(ambientLight);

    // 懐中電灯
    this.flashLight = new FlashLight();
    this.add(this.flashLight);

    // パーティクルエミッター
    this.particleEmitter = new ParticleEmitter();
    this.add(this.particleEmitter);
  }

  update(start: number) {
    // カメラを更新
    this.camera.update();

    // ライトを更新
    this.flashLight.update(start);

    // パーティクルを更新
    this.particleEmitter.update(
      this.flashLight.getFrontVector(),
      this.flashLight.getAperture()
    );
  }
}

const init = () => {
  const wrapper = document.getElementById('app1')!;

  new AppVector(wrapper, new Scene());
};

window.addEventListener('DOMContentLoaded', init);
