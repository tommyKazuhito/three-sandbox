import * as THREE from 'three';

import tileTexture from './img/tile.png';
import Camera from './objects/Camera';
import SavePoint from './objects/SavePoint';

const init = () => {
  const wrapper = document.getElementById('app')!;
  wrapper.style.backgroundColor = `#000`;

  let lastTime = Date.now();

  // シーン
  const scene = new THREE.Scene();

  // カメラ
  const camera = new Camera();

  // レンダラー
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  // 点光源
  const light = new THREE.PointLight(0x555555, 1.6, 50);
  light.position.set(0.577, 0.577, 0.577);
  light.castShadow = true;
  scene.add(light);
  scene.add(new THREE.PointLightHelper(light));

  const resize = () => {
    const { innerWidth, innerHeight } = window;

    renderer.domElement.setAttribute('width', innerWidth.toString());
    renderer.domElement.setAttribute('height', innerHeight.toString());
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(innerWidth, innerHeight);

    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
  };

  // 地面
  {
    const texture = new THREE.TextureLoader().load(tileTexture);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(128, 128);

    // アンチエリアスを無効にする
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.generateMipmaps = false;

    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100, 1, 1),
      new THREE.MeshPhongMaterial({
        map: texture,
        bumpMap: texture,
        bumpScale: 1.0,
        specularMap: texture,
        shininess: 3.0,
        side: THREE.BackSide,
      })
    );
    mesh.rotation.x = (90 * Math.PI) / 180;
    scene.add(mesh);
  }

  // セーブポイント
  const savePoint = new SavePoint();
  scene.add(savePoint);

  /**
   * フレーム毎のアニメーションの更新をかけます。
   */
  const tick = () => {
    requestAnimationFrame(tick);

    const time = Date.now();
    const diffTime = time - lastTime;
    const speedRate = Math.round(diffTime / 16.667); // 60fps = 16.67ms を意図した時間の比率

    camera.update(speedRate);
    savePoint.update(speedRate);

    renderer.render(scene, camera);

    lastTime = time;
  };

  const onResize = (e: Event) => {
    resize();
  };

  resize();
  wrapper.appendChild(renderer.domElement);

  tick();

  window.addEventListener('resize', onResize);
};

window.addEventListener('DOMContentLoaded', init);
