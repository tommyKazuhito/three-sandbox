import * as THREE from 'three';

const initBasicMaterial = () => {
  // サイズを指定
  const width = 960;
  const height = 540;

  const canvas = document.getElementById('app1') as HTMLCanvasElement;

  // レンダラーを作成・初期設定
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height); // new THREE.PerspectiveCamera(画角, アスペクト比
  camera.position.set(0, 0, 1000);

  // ドーナツを作成
  const geometry = new THREE.TorusGeometry(300, 100, 64, 100);
  const material = new THREE.MeshBasicMaterial({ color: 0x6699ff });

  const box = new THREE.Mesh(geometry, material);
  scene.add(box);

  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  };

  tick();
};

const initNormalMaterial = () => {
  // サイズを指定
  const width = 960;
  const height = 540;

  const canvas = document.getElementById('app2') as HTMLCanvasElement;

  // レンダラーを作成・初期設定
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height); // new THREE.PerspectiveCamera(画角, アスペクト比
  camera.position.set(0, 0, 1000);

  // ドーナツを作成
  const geometry = new THREE.TorusGeometry(300, 100, 64, 100);
  const material = new THREE.MeshNormalMaterial();

  const box = new THREE.Mesh(geometry, material);
  scene.add(box);

  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  };

  tick();
};

const initLambertMaterial = () => {
  // サイズを指定
  const width = 960;
  const height = 540;

  const canvas = document.getElementById('app3') as HTMLCanvasElement;

  // レンダラーを作成・初期設定
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height); // new THREE.PerspectiveCamera(画角, アスペクト比
  camera.position.set(0, 0, 1000);

  // ドーナツを作成
  const geometry = new THREE.TorusGeometry(300, 100, 64, 100);
  const material = new THREE.MeshLambertMaterial({ color: 0x6699ff });

  const box = new THREE.Mesh(geometry, material);
  scene.add(box);

  // 並行光源
  const directionLight = new THREE.DirectionalLight(0xffffff);
  directionLight.position.set(1, 1, 1);
  scene.add(directionLight);

  // ポイント光源
  const pointLight = new THREE.PointLight(0xffffff, 2, 1000);
  scene.add(pointLight);

  // ヘルパー類を追加
  const pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
  scene.add(pointLightHelper);

  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;
    renderer.render(scene, camera);

    // ライトを周回させる
    pointLight.position.set(
      500 * Math.sin(Date.now() / 500),
      500 * Math.sin(Date.now() / 1000),
      500 * Math.cos(Date.now() / 500)
    );

    requestAnimationFrame(tick);
  };

  tick();
};

const initPhongMaterial = () => {
  // サイズを指定
  const width = 960;
  const height = 540;

  const canvas = document.getElementById('app4') as HTMLCanvasElement;

  // レンダラーを作成・初期設定
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height); // new THREE.PerspectiveCamera(画角, アスペクト比
  camera.position.set(0, 0, 1000);

  // ドーナツを作成
  const geometry = new THREE.TorusGeometry(300, 100, 64, 100);
  const material = new THREE.MeshPhongMaterial({ color: 0x6699ff });

  const box = new THREE.Mesh(geometry, material);
  scene.add(box);

  // 並行光源
  const directionLight = new THREE.DirectionalLight(0xffffff);
  directionLight.position.set(1, 1, 1);
  scene.add(directionLight);

  // ポイント光源
  const pointLight = new THREE.PointLight(0xffffff, 2, 1000);
  scene.add(pointLight);

  // ヘルパー類を追加
  const pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
  scene.add(pointLightHelper);

  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;

    // ライトを周回させる
    pointLight.position.set(
      500 * Math.sin(Date.now() / 500),
      500 * Math.sin(Date.now() / 1000),
      500 * Math.cos(Date.now() / 500)
    );

    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  };

  tick();
};

const initToonMaterial = () => {
  // サイズを指定
  const width = 960;
  const height = 540;

  const canvas = document.getElementById('app5') as HTMLCanvasElement;

  // レンダラーを作成・初期設定
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height); // new THREE.PerspectiveCamera(画角, アスペクト比
  camera.position.set(0, 0, 1000);

  // ドーナツを作成
  const geometry = new THREE.TorusGeometry(300, 100, 64, 100);
  const material = new THREE.MeshToonMaterial({ color: 0x6699ff });

  const box = new THREE.Mesh(geometry, material);
  scene.add(box);

  // 並行光源
  const directionLight = new THREE.DirectionalLight(0xffffff);
  directionLight.position.set(1, 1, 1);
  scene.add(directionLight);

  // ポイント光源
  const pointLight = new THREE.PointLight(0xffffff, 2, 1000);
  scene.add(pointLight);

  // ヘルパー類を追加
  const pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
  scene.add(pointLightHelper);

  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;

    // ライトを周回させる
    pointLight.position.set(
      500 * Math.sin(Date.now() / 500),
      500 * Math.sin(Date.now() / 1000),
      500 * Math.cos(Date.now() / 500)
    );

    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  };

  tick();
};

const initStandardMaterial = () => {
  // サイズを指定
  const width = 960;
  const height = 540;

  const canvas = document.getElementById('app5') as HTMLCanvasElement;

  // レンダラーを作成・初期設定
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height); // new THREE.PerspectiveCamera(画角, アスペクト比
  camera.position.set(0, 0, 1000);

  // ドーナツを作成
  const geometry = new THREE.TorusGeometry(300, 100, 64, 100);
  const material = new THREE.MeshStandardMaterial({
    color: 0x6699ff,
    roughness: 0.5,
  });

  const box = new THREE.Mesh(geometry, material);
  scene.add(box);

  // 並行光源
  const directionLight = new THREE.DirectionalLight(0xffffff);
  directionLight.position.set(1, 1, 1);
  scene.add(directionLight);

  // ポイント光源
  const pointLight = new THREE.PointLight(0xffffff, 2, 1000);
  scene.add(pointLight);

  // ヘルパー類を追加
  const pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
  scene.add(pointLightHelper);

  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;

    // マテリアルの質感を変化させる
    box.material.roughness = Math.abs(Math.sin(Date.now() / 1000));

    // ライトを周回させる
    pointLight.position.set(
      500 * Math.sin(Date.now() / 500),
      500 * Math.sin(Date.now() / 1000),
      500 * Math.cos(Date.now() / 500)
    );

    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  };

  tick();
};

window.addEventListener('DOMContentLoaded', initBasicMaterial);
window.addEventListener('DOMContentLoaded', initNormalMaterial);
window.addEventListener('DOMContentLoaded', initLambertMaterial);
window.addEventListener('DOMContentLoaded', initPhongMaterial);
window.addEventListener('DOMContentLoaded', initToonMaterial);
window.addEventListener('DOMContentLoaded', initStandardMaterial);
