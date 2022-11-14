import * as THREE from 'three';
import { Vector3 } from 'three';

const initAmbientLight = () => {
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
  camera.position.set(20, 20, 20);
  camera.lookAt(new Vector3(0, 0, 0));

  // 床を作成
  const meshFloor = new THREE.Mesh(
    new THREE.BoxGeometry(2000, 0.1, 2000),
    new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.0 })
  );
  scene.add(meshFloor);

  // オブジェクトを作成
  const meshKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(3, 1, 100, 16),
    new THREE.MeshStandardMaterial({ color: 0xaa0000, roughness: 0.0 })
  );
  meshKnot.position.set(0, 5, 0);
  scene.add(meshKnot);

  // 環境光源を作成
  const light = new THREE.AmbientLight(0xffffff, 1); // new THREE.AmbientLight(色, 光の強さ)
  scene.add(light);

  // ヘルパー類を追加

  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  };

  tick();
};

const initDirectionalLight = () => {
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
  camera.position.set(20, 20, 20);
  camera.lookAt(new Vector3(0, 0, 0));

  // 床を作成
  const meshFloor = new THREE.Mesh(
    new THREE.BoxGeometry(2000, 0.1, 2000),
    new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.0 })
  );
  scene.add(meshFloor);

  // オブジェクトを作成
  const meshKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(3, 1, 100, 16),
    new THREE.MeshStandardMaterial({ color: 0xaa0000, roughness: 0.0 })
  );
  meshKnot.position.set(0, 5, 0);
  scene.add(meshKnot);

  // 平行光源を作成
  const light = new THREE.DirectionalLight(0xffffff, 1); // new THREE.DirectionalLight(色, 光の強さ)
  scene.add(light);

  // ヘルパー類を追加
  const lightHelper = new THREE.DirectionalLightHelper(light);
  scene.add(lightHelper);
  scene.add(new THREE.AxesHelper(1000));

  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    renderer.render(scene, camera);

    // 照明の位置を更新
    const t = Date.now() / 500;
    const r = 10;
    const lx = r * Math.cos(t);
    const lz = r * Math.sin(t);
    const ly = 6 + 5 * Math.sin(t / 3);
    light.position.set(lx, ly, lz);
    lightHelper.update();

    requestAnimationFrame(tick);
  };

  tick();
};

const initHemisphereLight = () => {
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
  camera.position.set(20, 20, 20);
  camera.lookAt(new Vector3(0, 0, 0));

  // 床を作成
  const meshFloor = new THREE.Mesh(
    new THREE.BoxGeometry(2000, 0.1, 2000),
    new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.0 })
  );
  scene.add(meshFloor);

  // オブジェクトを作成
  const meshKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(3, 1, 100, 16),
    new THREE.MeshStandardMaterial({ color: 0xaa0000, roughness: 0.0 })
  );
  meshKnot.position.set(0, 5, 0);
  scene.add(meshKnot);

  // 半球光源を作成
  const light = new THREE.HemisphereLight(0x888888, 0x0000ff, 1); // new THREE.HemisphereLight(空の色, 地の色, 光の強さ)
  scene.add(light);

  // ヘルパー類を追加
  const lightHelper = new THREE.HemisphereLightHelper(light, 10);
  scene.add(lightHelper);
  scene.add(new THREE.AxesHelper(1000));

  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    renderer.render(scene, camera);

    // 照明の位置を更新
    const t = Date.now() / 500;
    const r = 10;
    const lx = r * Math.cos(t);
    const lz = r * Math.sin(t);
    const ly = 6 + 5 * Math.sin(t / 3);
    light.position.set(lx, ly, lz);
    lightHelper.update();

    requestAnimationFrame(tick);
  };

  tick();
};

