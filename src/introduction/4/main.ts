import * as THREE from 'three';
import { Float32BufferAttribute } from 'three';

import earthmap from '@img/earthmap1k.jpg';

const initBasic = () => {
  // サイズを指定
  const width = 960;
  const height = 540;

  // カメラの回転角を保存する変数
  let rotation = 0;

  // レンダラーを作成・初期設定
  const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('app1') as HTMLElement,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height); // new THREE.PerspectiveCamera(画角, アスペクト比

  // 平行光源を作成
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // マテリアルを作成
  const material = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load(earthmap),
    side: THREE.DoubleSide,
  });

  // 球体を作成
  const geometry = new THREE.SphereGeometry(300, 30, 30);

  // メッシュを作成
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 星屑を作成 (カメラの動きをわかりやすくするため)
  (() => {
    // 頂点情報を作成
    const vertices: number[] = [];
    for (let i = 0; i < 1000; i++) {
      const x = 3000 * (Math.random() - 0.5);
      const y = 3000 * (Math.random() - 0.5);
      const z = 3000 * (Math.random() - 0.5);

      vertices.push(x, y, z);
    }

    // 形状データを作成
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new Float32BufferAttribute(vertices, 3));

    // マテリアルを作成
    const mat = new THREE.PointsMaterial({
      size: 10,
      color: 0xffffff,
    });

    // 物体を作成
    const me = new THREE.Points(geo, mat);
    scene.add(me);
  })();

  // ヘルパー類を追加
  const cameraHelper = new THREE.CameraHelper(camera);
  const directionalLightHelper = new THREE.DirectionalLightHelper(
    directionalLight
  );
  scene.add(cameraHelper);
  scene.add(directionalLightHelper);

  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    // 毎フレーム角度を0.5度ずつ足していく
    rotation += 0.5;

    // ラジアンに変換
    const rad = rotation * (Math.PI / 180);

    // 角度に応じてカメラの位置を設定(円周上)
    camera.position.x = 1000 * Math.sin(rad);
    camera.position.z = 1000 * Math.cos(rad);

    // 原点方向を見つめる
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // 地球は常に回転させておく
    mesh.rotation.y += 0.01;

    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  };
  tick();
};

const initOptional = () => {
  // サイズを指定
  const width = 960;
  const height = 540;

  // カメラの回転角を保存する変数
  let rotation = 0;

  // マウスのX座標を保存する関数
  let mouseX = 0;

  const onMousemove = (e: MouseEvent) => {
    mouseX = e.pageX;
  };

  // レンダラーを作成・初期設定
  const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('app2') as HTMLElement,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height); // new THREE.PerspectiveCamera(画角, アスペクト比

  // 平行光源を作成
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // マテリアルを作成
  const material = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load(earthmap),
    side: THREE.DoubleSide,
  });

  // 球体を作成
  const geometry = new THREE.SphereGeometry(300, 30, 30);

  // メッシュを作成
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 星屑を作成 (カメラの動きをわかりやすくするため)
  const points: THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>[] = [];
  (() => {
    // 頂点情報を作成
    const vertices: number[] = [];
    for (let i = 0; i < 1000; i++) {
      const x = 3000 * (Math.random() - 0.5);
      const y = 3000 * (Math.random() - 0.5);
      const z = 3000 * (Math.random() - 0.5);

      vertices.push(x, y, z);
    }

    // 形状データを作成
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new Float32BufferAttribute(vertices, 3));

    // マテリアルを作成
    const mat = new THREE.PointsMaterial({
      color: 0xffffff,
    });

    // 物体を作成
    const me = new THREE.Points(geo, mat);
    scene.add(me);

    points.push(me);
  })();
  points.forEach((p) => {
    p.material.size = Math.floor(Math.random() * 10) + 1;
  });

  // ヘルパー類を追加
  const cameraHelper = new THREE.CameraHelper(camera);
  const directionalLightHelper = new THREE.DirectionalLightHelper(
    directionalLight
  );
  scene.add(cameraHelper);
  scene.add(directionalLightHelper);

  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    // マウスの位置に応じて角度を設定
    // マウスのX座標がステージの幅の何%の位置にあるか調べてそれを360度で乗算する
    const targetX = (mouseX / window.innerWidth) * 360;

    // イージングの公式を用いて滑らかにする
    // 値 += (目標値 - 現在の値) * 減速値
    rotation += (targetX - rotation) * 0.02;

    // ラジアンに変換
    const rad = (rotation * Math.PI) / 180;

    // 角度に応じてカメラの位置を設定(円周上)
    camera.position.x = 1000 * Math.sin(rad);
    camera.position.z = 1000 * Math.cos(rad);

    // 原点方向を見つめる
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // 地球は常に回転させておく
    mesh.rotation.y += 0.01;

    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  };
  tick();

  document.addEventListener('mousemove', onMousemove);
};

window.addEventListener('DOMContentLoaded', initBasic);
window.addEventListener('DOMContentLoaded', initOptional);
