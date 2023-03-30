import * as THREE from 'three';

import auraTexture from '../../img/texture/aura3_type2.png';
import fragmentSource from '../shader/flare.frag?raw';
import vertexSource from '../shader/flare.vert?raw';

import Object3D from './Object3D';

export default class Flare extends Object3D {
  /** スピード */
  private speed: number = Math.random() * 0.05 + 0.01;

  /** オフセット */
  private offset: THREE.Vector2 = new THREE.Vector2();

  /** 上面の半径 */
  private topRadius = 6;

  /** 下面の半径 */
  private bottomRadius = 2;

  /** ドーナツの太さ */
  private diameter: number;

  /** ランダム係数 */
  private randomRatio = Math.random() + 1;

  constructor() {
    super();

    this.diameter = this.topRadius - this.bottomRadius;

    // ジオメトリ
    this.geometry = new THREE.CylinderGeometry(
      this.topRadius,
      this.bottomRadius,
      0,
      30,
      3,
      true
    );

    // カラーマップ
    const loader = new THREE.TextureLoader();
    this.map = loader.load(auraTexture);
    this.map.wrapS = THREE.RepeatWrapping;
    this.map.wrapT = THREE.RepeatWrapping;
    this.map.repeat.set(10, 10);

    // マテリアル
    this.material = this.createMaterial();

    // メッシュ
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.add(this.mesh);
  }

  update() {
    this.offset.x += 0.004 * this.randomRatio;
    this.offset.y -= 0.015 * this.randomRatio;
  }

  private createMaterial() {
    const material = new THREE.ShaderMaterial({
      uniforms: {
        offset: { value: this.offset },
        map: { value: this.map },
        opacity: { value: 0.15 },
        topRadius: { value: this.topRadius },
        bottomRadius: { value: this.bottomRadius },
      },
      fragmentShader: fragmentSource,
      vertexShader: vertexSource,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
    });

    return material;
  }
}
