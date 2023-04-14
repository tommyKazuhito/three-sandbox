import gsap from 'gsap';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { useUi } from './compositions/use-ui';

const init2d = () => {
  const app = document.getElementById('app1')!;

  // フーリエ変換を行う分割数。2の乗数でなくてはならない
  const fftSize = 512;

  // HTML要素
  const containerElm = app.querySelector('.container') as HTMLElement;
  const btnPlay = app.querySelector('.btn-play') as HTMLButtonElement;
  const btnStop = app.querySelector('.btn-stop') as HTMLButtonElement;

  let nodeAnalyzer: AnalyserNode | null = null;

  const analyzeSound = (audioElement: HTMLAudioElement) => {
    const ctx = new AudioContext();

    // アナライザーを生成
    const na = ctx.createAnalyser();

    // フーリエ変換を行う分割数。2の乗数でなくてはならない
    na.fftSize = fftSize;
    // 0～1の範囲でデータの動きの速さ 0だともっとも速く、1に近づくほど遅くなる
    na.smoothingTimeConstant = 0.85;
    // オーディオの出力先を設定
    na.connect(ctx.destination);

    // audio 要素と紐付ける
    const nodeSource = ctx.createMediaElementSource(audioElement);
    nodeSource.connect(na);

    return na;
  };

  const { audioElm } = useUi(
    app.querySelector('audio')!,
    btnPlay,
    btnStop,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    initSound
  );

  function initSound() {
    nodeAnalyzer = analyzeSound(audioElm);
  }

  // 2Dの初期化
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const resize = () => {
    canvas.width = (containerElm.clientWidth - 32) * window.devicePixelRatio;
    canvas.height = (containerElm.clientHeight - 32) * window.devicePixelRatio;
    gsap.set(canvas, {
      width: containerElm.clientWidth - 32,
      height: containerElm.clientHeight - 32,
    });
  };

  // 描画処理
  let count = 0;
  const draw = () => {
    if (!nodeAnalyzer || !ctx) {
      return;
    }

    // 波形データを格納する配列の生成
    const freqByteData = new Uint8Array(fftSize / 2);
    // それぞれの周波数の振幅を取得
    nodeAnalyzer.getByteFrequencyData(freqByteData);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 折れ線グラフの描画
    freqByteData.forEach((freqSum, i) => {
      const x = (i / (fftSize / 2)) * canvas.width;
      const y = canvas.height - (freqSum / 256) * canvas.height;
      const hue = (count + i) % 360;

      ctx.beginPath();
      ctx.strokeStyle = `hsla(${hue}, 40%, 75%)`;
      ctx.lineWidth = 2;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        const prevX = ((i - 1) / (fftSize / 2)) * canvas.width;
        const prevY =
          canvas.height - (freqByteData[i - 1] / 256) * canvas.height;
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
      }

      ctx.stroke();
    });

    count++;
  };

  const tick = () => {
    requestAnimationFrame(tick);
    draw();
  };

  resize();
  tick();

  window.addEventListener('resize', resize);
};

