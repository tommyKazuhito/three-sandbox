// eslint-disable-next-line import/prefer-default-export
export const useUi = (
  audioElm: HTMLAudioElement,
  btnPlay: HTMLElement,
  btnStop: HTMLElement,
  onCLickFirstPlay: () => void
) => {
  /** 状態管理 */
  let isInit = false;
  let isUserPlaying = false;

  const playSound = () => {
    audioElm.play();
    btnPlay.hidden = true;
    btnStop.hidden = false;
  };

  const stopSound = () => {
    audioElm.pause();
    btnPlay.hidden = false;
    btnStop.hidden = true;
  };

  /** 画面のUI処理 */
  btnPlay.addEventListener('click', () => {
    // ユーザーの意思をもって再生したことを記録
    isUserPlaying = true;

    playSound();

    if (!isInit) {
      onCLickFirstPlay();
    }

    isInit = true;
  });

  btnStop.addEventListener('click', () => {
    // ユーザーの意思をもって停止したことを記録
    isUserPlaying = false;

    stopSound();
  });

  /** タブの切り替えでサウンドのON/OFFを切りかえる */
  document.addEventListener('visibilitychange', () => {
    // 初期化前であればなにもしない
    if (!isInit) {
      return;
    }

    if (document.visibilityState === 'visible') {
      // ユーザーの意思を確認
      if (isUserPlaying) {
        playSound();
      }
    } else {
      stopSound();
    }
  });

  return { audioElm };
};
