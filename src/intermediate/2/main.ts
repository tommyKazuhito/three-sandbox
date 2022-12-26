import * as THREE from 'three';

const init = () => {
  // サイズを指定
  const width = 960;
  const height = 540;

  const canvas = document.getElementById('app') as HTMLCanvasElement;

  // マウス座標管理用のベクトルを作成
  const mouse = new THREE.Vector2();

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

  // マウスとの交差を調べたいものは配列に格納する
  const geometry = new THREE.BoxGeometry(50, 50, 50);
  const meshList = [...Array(200)].map(() => {
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * 800;
    mesh.position.y = (Math.random() - 0.5) * 800;
    mesh.position.z = (Math.random() - 0.5) * 800;
    mesh.rotation.x = Math.random() * 2 * Math.PI;
    mesh.rotation.y = Math.random() * 2 * Math.PI;
    mesh.rotation.z = Math.random() * 2 * Math.PI;
    scene.add(mesh);

    return mesh;
  });

  // 平行光源を作成
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // 環境光を作成
  const ambientLight = new THREE.AmbientLight(0x333333);
  scene.add(ambientLight);

  // レイキャストを作成
  const raycaster = new THREE.Raycaster();

  // マウスを動かしたときのイベント
  const handleMousemove = (e: MouseEvent) => {
    const el = e.currentTarget as HTMLCanvasElement;

    // canvas要素上のXY座標
    const x = e.clientX - el.offsetLeft;
    const y = e.clientY - el.offsetTop;

    // canvas要素の幅・高さ
    const w = el.offsetWidth;
    const h = el.offsetHeight;

    // -1〜+1の範囲で現在のマウス座標を登録する
    mouse.x = (x / w) * 2 - 1;
    mouse.y = ((y / h) * 2 - 1) * -1;
  };

  // ヘルパー類を追加
  const cameraHelper = new THREE.CameraHelper(camera);
  const directionalLightHelper = new THREE.DirectionalLightHelper(
    directionalLight
  );

  scene.add(cameraHelper);
  scene.add(directionalLightHelper);

  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    // レイキャスト = マウス位置からまっすぐに伸びる光線ベクトルを生成
    raycaster.setFromCamera(mouse, camera);

    // その光線とぶつかったオブジェクトを得る
    const intersets = raycaster.intersectObjects(meshList);
    meshList.forEach((mesh) => {
      mesh.rotation.y += 0.01;

      /**
       * 交差しているオブジェクトが1つ以上存在し、
       * 交差しているオブジェクトの1番目(最前面)のものだったら
       */
      if (intersets.length > 0 && mesh === intersets[0].object) {
        mesh.material.color.setHex(0xff0000);
      } else {
        mesh.material.color.setHex(0xffffff);
      }
    });

    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  };

  canvas.addEventListener('mousemove', handleMousemove);
  tick();
};

window.addEventListener('DOMContentLoaded', init);
