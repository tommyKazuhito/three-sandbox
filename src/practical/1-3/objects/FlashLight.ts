import * as THREE from 'three';

import beamTexture from '../img/beam.png';

export default class FlashLight extends THREE.Object3D {
  /** 1秒あたりに変更する角度 */
  static DEGREES = 150;

  private frontVector: THREE.Vector3;

  private aperture: number;

  private angle: number;

  constructor() {
    super();

    /** 正面ベクトル */
    this.frontVector = new THREE.Vector3(0, 1, 0);

    /** 絞り値 */
    this.aperture = 0.2;

    /** 回転角度 */
    this.angle = 0;

    // 持ち手部分
    const handle = new THREE.Mesh(
      new THREE.CylinderGeometry(1, 1, 3, 10),
      new THREE.MeshBasicMaterial({ color: 0xcccccc })
    );
    handle.rotation.z = (-90 * Math.PI) / 180;
    this.add(handle);

    // 頭
    const head = new THREE.Mesh(
      new THREE.CylinderGeometry(1.5, 1, 1.5, 10),
      new THREE.MeshBasicMaterial({ color: 0xaaaaaa })
    );
    head.position.x = 2;
    head.rotation.z = (-90 * Math.PI) / 180;
    this.add(head);

    // ビーム
    const beam = new THREE.Mesh(
      new THREE.CylinderGeometry(15, 0.5, 20, 40, 10, true),
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(beamTexture),
        color: 0xffff55,
        opacity: 0.3,
        depthWrite: true,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      })
    );
    beam.position.x = 12;
    beam.rotation.z = (-90 * Math.PI) / 180;
    this.add(beam);
  }

  getFrontVector() {
    return this.frontVector;
  }

  getAperture() {
    return this.aperture;
  }

  update(start: number) {
    // 現在時間の継続時間に対する進捗度を算出
    const progress = (Date.now() - start) / 1000;

    // 角度を更新
    this.angle = FlashLight.DEGREES * progress;
    const rad = (this.angle * Math.PI) / 180;

    // ライトを回転
    this.rotation.z = rad;

    // 正面ベクトルを更新
    const x = Math.cos(rad);
    const y = Math.sin(rad);

    this.frontVector = new THREE.Vector3(x, y, 0);
  }
}
