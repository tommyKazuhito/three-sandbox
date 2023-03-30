import * as THREE from 'three';

export default class Camera extends THREE.PerspectiveCamera {
  // eslint-disable-next-line no-use-before-define
  private static instance: Camera;

  static getInstance() {
    return Camera.instance || new Camera();
  }

  /** アニメーションに用いる角度の値です。 */
  private angle = 0;

  /** アニメーションの円軌道の半径です。 */
  private readonly radius = 20;

  constructor() {
    super(45, window.innerWidth / window.innerHeight, 1, 1000);

    this.position.set(this.radius, 4, 0);

    Camera.instance = this;
  }

  rotate(direction: 'left' | 'right') {
    if (direction === 'left') {
      this.angle -= 0.5;
    } else {
      this.angle += 0.5;
    }
  }

  update() {
    this.angle += 0.3;

    const rad = this.angle * (Math.PI / 180);
    this.position.x = this.radius * Math.sin(rad);
    this.position.z = this.radius * Math.cos(rad);

    this.lookAt(new THREE.Vector3(0, 0, 0));
  }
}
