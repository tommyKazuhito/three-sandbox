import gsap from 'gsap';

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
  containerElm.appendChild(canvas);
  canvas.width = (containerElm.clientWidth - 32) * window.devicePixelRatio;
  canvas.height = (containerElm.clientHeight - 32) * window.devicePixelRatio;
  gsap.set(canvas, {
    width: containerElm.clientWidth - 32,
    height: containerElm.clientHeight - 32,
  });

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

const init3d = () => {};

window.addEventListener('DOMContentLoaded', init2d);
window.addEventListener('DOMContentLoaded', init3d);
