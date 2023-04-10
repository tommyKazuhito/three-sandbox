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
  const boxes: HTMLElement[] = [...Array(fftSize / 2)].map(() => {
    const div = document.createElement('div');
    div.classList.add('box');

    containerElm.appendChild(div);
    return div;
  });

  // 描画処理
  let count = 0;
  const draw = () => {
    if (!nodeAnalyzer) {
      return;
    }

    // 波形データを格納する配列の生成
    const freqByteData = new Uint8Array(fftSize / 2);
    // それぞれの周波数の振幅を取得
    nodeAnalyzer.getByteFrequencyData(freqByteData);

    // 高さ・色の更新
    boxes.forEach((box, i) => {
      const freqSum = freqByteData[i];

      // 値は256段階で取得できるので正規化して 0.0 〜 1.0 の値にする
      const scale = freqSum / 256;

      // Y軸のスケールと色相を変更
      gsap.set(box, {
        scaleY: scale,
        backgroundColor: `hsla(${(count % 360) + i}, 40%, 75%)`,
      });
    });

    count++;
  };

  const tick = () => {
    requestAnimationFrame(tick);
    draw();
  };

  tick();
};

const init3d = () => {};

window.addEventListener('DOMContentLoaded', init2d);
window.addEventListener('DOMContentLoaded', init3d);