const init3d = () => {
  const app = document.getElementById('app2')!;

  // フーリエ変換を行う分割数。2の乗数でなくてはならない
  const fftSize = 256;
  const gridSize = 6000;

  // HTML要素
  const containerElm = app.querySelector('.container') as HTMLElement;
  const btnPlay = app.querySelector('.btn-play') as HTMLButtonElement;
  const btnStop = app.querySelector('.btn-stop') as HTMLButtonElement;
  const canvas = document.createElement('canvas');

  /** 3Dの初期化 */
  // 3D空間の作成
  const scene = new THREE.Scene();

  // カメラの作成
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    200000
  );
  camera.position.set(3000, 10000, 10000);

  // カメラコントローラーを作成
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(-1000, 1500, 0);

  // 滑らかにカメラコントローラーを制御する
  controls.enableDamping = true;
  controls.dampingFactor = 0.02;
  // マウスホイールでのズームの範囲を指定
  controls.minDistance = 3000;
  controls.maxDistance = 20000;
  // パンできる範囲を指定
  controls.minPolarAngle = Math.PI / 4;
  controls.maxPolarAngle = Math.PI / 2.5;
  controls.autoRotate = true;

  // レンダラーの作成
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: window.devicePixelRatio === 1,
  });
  renderer.setClearColor(0x000000);
  renderer.setPixelRatio(devicePixelRatio);

  const gridColor = new THREE.Color(0x112233);

  // 地面
  {
    const grid = new THREE.GridHelper(gridSize, 40, gridColor, gridColor);
    scene.add(grid);
  }
  // 壁1
  {
    const grid = new THREE.GridHelper(gridSize, 40, gridColor, gridColor);
    grid.position.z = (gridSize * -1) / 2;
    grid.position.y = gridSize / 2;
    grid.rotation.x = Math.PI / 2;
    scene.add(grid);
  }
  // 壁2
  {
    const grid = new THREE.GridHelper(gridSize, 40, gridColor, gridColor);
    grid.position.x = gridSize / 2;
    grid.position.y = gridSize / 2;
    grid.rotation.z = Math.PI / 2;
    scene.add(grid);
  }
  // 立方体
  const mesh = new THREE.InstancedMesh(
    new THREE.BoxGeometry(8, gridSize, 8),
    new THREE.MeshBasicMaterial({
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
    (fftSize / 2) ** 2
  );
  scene.add(mesh);

  // BOXの配置
  const max = fftSize / 2;
  const createMatrix4 = (i: number, j: number, value: number) => {
    const matrix = new THREE.Matrix4();

    const interval = (gridSize / fftSize) * 2;
    const center = (interval * fftSize) / 4;

    matrix.setPosition(interval * j - center, 0, interval * i - center);
    matrix.multiply(
      new THREE.Matrix4().makeScale(1, Math.max(value, 0.002), 1)
    );
    matrix.multiply(
      new THREE.Matrix4().makeTranslation(1, Math.max(0, gridSize / 2), 1)
    );

    return matrix;
  };

  for (let i = 0; i < max; i++) {
    for (let j = 0; j < max; j++) {
      // カラーコード生成
      const hue = (j / max) * 0.5 + 0.5;
      const saturation = 0.2 + Math.random() * 0.5;
      const lightness = i === max - 1 ? 1 : (0.1 * i) / max;

      const color = new THREE.Color();
      color.setHSL(hue, saturation, lightness);

      const matrix = createMatrix4(i, j, 0);

      const id = i * max + j;
      mesh.setMatrixAt(id, matrix);
      mesh.setColorAt(id, color);
      mesh.instanceColor!.needsUpdate = true;
    }
  }

  /** 音の解析 */
  let nodeAnalyzer: AnalyserNode | null = null;
  const freqByteDataArray: Uint8Array[] = [];

  const analyzeSound = (audioElement: HTMLAudioElement) => {
    const ctx = new AudioContext();

    // アナライザーを生成
    const na = ctx.createAnalyser();

    // フーリエ変換を行う分割数。2の乗数でなくてはならない
    na.fftSize = fftSize;
    // 0～1の範囲でデータの動きの速さ 0だともっとも速く、1に近づくほど遅くなる
    na.smoothingTimeConstant = 0.85;
    // オーディオの出力先を設定
    na.connect(ctx.destination);

    // audio 要素と紐付ける
    const nodeSource = ctx.createMediaElementSource(audioElement);
    nodeSource.connect(na);

    return na;
  };

  const { audioElm } = useUi(
    app.querySelector('audio')!,
    btnPlay,
    btnStop,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    initSound
  );

  // 音データの初期化
  for (let i = 0; i < max; i++) {
    const array = new Uint8Array(max);

    for (let j = 0; j < max; j++) {
      array[j] = 0;
    }

    freqByteDataArray.push(array);
  }

  // サウンドの再生
  function initSound() {
    nodeAnalyzer = analyzeSound(audioElm);
  }

  /** 描画処理 */
  const draw = () => {
    if (nodeAnalyzer === null) {
      return;
    }

    // 波形データを格納する配列の生成
    const freqByteData = new Uint8Array(max);
    // それぞれの周波数の振幅を取得
    nodeAnalyzer.getByteFrequencyData(freqByteData);
    freqByteDataArray.push(freqByteData);
    // 古いデータを一つ削除
    if (freqByteDataArray.length > max) {
      freqByteDataArray.shift();
    }

    // Boxの描画の更新
    for (let i = 0; i < freqByteDataArray.length; i++) {
      for (let j = 0; j < freqByteDataArray[i].length; j++) {
        // 値は256段階で取得できるので正規化して 0.0 〜 1.0 の値にする
        const freqSum = freqByteDataArray[i][j] / 256;

        // Y軸のスケールを変更
        const id = i * max + j;
        const matrix = createMatrix4(i, j, freqSum);

        mesh.setMatrixAt(id, matrix);
        mesh.instanceMatrix.needsUpdate = true;
      }
    }
  };

  const tick = () => {
    requestAnimationFrame(tick);
    draw();

    controls.update();
    renderer.render(scene, camera);
  };

  /**  画面のリサイズ処理 */
  const resize = () => {
    camera.aspect = containerElm.clientWidth / containerElm.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(containerElm.clientWidth, containerElm.clientHeight);
  };

  containerElm.appendChild(canvas);

  resize();
  tick();

  window.addEventListener('resize', resize);
};

window.addEventListener('DOMContentLoaded', init2d);
window.addEventListener('DOMContentLoaded', init3d);
