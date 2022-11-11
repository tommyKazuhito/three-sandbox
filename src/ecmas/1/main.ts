/* eslint-disable max-classes-per-file */
import * as THREE from 'three';

class Donuts extends THREE.Mesh {
  constructor() {
    // ジオメトリを作成
    const geometry = new THREE.TorusGeometry(120, 40, 60, 50);

    // マテリアルを作成
    const material = new THREE.MeshNormalMaterial();

    // 継承元のコンストラクターを実行
    super(geometry, material);
  }
}

class MyGroup extends THREE.Group {
  constructor() {
    super();

    const length = 10;
    for (let i = 0; i < length; i++) {
      // 球体を作成
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(30, 30, 30),
        new THREE.MeshNormalMaterial()
      );

      // 配置座標を計算
      const rad = (i / length) * 2 * Math.PI;
      mesh.position.set(200 * Math.cos(rad), 15, 200 * Math.sin(rad));

      // グループに追加する
      this.add(mesh);
    }
  }
}

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
  const camera = new THREE.PerspectiveCamera(45, width / height); // new THREE.PerspectiveCamera(画角, アスペクト比
  camera.position.set(0, 0, 1000);

  // ドーナツを作る
  const mesh = new Donuts();
  scene.add(mesh);

  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    mesh.rotation.y += 0.02;
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  };

  tick();
};

const initOption = () => {
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
  camera.position.set(-100, 150, 500);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // 地面を作成
  scene.add(new THREE.GridHelper(600));
  scene.add(new THREE.AxesHelper(300));

  // グループを作る
  const group = new MyGroup();
  scene.add(group);

  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    group.rotation.y += 0.02;
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  };

  tick();
};

window.addEventListener('DOMContentLoaded', initBasic);
window.addEventListener('DOMContentLoaded', initOption);
