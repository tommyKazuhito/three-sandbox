import * as THREE from 'three';

import floorTexture from '@img/floor.png';

const initPerspectiveCamera = () => {
  // サイズを指定
  const width = 960;
  const height = 540;

  const canvas = document.getElementById('app1') as HTMLCanvasElement;

  // レンダラーを作成・初期設定
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // レンダラー側で影を有効に
  renderer.shadowMap.enabled = true;

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(30, width / height); // new THREE.PerspectiveCamera(視野角, アスペクト比, near, far)

  // 光源を作成
  const spotLight = new THREE.SpotLight(
    0xffffff,
    4,
    2000,
    Math.PI / 5,
    0.2,
    1.5
  );
  spotLight.position.set(500, 300, 500);
  spotLight.castShadow = true; // 影を落とす設定
  spotLight.shadow.mapSize.width = 2048;
  spotLight.shadow.mapSize.height = 2048;
  scene.add(spotLight);

  // 地面を作成
  const texture = new THREE.TextureLoader().load(floorTexture);
  texture.wrapS = THREE.RepeatWrapping; // リピート可能に
  texture.wrapT = THREE.RepeatWrapping; // リピート可能に
  texture.repeat.set(10, 10); // 10x10マスに設定
  texture.magFilter = THREE.NearestFilter; // アンチエイリアスを外す

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(1000, 1000),
    new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0,
      metalness: 0.6,
    })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  // マス目を作成
  const material = new THREE.MeshStandardMaterial({
    color: 0x22dd22,
    roughness: 0.1,
    metalness: 0.2,
  });

  const geometry = new THREE.BoxGeometry(45, 45, 45);

  // 立方体を複数作成しランダムに配置
  for (let i = 0; i < 60; i++) {
    const box = new THREE.Mesh(geometry, material);

    box.position.x = Math.round((Math.random() - 0.5) * 19) * 50 + 25;
    box.position.y = 25;
    box.position.z = Math.round((Math.random() - 0.5) * 19) * 50 + 25;

    // 影の設定
    box.receiveShadow = true;
    box.castShadow = true;

    scene.add(box);
  }

  // ヘルパー類を追加
  const spotLightHelper = new THREE.SpotLightHelper(spotLight);
  scene.add(spotLightHelper);
  scene.add(new THREE.AxesHelper(1000));

  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    // 角度に応じてカメラの位置を設定
    camera.position.x = 500 * Math.sin(Date.now() / 2000);
    camera.position.y = 250;
    camera.position.z = 500 * Math.cos(Date.now() / 2000);
    // 原点方向を見つめる
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  };

  tick();
};

const initOrthographicCamera = () => {
  // サイズを指定
  const width = 960;
  const height = 540;

  const canvas = document.getElementById('app2') as HTMLCanvasElement;

  // レンダラーを作成・初期設定
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // レンダラー側で影を有効に
  renderer.shadowMap.enabled = true;

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.OrthographicCamera(-480, 480, 270, -270); // new THREE.PerspectiveCamera(視野角, アスペクト比, near, far)

  // 光源を作成
  const spotLight = new THREE.SpotLight(
    0xffffff,
    4,
    2000,
    Math.PI / 5,
    0.2,
    1.5
  );
  spotLight.position.set(500, 300, 500);
  spotLight.castShadow = true; // 影を落とす設定
  spotLight.shadow.mapSize.width = 2048;
  spotLight.shadow.mapSize.height = 2048;
  scene.add(spotLight);

  // 地面を作成
  const texture = new THREE.TextureLoader().load(floorTexture);
  texture.wrapS = THREE.RepeatWrapping; // リピート可能に
  texture.wrapT = THREE.RepeatWrapping; // リピート可能に
  texture.repeat.set(10, 10); // 10x10マスに設定
  texture.magFilter = THREE.NearestFilter; // アンチエイリアスを外す

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(1000, 1000),
    new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0,
      metalness: 0.6,
    })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  // マス目を作成
  const material = new THREE.MeshStandardMaterial({
    color: 0x22dd22,
    roughness: 0.1,
    metalness: 0.2,
  });

  const geometry = new THREE.BoxGeometry(45, 45, 45);

  // 立方体を複数作成しランダムに配置
  for (let i = 0; i < 60; i++) {
    const box = new THREE.Mesh(geometry, material);

    box.position.x = Math.round((Math.random() - 0.5) * 19) * 50 + 25;
    box.position.y = 25;
    box.position.z = Math.round((Math.random() - 0.5) * 19) * 50 + 25;

    // 影の設定
    box.receiveShadow = true;
    box.castShadow = true;

    scene.add(box);
  }

  // ヘルパー類を追加
  const spotLightHelper = new THREE.SpotLightHelper(spotLight);
  scene.add(spotLightHelper);
  scene.add(new THREE.AxesHelper(1000));

  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    // 角度に応じてカメラの位置を設定
    camera.position.x = 500 * Math.sin(Date.now() / 2000);
    camera.position.y = 250;
    camera.position.z = 500 * Math.cos(Date.now() / 2000);
    // 原点方向を見つめる
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  };

  tick();
};

window.addEventListener('DOMContentLoaded', initPerspectiveCamera);
window.addEventListener('DOMContentLoaded', initOrthographicCamera);
