import * as THREE from 'three';

import Aura from './3d/Aura';
import FlareEmitter from './3d/FlareEmitter';
import InGlow from './3d/InGlow';
import Magma from './3d/Magma';
import OutGlow from './3d/OutGlow';
import SparkEmitter from './3d/SparkEmitter';

export default class MagmaFlare extends THREE.Object3D {
  /** マグマ */
  private magma: Magma;

  /** オーラ球 */
  private aura: Aura;

  /** イングロー */
  private inGlow: InGlow;

  /** フレアエミッター */
  private flareEmitter: FlareEmitter;

  /** スパークエミッター */
  private sparkEmitter: SparkEmitter;

  /** 背景グロー */
  private outGlow: OutGlow;

  constructor() {
    super();

    // マグマ
    this.magma = new Magma();

    // オーラ球
    this.aura = new Aura();

    // イングロー
    this.inGlow = new InGlow();

    // フレア
    this.flareEmitter = new FlareEmitter();

    // スパーク
    this.sparkEmitter = new SparkEmitter();

    // 背景グロー
    this.outGlow = new OutGlow();

    this.add(this.magma);
    this.add(this.aura);
    this.add(this.inGlow);
    this.add(this.flareEmitter);
    this.add(this.sparkEmitter);
    this.add(this.outGlow);
  }

  update() {
    this.magma.update();
    this.aura.update();
    this.flareEmitter.update();
    this.sparkEmitter.update();
  }
}
