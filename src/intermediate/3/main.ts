import * as THREE from 'three';

const init = () => {
  // サイズを指定
  const width = 960;
  const height = 540;

  const canvas = document.getElementById('app') as HTMLCanvasElement;

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

  // 星屑を作成します (カメラの動きをわかりやすくするため)
  const createStarField = () => {
    // 頂点情報を格納する配列
    const vertices: number[] = [];

    // 配置する範囲
    const size = 3000;

    // 配置する個数
    const length = 1000;

    [...Array(length)].forEach(() => {
      const x = size * (Math.random() - 0.5);
      const y = size * (Math.random() - 0.5);
      const z = size * (Math.random() - 0.5);

      vertices.push(x, y, z);
    });

    // 形状データを作成
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    );

    // マテリアルを作成
    const material = new THREE.PointsMaterial({
      // 一つ一つのサイズ
      size: 10,
      // 色
      color: 0xffffff,
    });

    // 物体を作成
    const mesh = new THREE.Points(geometry, material);
    scene.add(mesh);
  };
  createStarField();

  // ヘルパー類を追加
  const cameraHelper = new THREE.CameraHelper(camera);

  scene.add(cameraHelper);

  // 毎フレーム時に実行されるループイベントです
  let rot = 0;
  const tick = () => {
    rot += 1;

    // ラジアンに変換する
    const rad = (rot * Math.PI) / 180;

    // 角度に応じてカメラの位置を設定
    camera.position.x = 1000 * Math.sin(rad);
    camera.position.z = 1000 * Math.cos(rad);

    // 原点方向を見つめる
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  };

  tick();
};

window.addEventListener('DOMContentLoaded', init);
