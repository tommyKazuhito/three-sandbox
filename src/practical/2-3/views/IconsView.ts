import { Cubic, Expo, Quart } from 'gsap';
import * as THREE from 'three';

import { changeUvs } from '../helpers/change-uvs';
import bgTexture from '../img/bg.jpg';

import BasicView from './BasicView';

export default class IconsView extends BasicView {
  protected static readonly HELPER_ZERO = new THREE.Vector3(0, 0, 0);

  protected static readonly CANVAS_W = 250;

  protected static readonly CANVAS_H = 40;

  protected matrixLength = 8;

  protected particleList: THREE.Mesh[] = [];

  protected wrap: THREE.Object3D;

  protected worldIndex = 0;

  protected bg: THREE.Mesh;

  protected hue = 0.6;

  constructor(wrapperId: string) {
    super(wrapperId);

    /** カメラの配置 */
    this.camera.far = 100000;
    this.camera.near = 1;
    this.camera.position.z = 5000;
    this.camera.lookAt(IconsView.HELPER_ZERO);

    /** 背景の作成 */
    const plane = new THREE.PlaneGeometry(50000, 50000, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(bgTexture),
    });
    this.bg = new THREE.Mesh(plane, material);
    this.scene.add(this.bg);

    /** 3D空間のパーツを配置 */
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 1, +1).normalize();
    this.scene.add(light);

    /** particle motion */
    this.wrap = new THREE.Object3D();
    this.scene.add(this.wrap);
  }

  protected createParticle(sharedTexture: THREE.Texture) {
    /** パーティクルの作成 */
    const ux = 1 / this.matrixLength;
    const uy = 1 / this.matrixLength;

    this.particleList = [];
    for (let i = 0; i < IconsView.CANVAS_W; i++) {
      for (let j = 0; j < IconsView.CANVAS_H; j++) {
        const ox = Math.floor(this.matrixLength * Math.random());
        const oy = Math.floor(this.matrixLength * Math.random());

        const geometry = new THREE.PlaneGeometry(40, 40, 1, 1);
        changeUvs(geometry, ux, uy, ox, oy);

        const material = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          map: sharedTexture,
          transparent: true,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
        });

        const word = new THREE.Mesh(geometry, material);

        this.wrap.add(word);
        this.particleList.push(word);
      }
    }
  }

  protected createLetter(
    canvas: HTMLCanvasElement,
    timeline: gsap.core.Timeline
  ) {
    const { CANVAS_W, CANVAS_H } = IconsView;

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('');
    }

    this.particleList.forEach((particle) => {
      particle.visible = false;
    });

    // 透過領域を判定する
    const pixelColors = ctx.getImageData(0, 0, CANVAS_W, CANVAS_H).data;

    const existDotList: boolean[][] = [];
    for (let i = 0; i < CANVAS_W; i++) {
      existDotList[i] = [];

      for (let j = 0; j < CANVAS_H; j++) {
        // 透過しているか判定
        const isTransparent = pixelColors[(i + j * CANVAS_W) * 4 + 3] === 0;
        existDotList[i][j] = isTransparent;
      }
    }

    // レターのモーションを作成する
    let count = 0;
    const max = CANVAS_W * CANVAS_H;
    for (let i = 0; i < CANVAS_W; i++) {
      for (let j = 0; j < CANVAS_H; j++) {
        // 透過していたらパスする
        if (!existDotList[i][j]) {
          const word = this.particleList[count];
          (word.material as THREE.MeshLambertMaterial).color.setHSL(
            this.hue + ((i * canvas.height) / max - 0.5) * 0.2,
            0.5,
            0.6 + 0.4 * Math.random()
          );
          (word.material as THREE.MeshLambertMaterial).blending =
            THREE.AdditiveBlending;
          this.wrap.add(word);

          const fromConfig = {
            x: 2000 * (Math.random() - 0.5) - 500,
            y: 1000 * (Math.random() - 0.5),
            z: +10000,
          };

          const toConfig = {
            x: (i - canvas.width / 2) * 30,
            y: (canvas.height / 2 - j) * 30,
            z: 0,
          };

          const fromRotationConfig = {
            z: 0,
          };

          const toRotationConfig = {
            z: 10 * Math.PI * (Math.random() - 0.5),
          };

          const delay =
            Cubic.easeInOut(count / 1600) * 3.0 + 1.5 * Math.random();

          word.position.x = fromConfig.x;
          word.position.y = fromConfig.y;
          word.position.z = fromConfig.z;

          word.rotation.z = fromRotationConfig.z;

          timeline.to(
            word.rotation,
            {
              duration: 6.0,
              z: toRotationConfig.z,
              ease: Cubic.easeInOut,
            },
            delay
          );

          word.visible = false;
          timeline.set(word, { visible: false });

          timeline.set(word, { visible: true }, delay).to(
            word.position,
            {
              duration: 7.0,
              motionPath: [
                fromConfig,
                {
                  x: (0 + toConfig.x) / 2 + 300,
                  y: (fromConfig.y + toConfig.y) / 2 + 500 * Math.random(),
                  z: (fromConfig.z + toConfig.z) / 2,
                },
                toConfig,
              ],
              delay,
              ease: Expo.easeInOut,
            },
            0
          );

          count++;
        }
      }

      this.wrap.position.z = -5000;
      timeline.to(
        this.wrap.position,
        { duration: 12.0, z: 6000, ease: Quart.easeIn },
        0
      );
    }
  }
}
