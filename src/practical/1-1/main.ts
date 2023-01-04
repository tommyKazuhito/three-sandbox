/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { match } from 'ts-pattern';

import CityLine from './objects/CityLine';
import CityPoint from './objects/CityPoint';
import Earth from './objects/Earth';
import { applyGpsPosition } from './utils/applyGpsPosition';

import groundTexture from '@img/ground.jpg';
import starTexture from '@img/trigonometric/star.jpg';

/**
 * 緯度経度から位置を算出します。
 * @param {number} latitude 緯度です(単位は度数法)。
 * @param {number} longitude 経度です(単位は度数法)。
 * @param {number} radius 半径です。
 * @returns {THREE.Vector3} 3Dの座標です。
 * @see https://ics.media/entry/10657
 */
const translateGeoCoords = (
  latitude: number,
  longitude: number,
  radius: number
) => {
  // 仰角
  const phi = (latitude * Math.PI) / 180;
  // 方位角
  const theta = ((longitude - 180) * Math.PI) / 180;

  const x = radius * Math.cos(phi) * Math.cos(theta) * -1;
  const y = radius * Math.sin(phi);
  const z = radius * Math.cos(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
};

/**
 * 軌道の座標を配列で返します。
 *
 * @param {THREE.Vector3} startPos 開始点です。
 * @param {THREE.Vector3} endPos 終了点です。
 * @param {number} segmentNum セグメント分割数です。
 * @returns {THREE.Vector3[]} 軌跡座標の配列です。
 */
const createOrbitPoints = (
  start: THREE.Vector3,
  end: THREE.Vector3,
  segment: number
) => {
  // 頂点を格納する配列
  const vertices = [];

  const startVec = start.clone();
  const endVec = end.clone();

  // ２つのベクトルの回転軸
  const axis = startVec.clone().cross(endVec);
  // 軸ベクトルを単位ベクトルに
  axis.normalize();

  // ２つのベクトルが織りなす角度
  const angle = startVec.angleTo(endVec);

  // ２つの点を結ぶ弧を描くための頂点を打つ
  [...Array(segment)].forEach((_, i) => {
    // axisを軸としたクォータニオンを生成
    const q = new THREE.Quaternion();
    q.setFromAxisAngle(axis, (angle / segment) * i);

    // ベクトルを回転させる
    const vertex = startVec.clone().applyQuaternion(q);

    vertices.push(vertex);
  });

  vertices.push(endVec);
  console.log((angle * 180) / Math.PI);

  return vertices;
};

/**
 * プロットする点を生成します
 * @param {number} color
 * @param {number} latitude
 * @param {number} longitude
 * @returns {THREE.Mesh} 球
 * @see https://ics.media/entry/10657
 */
const createPoint = (
  color: number,
  latitude: number = 0,
  longitude: number = 0
) => {
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1),
    new THREE.MeshBasicMaterial({
      color,
    })
  );

  // 緯度経度から位置を設定
  sphere.position.copy(translateGeoCoords(latitude, longitude, 100));

  return sphere;
};

/**
 * 二点を結ぶラインを生成します
 * @param {THREE.Vector3} startPoint 開始点
 * @param {THREE.Vector3} endPoint 終了点
 * @returns {THREE.Line} 線
 * @see https://ics.media/entry/10657
 */
const createLine = (startPoint: THREE.Vector3, endPoint: THREE.Vector3) => {
  // 線
  const points = createOrbitPoints(startPoint, endPoint, 50);
  const geometry = new THREE.BufferGeometry();

  geometry.setFromPoints(points);

  return new THREE.Line(
    geometry,
    new THREE.LineBasicMaterial({ linewidth: 5, color: 0x00ffff })
  );
};

