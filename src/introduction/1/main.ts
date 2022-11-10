import * as THREE from 'three';

const init = () => {
  // サイズを指定
  const width = 960;
  const height = 540;

  // レンダラーを作成・初期設定
  const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('app') as HTMLElement,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height); // new THREE.PerspectiveCamera(画角, アスペクト比
  camera.position.set(0, 0, 1000);

  // 箱を作成
  const geometry = new THREE.BoxGeometry(500, 500, 500);
  const material = new THREE.MeshNormalMaterial();

  const box = new THREE.Mesh(geometry, material);
  scene.add(box);

  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    box.rotation.y += 0.01;
    box.rotation.z += 0.01;
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  };

  tick();
};

window.addEventListener('DOMContentLoaded', init);
