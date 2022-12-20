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

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(100, 150, 500);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // グループを作る
  const group = new THREE.Group();
  scene.add(group);

  let targetMesh = new THREE.Mesh();

  for (let i = 0; i < 10; i++) {
    const material =
      i === 0 ? new THREE.MeshNormalMaterial() : new THREE.MeshBasicMaterial();
    const geometry = new THREE.SphereGeometry(30, 30, 30);
    const mesh = new THREE.Mesh(geometry, material);
    const radian = (i / 10) * Math.PI * 2;

    mesh.position.set(200 * Math.cos(radian), 0, 200 * Math.sin(radian));

    group.add(mesh);

    if (i === 0) {
      targetMesh = mesh;
    }
  }

  const geometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(50, 50, 0),
  ]);
  const line = new THREE.Line(geometry, new THREE.LineBasicMaterial());
  scene.add(line);

  // ヘルパー類を追加
  scene.add(new THREE.GridHelper(600));
  scene.add(new THREE.AxesHelper(300));

  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    group.rotation.x += 0.02;
    group.rotation.y += 0.01;

    // ワールド座標を取得
    const world = targetMesh.getWorldPosition(new THREE.Vector3());

    // ラインを更新
    const positions = [0, 0, 0, world.x, world.y, world.z];
    line.geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(positions), 3)
    );
    line.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  };

  tick();
};

window.addEventListener('DOMContentLoaded', init);