const initCoordinates = () => {
  // シーン
  const scene = new THREE.Scene();

  // カメラ
  const camera = new THREE.PerspectiveCamera(45, 1, 1, 2000);
  camera.position.set(0, 0, 1000);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // レンダラー
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.domElement.setAttribute('id', 'app1');
  document.body.appendChild(renderer.domElement);

  // 球
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(10),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
  );
  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(250),
    new THREE.MeshBasicMaterial({ wireframe: true })
  );
  scene.add(sphere);
  scene.add(earth);

  // リサイズイベント
  const onResize = (e?: Event) => {
    // サイズを取得
    const width = window.innerWidth;
    const height = window.innerHeight;

    // レンダラーのサイズを調整する
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // カメラのアスペクト比を正す
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  onResize();

  // フレーム毎の再描画
  const radius = 300;
  let degree = 0;
  const tick = () => {
    // 球を回転させる
    degree += 5;

    // 角度をラジアンに変換します
    const rad = (degree * Math.PI) / 180;

    // X座標 = 半径 x Cosθ
    sphere.position.x = radius * Math.cos(rad);

    // Y座標 = 半径 x Sinθ
    sphere.position.y = radius * Math.sin(rad);

    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  };
  tick();

  window.addEventListener('resize', onResize);
};

const initPoints = () => {
  /** 主要都市一覧 **/
  const cities = [];

  /** 主要都市緯度経度一覧 **/
  const cityPoints = [
    [35, 139],
    [51.2838, 0],
    [39, -116],
    [34, 118],
    [-33, 151],
    [-23, -46],
    [1, 103],
    [90, 0],
    [-90, 0],
  ];

  // シーン
  const scene = new THREE.Scene();

  // カメラ
  const camera = new THREE.PerspectiveCamera(45, 1, 1, 2000);
  camera.position.set(-250, 0, -250);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // レンダラー
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.domElement.setAttribute('id', 'app2');
  document.body.appendChild(renderer.domElement);

  // カメラコントローラー
  const controller = new TrackballControls(camera, renderer.domElement);
  controller.noPan = true;
  controller.minDistance = 200;
  controller.maxDistance = 1000;

  // 地球
  const earthTexture = new THREE.TextureLoader().load(groundTexture);
  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(100, 50, 50),
    new THREE.MeshBasicMaterial({ map: earthTexture })
  );
  scene.add(earth);

  // リスト分のポイントをプロット
  cityPoints.forEach(([lat, lng], i) => {
    const color = match({ index: i, lat })
      .with({ index: 0 }, () => 0xff0000)
      .with({ lat: 90 }, () => 0x0000ff)
      .otherwise(() => 0x00ff00);
    const point = createPoint(color, lat, lng);

    cities.push(point);
    scene.add(point);
  });

  // リサイズイベント
  const onResize = (e?: Event) => {
    // サイズを取得
    const width = window.innerWidth;
    const height = window.innerHeight;

    // レンダラーのサイズを調整する
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // カメラのアスペクト比を正す
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  onResize();

  // フレーム毎の再描画
  const tick = () => {
    // カメラコントローラーの更新
    controller.update();

    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  };
  tick();

  window.addEventListener('resize', onResize);
};

const initHookup = () => {
  /** 主要都市緯度経度一覧 **/
  const cityPoints = [
    [51.2838, 0],
    [39, -116],
    [34, 118],
    [-33, 151],
    [-23, -46],
    [1, 103],
    [90, 0],
    [-90, 0],
  ];

  // シーン
  const scene = new THREE.Scene();

  // カメラ
  const camera = new THREE.PerspectiveCamera(45, 1, 1, 2000);
  camera.position.set(-250, 0, -250);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // レンダラー
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.domElement.setAttribute('id', 'app3');
  document.body.appendChild(renderer.domElement);

  // カメラコントローラー
  const controller = new TrackballControls(camera, renderer.domElement);
  controller.noPan = true;
  controller.minDistance = 200;
  controller.maxDistance = 1000;

  // 地球
  const earthTexture = new THREE.TextureLoader().load(groundTexture);
  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(100, 50, 50),
    new THREE.MeshBasicMaterial({ map: earthTexture })
  );
  scene.add(earth);

  // 日本
  const japan = createPoint(0xff0000, 35, 139);
  scene.add(japan);

  // リスト分のポイントをプロット
  cityPoints.forEach(([lat, lng], i) => {
    const color = match(lat)
      .with(90, () => 0x0000ff)
      .otherwise(() => 0x00ff00);

    const sphere = createPoint(color, lat, lng);
    scene.add(sphere);

    const line = createLine(japan.position, sphere.position);
    scene.add(line);
  });

  // リサイズイベント
  const onResize = (e?: Event) => {
    // サイズを取得
    const width = window.innerWidth;
    const height = window.innerHeight;

    // レンダラーのサイズを調整する
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // カメラのアスペクト比を正す
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  onResize();

  // フレーム毎の再描画
  const tick = () => {
    // カメラコントローラーの更新
    controller.update();

    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  };
  tick();

  window.addEventListener('resize', onResize);
};

