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

  // レンダラー側で影を有効に
  renderer.shadowMap.enabled = true;

  // シーンを作成
  const scene = new THREE.Scene();

  // フォグを設定
  scene.fog = new THREE.Fog(0x000000, 50, 2000);

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height); // new THREE.PerspectiveCamera(視野角, アスペクト比, near, far)
  camera.position.set(0, 0, 1000);

  // グループを作成
  const group = new THREE.Group();
  scene.add(group);

  const geometry = new THREE.BoxGeometry(50, 50, 50);
  const material = new THREE.MeshStandardMaterial();
  for (let i = 0; i < 1000; i++) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * 2000;
    mesh.position.y = (Math.random() - 0.5) * 2000;
    mesh.position.z = (Math.random() - 0.5) * 2000;
    mesh.rotation.x = Math.random() * 2 * Math.PI;
    mesh.rotation.y = Math.random() * 2 * Math.PI;
    mesh.rotation.z = Math.random() * 2 * Math.PI;

    group.add(mesh);
  }

  // 光源
  scene.add(new THREE.DirectionalLight(0xff0000, 2)); // 平行光源
  scene.add(new THREE.AmbientLight(0x00ffff)); // 環境光源

  // ヘルパー類を追加
  scene.add(new THREE.AxesHelper(1000));

  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    // グループを回す
    group.rotateY(0.01);
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  };

  tick();
};

window.addEventListener('DOMContentLoaded', init);
