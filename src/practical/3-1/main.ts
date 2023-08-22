const init = async () => {
  // const canvas = document.getElementById('app') as HTMLCanvasElement;
  const imgCount = 45;

  const imgList: HTMLImageElement[] = [];

  const loadImages = () =>
    new Promise<boolean>((resolve) => {
      let loadedCount = 0;

      for (let i = 0; i < imgCount; i++) {
        const img = new Image();
        imgList.push(img);
        img.src = `img/${i}.jpg`;

        img.onload = () => {
          loadedCount++;
          if (loadedCount === imgCount) {
            resolve(true);
          }
        };
      }
    });

  await loadImages();
};

window.addEventListener('DOMContentLoaded', init);
