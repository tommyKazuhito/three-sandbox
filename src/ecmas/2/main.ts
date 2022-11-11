/* eslint-disable max-classes-per-file */
import * as THREE from 'three';

class MyGroup extends THREE.Object3D {
  sphere: THREE.Mesh;

  donuts: THREE.Mesh;

  constructor() {
    super();

    // 球体を作成
    this.sphere = new THREE.Mesh(
      new THREE.SphereGeometry(40, 40, 40),
      new THREE.MeshNormalMaterial()
    );
    // ドーナツを作成
    this.donuts = new THREE.Mesh(
      new THREE.TorusGeometry(120, 40, 60, 60),
      new THREE.MeshNormalMaterial()
    );

    // グループに追加する
    this.add(this.sphere);
    this.add(this.donuts);
  }

  /** 更新命令を定義します。 */
  update() {
    // X軸に動かす
    this.sphere.position.x = 200 * Math.sin(Date.now() / 500);

    // 回転させる
    this.donuts.rotation.y += 0.01;
  }
}

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
  camera.position.set(0, 0, 500);

  // 独自グループを作る
  const group = new MyGroup();
  scene.add(group);

  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    group.update();
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  };

  tick();
};

window.addEventListener('DOMContentLoaded', init);
