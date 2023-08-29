import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { createApp } from 'vue';

import type { Shader, Target } from './controller/CanvasNav';

import { useNormalRenderMode } from './composition/use-normal-render-mode';
import { usePicked } from './composition/use-picked';
import CanvasNav from './controller/CanvasNav';
import { addEffect } from './helper/add-effect';
import { useMousePos } from './helper/use-mouse-pos';
import Planes from './module/Planes';
import BayerDitherShader from './shader/BayerDitherShader';
import DiffusionShader from './shader/DiffusionShader';
import MonochromeShader from './shader/MonochromeShader';
import MosaicShader from './shader/MosaicShader';
import NegativePositiveShader from './shader/NegativePositiveShader';
import RandomDitherShader from './shader/RandomDitherShader';
import SepiaToneShader from './shader/SepiaToneShader';
import ThresholdShader from './shader/ThresholdShader';
import UzumakiShader from './shader/UzumakiShader';

const init = () => {
  const app = document.getElementById('app');

  const [normalRenderMode, setNormalRenderMode] = useNormalRenderMode();
  const [picked, setPicked] = usePicked('image');
  const mousePos = useMousePos();

  const containerElm = app?.querySelector<HTMLElement>('.container');
  const navElm = app?.querySelector<HTMLElement>('.nav');

  const effectList: ReturnType<typeof addEffect>[] = [];

  //  Three.jsの初期化処理
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 3000);
  camera.position.z = 3;

  const renderer = new THREE.WebGLRenderer({ antialias: devicePixelRatio < 2 });
  renderer.setPixelRatio(devicePixelRatio);

  const planes = new Planes(
    renderer,
    'resources/texture/video.mp4',
    'resources/texture/image.jpg'
  );
  scene.add(planes.meshImage);
  scene.add(planes.meshVideo);

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const mosaicShader = new MosaicShader(1, 1);
  const diffusionShader = new DiffusionShader(1, 1);
  const uzumakiShader = new UzumakiShader(1, 1);
  const bayerDitherShader = new BayerDitherShader(1, 1);

  const onResize = () => {
    const appW = containerElm?.clientWidth ?? window.innerWidth;
    const appH = containerElm?.clientHeight ?? window.innerHeight;

    const mosaicScale = Math.min(10.0, Math.max(appW, appH) / 50);
    mosaicShader.setMosaicScale(mosaicScale);
    mosaicShader.setScreenSize(appW, appH);

    diffusionShader.setScreenSize(appW, appH);

    const uzumakiScale = Math.min(150.0, Math.max(appW, appH) / 7.5);
    uzumakiShader.setScreenSize(appW, appH);
    uzumakiShader.setUzumakiScale(uzumakiScale);

    bayerDitherShader.setScreenSize(appW, appH);

    camera.aspect = appW / appH;
    camera.updateProjectionMatrix();

    renderer.setSize(appW, appH);
    composer.render();
  };

  const tick = () => {
    requestAnimationFrame(tick);

    if (normalRenderMode.value) {
      // 通常モードの場合
      renderer.render(scene, camera);
    } else {
      // エフェクトの適用が必要な場合
      composer.render();
    }

    uzumakiShader.setMousePos(mousePos.x, mousePos.y);

    planes.update();
  };

  const changeShader = (id: string, enabled: boolean) => {
    setNormalRenderMode(false);

    // 該当する項目を変更
    const effect = effectList.find((item) => item.id === id);
    if (effect) {
      effect.pass.enabled = enabled;
    }

    // エフェクトリスの状態にあわせて更新
    let renderToScreen = false;
    effectList.forEach((e) => {
      if (e.pass.enabled && !renderToScreen) {
        e.pass.renderToScreen = true;
        renderToScreen = true;
      } else {
        e.pass.renderToScreen = false;
      }
    });

    if (!renderToScreen) {
      setNormalRenderMode(true);
    }
  };

  effectList.push(
    addEffect(composer, new MonochromeShader(), 'monochrome'),
    addEffect(composer, new NegativePositiveShader(), 'nega'),
    addEffect(composer, new SepiaToneShader(), 'sepiaTone'),
    addEffect(composer, mosaicShader, 'mosaic'),
    addEffect(composer, diffusionShader, 'diffusion'),
    addEffect(composer, uzumakiShader, 'uzumaki'),
    addEffect(composer, new ThresholdShader(), 'threshold'),
    addEffect(composer, new RandomDitherShader(), 'randomDither'),
    addEffect(composer, bayerDitherShader, 'bayerDither')
  );

  const nav = createApp(CanvasNav, {
    picked: picked.value,
    shaderTypes: [
      { name: 'モノクロ', id: 'monochrome', selected: false },
      { name: 'ネガポジ反転', id: 'nega', selected: false },
      { name: 'セピア調', id: 'sepiaTone', selected: false },
      { name: 'モザイク', id: 'mosaic', selected: false },
      { name: 'すりガラス', id: 'diffusion', selected: false },
      { name: 'うずまき', id: 'uzumaki', selected: false },
      { name: '2値化(threshold)', id: 'threshold', selected: false },
      {
        name: '2値化(ランダムディザ)',
        id: 'randomDither',
        selected: false,
      },
      { name: '2値化(ベイヤーディザ)', id: 'bayerDither', selected: false },
    ],
    targetTypes: [
      { name: '画像', value: 'image' },
      { name: 'ビデオ', value: 'video' },
    ],
    onChangeShaderCheckbox: (item: Shader) => {
      item.selected = !item.selected;
      changeShader(item.id, item.selected);
    },
    onChangeDisplayedTarget: (item: Target) => {
      setPicked(item.value);
      planes.changeType(item.value);
    },
  });
  if (navElm) nav.mount(navElm);

  containerElm?.appendChild(renderer.domElement);

  onResize();
  tick();

  window.addEventListener('resize', onResize);
};

window.addEventListener('DOMContentLoaded', init);
