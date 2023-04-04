import * as THREE from 'three';

export default class Camera extends THREE.PerspectiveCamera {
  /** アニメーションに用いる角度の値です。 */
  private angle = 0;

  /** アニメーションの円軌道の半径です。 */
  private readonly radius = 25;

  constructor() {
    super(45, window.innerWidth / window.innerHeight, 1, 1000);

    this.position.set(this.radius, 15, 0);
    this.lookAt(new THREE.Vector3(0, 3, 0));
  }

  update(speedRate: number) {
    this.angle += 0.2 * speedRate;
    const rad = (this.angle * Math.PI) / 180;

    this.position.x = this.radius * Math.sin(rad);
    this.position.z = this.radius * Math.cos(rad);

    this.lookAt(new THREE.Vector3(0, 0, 0));
  }
}