const initTrigonometric = () => {
  const container = document.createElement('div');
  document.body.appendChild(container);

  // シーン
  const scene = new THREE.Scene();

  // カメラ
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    2000
  );
  camera.position.set(-250, 0, -250);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // レンダラー
  const renderer = new THREE.WebGLRenderer({
    antialias: window.devicePixelRatio === 1,
  });
  renderer.setClearColor(0x000000, 1);
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  // カメラコントローラー
  const controller = new TrackballControls(camera, renderer.domElement);
  controller.noPan = true;
  controller.minDistance = 200;
  controller.maxDistance = 10000;
  controller.dynamicDampingFactor = 0.05;

  // 環境光
  const ambientLight = new THREE.AmbientLight(0x111111);
  scene.add(ambientLight);

  // スポットライト
  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-10000, 0, 0);
  spotLight.castShadow = true;
  scene.add(spotLight);

  // 地球
  const earth = new Earth();
  scene.add(earth);

  // 背景
  const geometry = new THREE.SphereGeometry(1000, 60, 40);
  geometry.scale(-1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(starTexture),
  });
  const background = new THREE.Mesh(geometry, material);
  scene.add(background);

  // 日本
  const japan = new CityPoint(0xffff00, [35.658651, 139.742689]);
  // 日本を更新
  applyGpsPosition(japan, japan.getCoords());
  scene.add(japan);

  // 主要都市をプロットして線を引く
  /** 主要都市一覧 **/
  const cities = [];
  const cityLines: CityLine[] = [];

  /** 主要都市緯度経度一覧 **/
  const cityPoints: [number, number][] = [
    [51.2838, 0], // イギリス
    [39, -116], // 北京
    [34, 118], // ロサンゼルス
    [-33, 151], // シドニー
    [-23, -46], // サンパウロ
    [1, 103], // シンガポール
    [90, 0], // 北極
    [-90, 0], // 南極
  ];

  cityPoints.forEach((p) => {
    // 都市
    const city = new CityPoint(0xff00ff, p);

    cities.push(city);
    scene.add(city);

    applyGpsPosition(city, city.getCoords());

    // 線を引く
    const line = new CityLine(japan, city);
    line.update();

    cityLines.push(line);
    scene.add(line);
  });

  // 赤道上衛星
  const satellite = new CityPoint(0xff0000, [0, 0]);
  scene.add(satellite);

  /**
   * リサイズ処理
   */
  const onResize = () => {
    const { innerWidth, innerHeight, devicePixelRatio } = window;

    // レンダラーのサイズを調整する
    renderer.setPixelRatio(devicePixelRatio);
    renderer.setSize(innerWidth, innerHeight);

    // カメラのアスペクト比を正す
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
  };
  onResize();

  /**
   * フレーム毎にさせる処理
   */
  let d = 1;
  const tick = () => {
    // 地球を更新
    earth.update();

    // 線を描く
    if (d <= 100) {
      d += 0.5;
    } else {
      d = 1;
    }
    cityLines.forEach((group) => {
      group.getLine().geometry.setDrawRange(0, d);
    });

    // 人工衛星の位置を移動
    satellite.setLng(Date.now() / 100);
    applyGpsPosition(satellite, satellite.getCoords());

    // カメラコントローラーの更新
    controller.update();

    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  };
  tick();

  window.addEventListener('resize', onResize);
};

window.addEventListener('DOMContentLoaded', initCoordinates);
window.addEventListener('DOMContentLoaded', initPoints);
window.addEventListener('DOMContentLoaded', initHookup);
window.addEventListener('DOMContentLoaded', initTrigonometric);
