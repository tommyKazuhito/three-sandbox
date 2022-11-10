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

  // コンテナーを作成
  const container = new THREE.Object3D();
  scene.add(container);

  // マテリアルを作成
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide,
    wireframe: true,
  });

  // 平行光源を作成
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // 環境光を作成
  const ambientLight = new THREE.AmbientLight(0x999999);
  scene.add(ambientLight);

  // ジオメトリを作成
  const geometryList: THREE.BufferGeometry[] = [
    new THREE.SphereGeometry(5 * 10, 32, 32),
    new THREE.BoxGeometry(5 * 10, 5 * 10, 5 * 10, 10, 10, 10),
    new THREE.PlaneGeometry(5 * 10, 20 * 10, 32),
    new THREE.ConeGeometry(5 * 10, 20 * 10, 32, 20),
    new THREE.CylinderGeometry(5 * 10, 5 * 10, 20 * 10, 32, 20),
    new THREE.TorusGeometry(5 * 10, 2 * 10, 32, 32),
  ];

  geometryList.forEach((geo, i) => {
    // 形状とマテリアルからメッシュを作成します
    const mesh = new THREE.Mesh(geo, material);

    // 3D表示インスタンスのsceneプロパティーが3D表示空間となります
    container.add(mesh);

    // 円周上に配置
    mesh.position.x = 400 * Math.sin((i / geometryList.length) * 2 * Math.PI); // 2π = 360°;
    mesh.position.z = 400 * Math.cos((i / geometryList.length) * 2 * Math.PI); // 2π = 360°;
  });

  // ヘルパー類を追加
  const cameraHelper = new THREE.CameraHelper(camera);
  const directionalLightHelper = new THREE.DirectionalLightHelper(
    directionalLight
  );

  scene.add(cameraHelper);
  scene.add(directionalLightHelper);

  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    container.rotation.y += 0.01;
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  };

  tick();
};

window.addEventListener('DOMContentLoaded', init);
