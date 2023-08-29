import * as THREE from 'three';

import Cherries from './objects/Cherries';
import Dish from './objects/Dish';
import Pudding from './objects/Pudding';
import SkyBox from './objects/SkyBox';
import { useDropAnimation } from './util/use-drop-animatin';

const animationObj = {
  positionY: 0,
  swingX: 0,
  swingY: 0,
  swingZ: 0,
  swingStrength: 0,
  frame: 0,
};

const init = () => {
  const app = document.getElementById('app');

  const containerElm = app?.querySelector<HTMLElement>('.container');
  const btnElm = app?.querySelector<HTMLElement>('.btn');

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 3000);
  camera.position.set(0, 50, 50);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  const renderer = new THREE.WebGLRenderer({ antialias: devicePixelRatio < 2 });
  renderer.setPixelRatio(devicePixelRatio);

  const [, animationPlay] = useDropAnimation(animationObj);

  const skyBox = new SkyBox();
  const cherries = new Cherries();
  const dish = new Dish();
  const pudding = new Pudding();
  scene.add(skyBox);
  scene.add(cherries);
  scene.add(dish);
  scene.add(pudding);

  // 光源
  const ambientLight = new THREE.AmbientLight(0x444444);
  const spotLight = new THREE.PointLight(0xffffff, 1, 1000);
  scene.add(ambientLight);
  scene.add(spotLight);

  const onResize = () => {
    const appW = containerElm?.clientWidth ?? window.innerWidth;
    const appH = containerElm?.clientHeight ?? window.innerHeight;

    camera.aspect = appW / appH;
    camera.updateProjectionMatrix();

    renderer.setSize(appW, appH);
  };

  const tick = () => {
    requestAnimationFrame(tick);

    const { uniforms } = pudding.material;

    // 光源位置の移動 (三角関数を使って円周上を移動)
    const lightRotate = Date.now() * 0.0005;
    const lightPos = new THREE.Vector3();
    const rad = 20;
    lightPos.x = rad * Math.cos(lightRotate);
    lightPos.y = -100;
    lightPos.z = rad * Math.sin(lightRotate);

    uniforms.lightPosition.value = lightPos;
    spotLight.position.set(lightPos.x, 10, lightPos.z);

    pudding.position.y = animationObj.positionY;
    uniforms.frame.value = animationObj.frame;
    uniforms.swingStrength.value = animationObj.swingStrength;
    uniforms.swingVec.value = new THREE.Vector3(
      animationObj.swingX,
      animationObj.swingY,
      animationObj.swingZ
    );

    renderer.render(scene, camera);
  };

  containerElm?.appendChild(renderer.domElement);

  animationPlay();

  onResize();
  tick();

  btnElm?.addEventListener('click', () => animationPlay());
  window.addEventListener('reset', onResize);
};

window.addEventListener('DOMContentLoaded', init);
