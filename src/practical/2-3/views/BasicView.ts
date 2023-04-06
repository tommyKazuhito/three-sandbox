import * as THREE from 'three';

export default class BasicView {
  /** シーンオブジェクトです。 */
  scene: THREE.Scene;

  /** カメラオブジェクトです。(PerspectiveCamera のみ) */
  camera: THREE.PerspectiveCamera;

  /** レンダラーオブジェクトです。(WebGL のみ) */
  renderer: THREE.WebGLRenderer;

  /** HTML 要素です。 */
  containerElement: HTMLElement;

  constructor(wrapperId: string) {
    this.containerElement = document.createElement('div');
    document.getElementById(wrapperId)?.appendChild(this.containerElement);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      200000
    );
    this.camera.position.z = -1000;

    // アンチエイリアス設定有無
    const needsAntialias = window.devicePixelRatio === 1;

    this.renderer = new THREE.WebGLRenderer({
      antialias: needsAntialias,
    });
    this.renderer.setClearColor(0x0);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.containerElement.appendChild(this.renderer.domElement);

    window.addEventListener('resize', this.handleResize.bind(this));
  }

  protected startRendering() {
    this.update();
  }

  protected render() {
    this.renderer.render(this.scene, this.camera);
  }

  protected onTick() {}

  protected handleResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  protected update() {
    requestAnimationFrame(this.update.bind(this));

    this.onTick();
    this.render();
  }
}
