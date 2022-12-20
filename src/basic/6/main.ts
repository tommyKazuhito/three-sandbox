import * as THREE from 'three';

import star from '@img/star.png';

const init = () => {
  // サイズを指定
  const width = 960;
  const height = 540;

  const canvas = document.getElementById('app') as HTMLCanvasElement;

  // レンダラーを作成・初期設定
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.setClearColor(0xf9f9f9, 1);

  // シーンを作成
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xf9f9f9, 200, 300);

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height);

  // マテリアルを作成する
  const material = new THREE.SpriteMaterial({
    map: new THREE.TextureLoader().load(star),
  });
  // フォグ（霞）を有効にする
  material.fog = true;

  // ビルボードを作成
  for (let i = 0; i < 1000; i++) {
    const sprite = new THREE.Sprite(material);

    sprite.position.x = 500 * (Math.random() - 0.5);
    sprite.position.y = 100 * Math.random() - 40;
    sprite.position.z = 500 * (Math.random() - 0.5);

    // 必要に応じてスケールを調整
    sprite.scale.set(10, 10, 10);

    scene.add(sprite);
  }

  // 地面を作成
  const plane = new THREE.GridHelper(300, 10, 0x888888, 0x888888);
  plane.position.y = -40;
  scene.add(plane);

  // ヘルパー類を追加
  scene.add(new THREE.AxesHelper(1000));

  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    // カメラの自動移動
    camera.position.x = 100 * Math.sin(Date.now() / 2000);
    camera.position.z = 100 * Math.cos(Date.now() / 2000);
    camera.position.y = 50 * Math.sin(Date.now() / 1000) + 60;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  };

  tick();
};

window.addEventListener('DOMContentLoaded', init);
