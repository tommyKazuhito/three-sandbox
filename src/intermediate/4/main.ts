/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import Stats from 'stats-js';
import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';

const initHeavy = () => {
  // サイズを指定
  const width = 960;
  const height = 540;

  // 1辺あたりに配置するオブジェクトの個数
  const cellCount = 20;

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
  const camera = new THREE.PerspectiveCamera(45, width / height); // new THREE.PerspectiveCamera(画角, アスペクト比
  camera.position.set(0, 0, 400);

  const container = new THREE.Group();
  scene.add(container);

  // 共通マテリアル
  const material = new THREE.MeshNormalMaterial();

  // Box
  [...Array(cellCount)].forEach((_, i) => {
    [...Array(cellCount)].forEach((__, j) => {
      [...Array(cellCount)].forEach((___, k) => {
        // 立方体個別の要素を作成
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5), material);

        // XYZ座標を設定
        mesh.position.set(
          10 * (i - cellCount / 2),
          10 * (j - cellCount / 2),
          10 * (k - cellCount / 2)
        );

        container.add(mesh);
      });
    });
  });

  // フレームレートの数値を画面に表示
  const stats = new Stats();
  stats.dom.style.position = 'absolute';
  stats.dom.style.top = '0px';
  canvas.parentNode?.insertBefore(stats.dom, canvas.nextSibling);

  // ヘルパー類を追加
  const cameraHelper = new THREE.CameraHelper(camera);

  scene.add(cameraHelper);

  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    container.rotation.x += Math.PI / 180;
    container.rotation.y += Math.PI / 180;

    renderer.render(scene, camera);

    // レンダリング情報を画面に表示
    document.getElementById('info1')!.innerHTML = JSON.stringify(
      renderer.info.render,
      undefined,
      '    '
    );

    // フレームレートを表示
    stats.update();

    requestAnimationFrame(tick);
  };

  tick();
};

const initOptimized = () => {
  // サイズを指定
  const width = 960;
  const height = 540;

  // 1辺あたりに配置するオブジェクトの個数
  const cellCount = 20;

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
  camera.position.set(0, 0, 400);

  // 結合用のジオメトリを格納する配列
  const boxes = [];
  for (let i = 0; i < cellCount; i++) {
    for (let j = 0; j < cellCount; j++) {
      for (let k = 0; k < cellCount; k++) {
        // 立方体個別の要素を作成
        const box = new THREE.BoxGeometry(5, 5, 5);

        // 座標調整
        const translated = box.translate(
          10 * (i - cellCount / 2),
          10 * (j - cellCount / 2),
          10 * (k - cellCount / 2)
        );

        boxes.push(translated);
      }
    }
  }
  console.log(boxes.length);

  // ジオメトリを生成
  const geometry = BufferGeometryUtils.mergeBufferGeometries(boxes);

  // マテリアルを作成
  const material = new THREE.MeshNormalMaterial();

  // メッシュを作成
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // フレームレートの数値を画面に表示
  const stats = new Stats();
  stats.dom.style.position = 'absolute';
  stats.dom.style.top = '0px';
  canvas.parentNode?.insertBefore(stats.dom, canvas.nextSibling);

  // ヘルパー類を追加
  const cameraHelper = new THREE.CameraHelper(camera);

  scene.add(cameraHelper);

  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    mesh.rotation.x += Math.PI / 180;
    mesh.rotation.y += Math.PI / 180;

    renderer.render(scene, camera);

    // レンダリング情報を画面に表示
    document.getElementById('info2')!.innerHTML = JSON.stringify(
      renderer.info.render,
      undefined,
      '    '
    );

    // フレームレートを表示
    stats.update();

    requestAnimationFrame(tick);
  };

  tick();
};

// window.addEventListener('DOMContentLoaded', initHeavy);
window.addEventListener('DOMContentLoaded', initOptimized);
