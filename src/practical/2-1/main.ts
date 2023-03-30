import * as THREE from 'three';

import Camera from './objects/Camera';
import MagmaFlare from './objects/MagmaFlare';
import Plane from './objects/Plane';

const init = () => {
  const wrapper = document.getElementById('app')!;
  wrapper.style.backgroundColor = `#000`;

  /** フレームカウント */
  let frame = 0;

  // シーン
  const scene = new THREE.Scene();

  // カメラ
  const camera = Camera.getInstance();

  // レンダラー
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(0x000000);
  renderer.setPixelRatio(window.devicePixelRatio);

  // 地面
  const plane = new Plane();
  plane.position.y = -3;
  scene.add(plane);

  // マグマフレア
  const magmaFlare = new MagmaFlare();
  scene.add(magmaFlare);

  const tick = () => {
    requestAnimationFrame(tick);

    // フレームカウントをインクリメント
    frame++;

    // カメラの更新
    camera.update();

    // マグマフレアの更新
    magmaFlare.update();

    // FPSを30に
    if (frame % 2) {
      return;
    }

    renderer.render(scene, camera);
  };

  const resize = () => {
    const { innerWidth, innerHeight } = window;

    renderer.domElement.setAttribute('width', innerWidth.toString());
    renderer.domElement.setAttribute('height', innerHeight.toString());
    renderer.setSize(innerWidth, innerHeight);

    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
  };

  const onResize = (e: Event) => {
    resize();
  };

  resize();
  wrapper.appendChild(renderer.domElement);

  tick();

  window.addEventListener('resize', onResize);
};

window.addEventListener('DOMContentLoaded', init);
