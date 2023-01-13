import * as THREE from 'three';

import type Scene from '@script/modules/Scene';

export default class AppVector {
  private wrapper: HTMLElement;

  private scene: Scene;

  private renderer: THREE.WebGLRenderer;

  private startTime = 0;

  constructor(wrapper: HTMLElement, scene: Scene) {
    this.wrapper = wrapper;
    this.scene = scene;

    this.renderer = new THREE.WebGLRenderer({ antialias: false });
    this.renderer.setClearColor(0x000000);
    this.renderer.setPixelRatio(1);

    this.update = this.update.bind(this);
    this.onResize = this.onResize.bind(this);

    this.init();
  }

  private init() {
    this.wrapper.appendChild(this.renderer.domElement);

    this.startTime = Date.now();

    this.onResize();
    this.update();

    window.addEventListener('resize', this.onResize);
  }

  private update() {
    // シーンの更新
    this.scene.update(this.startTime);

    // 描画
    this.renderer.render(this.scene, this.scene.camera);

    requestAnimationFrame(this.update);
  }

  private onResize() {
    const { clientWidth, clientHeight } = this.wrapper;

    this.renderer.domElement.setAttribute('width', clientWidth.toString());
    this.renderer.domElement.setAttribute('height', clientHeight.toString());
    this.renderer.setPixelRatio(window.devicePixelRatio || 1);
    this.renderer.setSize(clientWidth, clientHeight);

    this.scene.camera.aspect = clientWidth / clientHeight;
    this.scene.camera.updateProjectionMatrix();
  }
}
