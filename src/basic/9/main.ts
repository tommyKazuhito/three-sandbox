import * as THREE from 'three';

const init = () => {
  // サイズを指定
  const width = 960;
  const height = 540;

  const canvas = document.getElementById('app') as HTMLCanvasElement;

  const tf = document.getElementById('hud');
  const line = document.getElementById('svgLine');

  // レンダラーを作成・初期設定
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(100, 150, 500);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // 球体を作成
  const material = new THREE.MeshNormalMaterial();
  const geometry = new THREE.SphereGeometry(30, 30, 30);

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // ヘルパー類を追加
  scene.add(new THREE.GridHelper(600));
  scene.add(new THREE.AxesHelper(300));

  // 毎フレーム時に実行されるループイベントです
  let rot = 0;

  const tick = () => {
    // 毎フレーム角度を0.5度ずつ足していく
    rot += 0.5;

    // ラジアンに変換する
    const rad = (rot * Math.PI) / 180;

    // 球体を円周運動
    mesh.position.x = 200 * Math.sin(rad);
    mesh.position.y = 50;
    mesh.position.z = 200 * Math.cos(rad);

    // レンダリング
    renderer.render(scene, camera);

    // 球体のワールド座標を取得する
    const worldPosition = mesh.getWorldPosition(new THREE.Vector3());

    // スクリーン座標を取得する
    const projection = worldPosition.project(camera);
    const screenX = width * 0.5 * (+projection.x + 1);
    const screenY = height * 0.5 * (-projection.y + 1);

    // テキストフィールドにスクリーン座標を表示
    tf!.innerHTML = `👆スクリーン座標(${Math.round(screenX)}, ${Math.round(
      screenY
    )})`;
    tf!.style.transform = `translate(${screenX}px, ${screenY}px)`;

    // SVGでラインを描画
    line?.setAttribute('x2', screenX.toString());
    line?.setAttribute('y2', screenY.toString());

    requestAnimationFrame(tick);
  };

  tick();
};

window.addEventListener('DOMContentLoaded', init);
