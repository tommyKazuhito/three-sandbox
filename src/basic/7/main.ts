import * as THREE from 'three';

const init = () => {
  // サイズを指定
  const width = 960;
  const height = 540;

  const canvas = document.getElementById('app') as HTMLCanvasElement;

  // レンダラーを作成・初期設定
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(-100, 150, 500);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // グループを作る
  const group = new THREE.Group();
  scene.add(group);

  const material = new THREE.MeshNormalMaterial();
  const geometry = new THREE.SphereGeometry(5, 5, 5);

  for (let i = 0; i < 100; i++) {
    const mesh = new THREE.Mesh(geometry, material);
    const radian = (i / 100) * Math.PI * 2;
    const base = i % 2 === 0 ? 15 : -15;

    mesh.position.set(
      200 * Math.cos(radian),
      base * Math.sin(Date.now() / 1000),
      200 * Math.sin(radian)
    );

    group.add(mesh);
  }

  // ヘルパー類を追加
  scene.add(new THREE.GridHelper(600));
  scene.add(new THREE.AxesHelper(300));

  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    group.rotateY(0.01);

    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  };

  tick();
};

window.addEventListener('DOMContentLoaded', init);
