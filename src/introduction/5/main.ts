import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import earthmap from '@img/earthmap1k.jpg';

const initBasic = () => {
  // サイズを指定
  const width = 960;
  const height = 540;

  const canvas = document.getElementById('app1') as HTMLCanvasElement;

  // レンダラーを作成・初期設定
  const renderer = new THREE.WebGLRenderer({
    canvas,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000); // new THREE.PerspectiveCamera(画角, アスペクト比
  camera.position.set(0, 0, 1000);

  // カメラコントローラーを作成
  new OrbitControls(camera, canvas);

  // 形状とマテリアルからメッシュを作成
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(300, 300, 300),
    new THREE.MeshNormalMaterial()
  );
  scene.add(mesh);

  // ヘルパー類を追加
  const cameraHelper = new THREE.CameraHelper(camera);
  scene.add(cameraHelper);

  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  };
  tick();
};

const initOptional = () => {
  // サイズを指定
  const width = 960;
  const height = 540;

  const canvas = document.getElementById('app2') as HTMLCanvasElement;

  // レンダラーを作成・初期設定
  const renderer = new THREE.WebGLRenderer({
    canvas,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height); // new THREE.PerspectiveCamera(画角, アスペクト比
  camera.position.set(0, 0, 1000);

  // カメラコントローラーを作成
  const controls = new OrbitControls(camera, canvas);

  // 滑らかにカメラコントローラーを制御する
  controls.enableDamping = true;
  controls.dampingFactor = 0.2;

  // 平行光源を作成
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // マテリアルを作成
  const material = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load(earthmap),
    side: THREE.DoubleSide,
  });

  // 球体を作成
  const geometry = new THREE.SphereGeometry(300, 30, 30);

  // メッシュを作成
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 星屑を作成 (カメラの動きをわかりやすくするため)
  const points: THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>[] = [];
  (() => {
    // 頂点情報を作成
    const vertices: number[] = [];
    for (let i = 0; i < 1000; i++) {
      const x = 3000 * (Math.random() - 0.5);
      const y = 3000 * (Math.random() - 0.5);
      const z = 3000 * (Math.random() - 0.5);

      vertices.push(x, y, z);
    }

    // 形状データを作成
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    // マテリアルを作成
    const mat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: Math.floor(Math.random() * 10) + 1,
    });

    // 物体を作成
    const me = new THREE.Points(geo, mat);
    scene.add(me);

    points.push(me);
  })();

  // ヘルパー類を追加
  const cameraHelper = new THREE.CameraHelper(camera);
  const directionalLightHelper = new THREE.DirectionalLightHelper(
    directionalLight
  );
  scene.add(cameraHelper);
  scene.add(directionalLightHelper);

  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    // 地球は常に回転させておく
    mesh.rotation.y += 0.005;

    controls.update();

    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  };
  tick();
};

window.addEventListener('DOMContentLoaded', initBasic);
window.addEventListener('DOMContentLoaded', initOptional);
