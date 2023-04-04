import * as THREE from 'three';

import pillarTexture from '../img/pillar.png';

export default class Pillar extends THREE.Object3D {
  /** フレーム毎にカウントされる値です。 */
  private counter = 0;

  /** マテリアルにあてるテクスチャーです。 */
  private readonly texture: THREE.Texture;

  /** 柱のメッシュです。 */
  private readonly mesh: THREE.Mesh;

  constructor(topRadius: number, bottomRadius: number, height: number) {
    super();

    // テクスチャ
    this.texture = new THREE.TextureLoader().load(pillarTexture);
    this.texture.wrapS = THREE.RepeatWrapping;
    this.texture.repeat.set(10, 1);

    // 光の柱
    const geometry = new THREE.CylinderGeometry(
      topRadius,
      bottomRadius,
      height,
      20,
      1,
      true
    );
    const material = new THREE.MeshBasicMaterial({
      color: 0x007eff,
      map: this.texture,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(0, height / 2, 0);

    this.add(this.mesh);
  }

  update(speedRate: number) {
    this.counter += speedRate;

    const angle = (this.counter * Math.PI) / 180;

    // テクスチャを上下させる
    this.texture.offset.y = 0.1 + 0.2 * Math.sin(angle * 3);
    // テクスチャを回転させる
    this.texture.offset.x = angle;
  }
}
