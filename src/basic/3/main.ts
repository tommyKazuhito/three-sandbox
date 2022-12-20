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

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height); // new THREE.PerspectiveCamera(視野角, アスペクト比, near, far)
  camera.position.set(20, 20, 20);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // 床を作成
  const meshFloor = new THREE.Mesh(
    new THREE.BoxGeometry(2000, 0.1, 2000),
    new THREE.MeshStandardMaterial({
      color: 0x808080,
      roughness: 0,
    })
  );
  // 影を受け付ける
  meshFloor.receiveShadow = true;
  scene.add(meshFloor);

  // オブジェクトを作成
  const meshKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(3, 1, 100, 16),
    new THREE.MeshStandardMaterial({ color: 0xaa0000, roughness: 0.0 })
  );
  meshKnot.position.set(0, 5, 0);
  // 影を落とす
  meshKnot.castShadow = true;
  scene.add(meshKnot);

  // 照明を作成
  const light = new THREE.SpotLight(0xffffff, 2, 100, Math.PI / 4, 1);
  // ライトに影を有効にする
  light.castShadow = true;
  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 2048;
  scene.add(light);

  // ヘルパー類を追加
  const spotLightHelper = new THREE.SpotLightHelper(light);
  scene.add(spotLightHelper);
  scene.add(new THREE.AxesHelper(1000));

  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    renderer.render(scene, camera);

    // 照明の位置を更新
    const t = Date.now() / 500;
    const r = 20;
    const lx = r * Math.cos(t);
    const lz = r * Math.sin(t);
    const ly = r + 5 * Math.sin(t / 3);
    light.position.set(lx, ly, lz);

    requestAnimationFrame(tick);
  };

  tick();
};

window.addEventListener('DOMContentLoaded', init);
