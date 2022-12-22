import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';
import { TDSLoader } from 'three/examples/jsm/loaders/TDSLoader';

const init3ds = () => {
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
  const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 10000); // new THREE.PerspectiveCamera(視野角, アスペクト比, near, far)
  // カメラの初期座標を設定
  camera.position.set(0, 0, 5);

  // カメラコントローラーを作成
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.2;
  controls.update();

  // 平行光源を作成
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // 環境光を追加
  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);

  // 3DS形式のモデルデータを読み込む
  const loader = new TDSLoader();
  // テクスチャーのパスを指定
  loader.setResourcePath('/models/3ds/portalgun/textures/');
  // 3dsファイルのパスを指定
  loader.load('/models/3ds/portalgun/portalgun.3ds', (object) => {
    // 読み込み後に3D空間に追加
    scene.add(object);
  });

  // ヘルパー類を追加
  scene.add(new THREE.GridHelper(100, 100));
  scene.add(new THREE.AxesHelper(300));

  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  };

  tick();
};

const initCollada = () => {
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
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000); // new THREE.PerspectiveCamera(視野角, アスペクト比, near, far)
  // カメラの初期座標を設定
  camera.position.set(0, 10, 10);

  // カメラコントローラーを作成
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 3, 0);
  controls.enableDamping = true;
  controls.dampingFactor = 0.2;
  controls.update();

  // 平行光源を作成
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // 環境光を追加
  const ambientLight = new THREE.AmbientLight(0x333333);
  scene.add(ambientLight);

  // 地面を作成
  const meshFloor = new THREE.Mesh(
    new THREE.BoxGeometry(2000, 0.1, 2000),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0,
    })
  );
  meshFloor.receiveShadow = true;
  scene.add(meshFloor);

  // 3DS形式のモデルデータを読み込む
  const loader = new ColladaLoader();
  // テクスチャーのパスを指定
  loader.load('/models/collada/elf/elf.dae', (collada) => {
    // 読み込み後に3D空間に追加
    const model = collada.scene;
    model.traverse((object) => {
      console.log(object.name);
      if (object.type === 'Mesh') {
        object.receiveShadow = true;
        object.castShadow = true;
      }
    });
    scene.add(model);
  });

  // ヘルパー類を追加
  scene.add(new THREE.GridHelper(100, 100));
  scene.add(new THREE.AxesHelper(300));

  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  };

  tick();
};

window.addEventListener('DOMContentLoaded', init3ds);
window.addEventListener('DOMContentLoaded', initCollada);
