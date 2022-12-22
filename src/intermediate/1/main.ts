import * as THREE from 'three';

const init = () => {
  // レンダラーを作成・初期設定
  const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('app') as HTMLElement,
    antialias: true,
  });

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, 1); // new THREE.PerspectiveCamera(画角, アスペクト比
  camera.position.set(0, 0, 1000);

  // 球体を作成
  const geometry = new THREE.SphereGeometry(300, 30, 30);
  const material = new THREE.MeshBasicMaterial({ wireframe: true });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const onResize = () => {
    // サイズを取得
    const width = window.innerWidth;
    const height = window.innerHeight;

    // レンダラーのサイズを調整する
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // カメラのアスペクト比を正す
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  };

  onResize();
  tick();

  window.addEventListener('resize', onResize);
};

window.addEventListener('DOMContentLoaded', init);