const initPointLight = () => {
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
  camera.position.set(20, 20, 20);
  camera.lookAt(new Vector3(0, 0, 0));

  // 床を作成
  const meshFloor = new THREE.Mesh(
    new THREE.BoxGeometry(2000, 0.1, 2000),
    new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.0 })
  );
  scene.add(meshFloor);

  // オブジェクトを作成
  const meshKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(3, 1, 100, 16),
    new THREE.MeshStandardMaterial({ color: 0xaa0000, roughness: 0.0 })
  );
  meshKnot.position.set(0, 5, 0);
  scene.add(meshKnot);

  // 点光源を作成
  const light = new THREE.PointLight(0xffffff, 2, 50, 1); // new THREE.PointLight(色, 光の強さ, 距離, 光の減衰率)
  scene.add(light);

  // ヘルパー類を追加
  const lightHelper = new THREE.PointLightHelper(light);
  scene.add(lightHelper);
  scene.add(new THREE.AxesHelper(1000));

  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    renderer.render(scene, camera);

    // 照明の位置を更新
    const t = Date.now() / 500;
    const r = 10;
    const lx = r * Math.cos(t);
    const lz = r * Math.sin(t);
    const ly = 6 + 5 * Math.sin(t / 3);
    light.position.set(lx, ly, lz);
    light.lookAt(new THREE.Vector3(0, 0, 0));
    lightHelper.update();

    requestAnimationFrame(tick);
  };

  tick();
};

const initSpotLight = () => {
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
  camera.position.set(20, 20, 20);
  camera.lookAt(new Vector3(0, 0, 0));

  // 床を作成
  const meshFloor = new THREE.Mesh(
    new THREE.BoxGeometry(2000, 0.1, 2000),
    new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.0 })
  );
  scene.add(meshFloor);

  // オブジェクトを作成
  const meshKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(3, 1, 100, 16),
    new THREE.MeshStandardMaterial({ color: 0xaa0000, roughness: 0.0 })
  );
  meshKnot.position.set(0, 5, 0);
  scene.add(meshKnot);

  // スポットライト光源を作成
  const light = new THREE.SpotLight(
    0xffffff,
    4,
    50,
    Math.sin(Math.PI / 4),
    0,
    0.5
  ); // new THREE.SpotLight(色, 光の強さ, 距離, 角度, ボケ具合, 減衰率)
  scene.add(light);

  // ヘルパー類を追加
  const lightHelper = new THREE.SpotLightHelper(light);
  scene.add(lightHelper);
  scene.add(new THREE.AxesHelper(1000));

  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    renderer.render(scene, camera);

    // 照明の位置を更新
    const t = Date.now() / 500;
    const r = 10;
    const lx = r * Math.cos(t);
    const lz = r * Math.sin(t);
    const ly = 6 + 5 * Math.sin(t / 3);
    light.position.set(lx, ly, lz);
    lightHelper.update();

    requestAnimationFrame(tick);
  };

  tick();
};

const initRectAreaLight = () => {
  // サイズを指定
  const width = 960;
  const height = 540;

  const canvas = document.getElementById('app6') as HTMLCanvasElement;

  // レンダラーを作成・初期設定
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height); // new THREE.PerspectiveCamera(画角, アスペクト比
  camera.position.set(20, 20, 20);
  camera.lookAt(new Vector3(0, 0, 0));

  // 床を作成
  const meshFloor = new THREE.Mesh(
    new THREE.BoxGeometry(2000, 0.1, 2000),
    new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.0 })
  );
  scene.add(meshFloor);

  // オブジェクトを作成
  const meshKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(3, 1, 100, 16),
    new THREE.MeshStandardMaterial({ color: 0xaa0000, roughness: 0.0 })
  );
  meshKnot.position.set(0, 5, 0);
  scene.add(meshKnot);

  // 矩形光源を作成
  const light = new THREE.RectAreaLight(0xffffff, 5, 10, 10); // new THREE.RectAreaLight(色, 光の強さ, 幅, 高さ)
  scene.add(light);

  // ヘルパー類を追加
  scene.add(new THREE.AxesHelper(1000));

  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    renderer.render(scene, camera);

    // 照明の位置を更新
    const t = Date.now() / 1000;
    const r = 10;
    const lx = r * Math.cos(t);
    const lz = r * Math.sin(t);
    const ly = 5 + 5 * Math.sin(t / 3);
    light.position.set(lx, ly, lz);
    light.lookAt(new THREE.Vector3(0, 0, 0));

    requestAnimationFrame(tick);
  };

  tick();
};

window.addEventListener('DOMContentLoaded', initAmbientLight);
window.addEventListener('DOMContentLoaded', initDirectionalLight);
window.addEventListener('DOMContentLoaded', initHemisphereLight);
window.addEventListener('DOMContentLoaded', initPointLight);
window.addEventListener('DOMContentLoaded', initSpotLight);
window.addEventListener('DOMContentLoaded', initRectAreaLight);
