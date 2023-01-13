import * as THREE from 'three';

class Stage {
  scene: THREE.Scene;

  renderer: THREE.WebGLRenderer;

  camera: THREE.PerspectiveCamera;

  constructor(canvas: HTMLCanvasElement, camera?: THREE.PerspectiveCamera) {
    if (canvas === null) {
      throw new Error('Canvas is not Exist');
    }

    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    this.camera = camera || new THREE.PerspectiveCamera(45, 1, 1, 10000);

    this.onResize = this.onResize.bind(this);

    this.onResize();
    window.addEventListener('resize', this.onResize);
  }

  private onResize() {
    const { innerWidth, innerHeight, devicePixelRatio } = window;

    // レンダラーのサイズを調整する
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(innerWidth, innerHeight);

    // カメラのアスペクト比を正す
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
  }
}

/**
 * 角度を渡して円運動の位置を返却します
 *
 * @param {number} radius
 * @param {number} deg
 * @return {THREE.Vector3}
 */
const getCircularMotionPosition = (radius: number, deg: number) => {
  // 角度をラジアンに変換します
  const rad = (deg * Math.PI) / 180;

  // X座標 = 半径 x Cosθ
  const x = radius * Math.cos(rad);

  // Y座標
  const y = (radius * Math.sin(rad * 1.5)) / 7;

  // Z座標 = 半径 x Sinθ
  const z = radius * Math.sin(rad);

  return new THREE.Vector3(x, y, z);
};

const initStep1 = () => {
  const canvas = document.getElementById('app1') as HTMLCanvasElement;

  const stage = new Stage(canvas);

  let degree = 0; // 角度
  const radius = 150; // 半径
  let frontVector = new THREE.Vector3(0, -1, 0);

  // カメラ
  stage.camera.position.set(0, 0, -400);
  stage.camera.lookAt(new THREE.Vector3(0, 0, 0));

  // 球
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(10),
    new THREE.MeshBasicMaterial({ color: 0xcc0000, wireframe: true })
  );
  stage.scene.add(sphere);

  // ヘルパー
  const helper = new THREE.ArrowHelper(
    frontVector,
    new THREE.Vector3(0, 0, 0),
    40
  );
  sphere.add(helper);

  // 地球
  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(70, 20, 20),
    new THREE.MeshBasicMaterial({ color: 0x666666, wireframe: true })
  );
  stage.scene.add(earth);

  // 地面
  const plane = new THREE.GridHelper(1000, 20);
  plane.position.y = -80;
  stage.scene.add(plane);

  // ️アニメーション時間（ミリ秒）
  const duration = 1000;

  // アニメーションの開始時間を格納する
  const startTime = Date.now();

  // フレーム毎のレンダーを登録 ※リフレッシュレートには依存しない
  const tick = () => {
    // 現在時間の継続時間に対する進捗度を算出
    const progress = (Date.now() - startTime) / duration;

    // 球を回転させる
    // 1秒(duration秒)で-120度回転する
    degree = -120 * progress;

    // 現在の位置を保持しておく
    const oldPosition = sphere.position.clone();

    // アニメーション後の新しい位置を取得
    const newPosition = getCircularMotionPosition(radius, degree);

    // oldPosition - newPositionで進んでいる方向のベクトルを算出
    frontVector = newPosition.clone().sub(oldPosition);

    // 単位ベクトルに変換
    frontVector = frontVector.normalize();

    // 球の位置を更新
    sphere.position.copy(newPosition);

    // ヘルパーの向きを更新
    helper.setDirection(frontVector);

    stage.renderer.render(stage.scene, stage.camera);

    requestAnimationFrame(tick);
  };
  tick();
};

const initStep2 = () => {
  const canvas = document.getElementById('app2') as HTMLCanvasElement;

  const stage = new Stage(canvas);

  let degree = 0; // 角度
  const radius = 150; // 半径
  let frontVector = new THREE.Vector3(0, -1, 0);

  // カメラ
  stage.camera.position.set(0, 0, -400);
  stage.camera.lookAt(new THREE.Vector3(0, 0, 0));

  // 球
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(10),
    new THREE.MeshBasicMaterial({ color: 0xcc0000, wireframe: true })
  );
  stage.scene.add(sphere);

  // ヘルパー
  const helper = new THREE.ArrowHelper(
    frontVector,
    new THREE.Vector3(0, 0, 0),
    40
  );
  sphere.add(helper);

  // 地球
  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(70, 20, 20),
    new THREE.MeshBasicMaterial({ color: 0x888888, wireframe: true })
  );
  stage.scene.add(earth);

  // 地面
  const plane = new THREE.GridHelper(1000, 20);
  plane.position.y = -80;
  stage.scene.add(plane);

  // ️アニメーション時間（ミリ秒）
  const duration = 1000;

  // アニメーションの開始時間を格納する
  const startTime = Date.now();

  // フレーム毎のレンダーを登録 ※リフレッシュレートには依存しない
  const tick = () => {
    // 現在時間の継続時間に対する進捗度を算出
    const progress = (Date.now() - startTime) / duration;

    // 球を回転させる
    // 1秒(duration秒)で-120度回転する
    degree = -120 * progress;

    // 現在の位置を保持しておく
    const oldPosition = sphere.position.clone();

    // アニメーション後の新しい位置を取得
    const newPosition = getCircularMotionPosition(radius, degree);

    // oldPosition - newPositionで進んでいる方向のベクトルを算出
    frontVector = newPosition.clone().sub(oldPosition);

    // 単位ベクトルに変換
    frontVector = frontVector.normalize();

    // 正面ベクトルに対して逆向きのベクトル
    const backVector = frontVector.clone().negate();

    // 球とカメラの距離
    const d = 200;

    // 逆向きベクトルを距離分引き伸ばす
    backVector.multiplyScalar(d);

    // カメラ位置を算出
    const cameraPosition = backVector.add(sphere.position);
    stage.camera.position.copy(cameraPosition);

    // カメラを球に向かせる
    stage.camera.lookAt(sphere.position);

    // 球の位置を更新
    sphere.position.copy(newPosition);

    // ヘルパーの向きを更新
    helper.setDirection(frontVector);

    stage.renderer.render(stage.scene, stage.camera);

    requestAnimationFrame(tick);
  };
  tick();
};

window.addEventListener('DOMContentLoaded', initStep1);
window.addEventListener('DOMContentLoaded', initStep2);
