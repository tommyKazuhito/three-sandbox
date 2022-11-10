import * as THREE from 'three';

import earthmap from '@img/earthmap1k.jpg';

const initBasic = () => {
  // サイズを指定
  const width = 960;
  const height = 540;

  // レンダラーを作成・初期設定
  const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('app1') as HTMLElement,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height); // new THREE.PerspectiveCamera(画角, アスペクト比
  camera.position.set(0, 0, 1000);

  // 球体を作成
  const geometry = new THREE.SphereGeometry(300, 30, 30);

  // マテリアルを作成
  const material = new THREE.MeshStandardMaterial({
    color: 0xff0000,
  });

  // メッシュを作成
  const mesh = new THREE.Mesh(geometry, material);

  // 3D空間にメッシュを追加
  scene.add(mesh);

  // 実験 - ワイヤーフレーム
  const geo = new THREE.EdgesGeometry(geometry);
  const geoMaterial = new THREE.LineBasicMaterial({
    color: 0xffffff,
    linewidth: 1,
  });
  const wireframe = new THREE.LineSegments(geo, geoMaterial);
  mesh.add(wireframe);

  // 平行光源
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1);

  // 光源をシーンに追加
  scene.add(directionalLight);

  // ヘルパー類を追加
  const cameraHelper = new THREE.CameraHelper(camera);
  const directionalLightHelper = new THREE.DirectionalLightHelper(
    directionalLight
  );

  scene.add(cameraHelper);
  scene.add(directionalLightHelper);

  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    mesh.rotation.y += 0.01;
    mesh.rotation.z += 0.01;
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  };

  tick();
};

const initOptional = () => {
  // サイズを指定
  const width = 960;
  const height = 540;

  // レンダラーを作成・初期設定
  const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('app2') as HTMLElement,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height); // new THREE.PerspectiveCamera(画角, アスペクト比
  camera.position.set(0, 0, 1000);

  // 球体を作成
  const geometry = new THREE.SphereGeometry(300, 30, 30);

  // 画像を読み込む
  const loader = new THREE.TextureLoader();
  const texture = loader.load(earthmap);

  // マテリアルにテクスチャーを設定
  const material = new THREE.MeshStandardMaterial({ map: texture });

  // メッシュを作成
  const mesh = new THREE.Mesh(geometry, material);

  // 3D空間にメッシュを追加
  scene.add(mesh);

  // 平行光源
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1);

  // 光源をシーンに追加
  scene.add(directionalLight);

  // ヘルパー類を追加
  const cameraHelper = new THREE.CameraHelper(camera);
  const directionalLightHelper = new THREE.DirectionalLightHelper(
    directionalLight
  );

  scene.add(cameraHelper);
  scene.add(directionalLightHelper);

  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    mesh.rotation.y += 0.01;
    mesh.rotation.z += 0.01;
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  };

  tick();
};

window.addEventListener('DOMContentLoaded', initBasic);
window.addEventListener('DOMContentLoaded', initOptional);
