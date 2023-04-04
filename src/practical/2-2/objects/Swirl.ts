import * as THREE from 'three';

import swirlTexture from '../img/swirl.png';

export default class Swirl extends THREE.Object3D {
  /** フレーム毎にカウントされる値です。 */
  private counter = 0;

  /** マテリアルにあてるテクスチャーです。 */
  private readonly texture: THREE.Texture;

  /** ドーナツのメッシュです。 */
  private readonly mesh: THREE.Mesh;

  constructor() {
    super();

    // テクスチャ
    this.texture = new THREE.TextureLoader().load(swirlTexture);
    this.texture.offset.y = -0.25;
    this.texture.wrapS = THREE.RepeatWrapping;

    // ドーナツ
    const geometry = new THREE.TorusGeometry(6, 3, 2, 100);
    const material = new THREE.MeshBasicMaterial({
      color: 0x007eff,
      map: this.texture,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.rotation.x = (90 * Math.PI) / 180;
    this.mesh.position.set(0, 0.01, 0);

    this.add(this.mesh);
  }

  update(speedRate: number) {
    this.counter += speedRate;

    const angle = (this.counter * Math.PI) / 180;
    this.texture.offset.x = -angle * 0.2;
  }
}
