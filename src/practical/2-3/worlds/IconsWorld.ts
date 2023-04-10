import gsap, { Cubic, Quart } from 'gsap';
import MotionPathPlugin from 'gsap/dist/MotionPathPlugin';
import * as THREE from 'three';

import { createCanvas } from '../creators/create-canvas';
import { cloud } from '../creators/particle';
import { FONT_ICON } from '../helpers/font';
import IconsView from '../views/IconsView';

gsap.registerPlugin(MotionPathPlugin);

export default class IconsWorld extends IconsView {
  private static readonly WORLD_LIST = ['WebGl', 'HTML5', 'THREE'];

  constructor(wrapperId: string) {
    super(wrapperId);

    this.setup();
    this.startRendering();
  }

  protected onTick() {
    super.onTick();

    this.camera.lookAt(IconsWorld.HELPER_ZERO);

    // 背景をカメラの反対側に配置
    const vec = this.camera.position.clone();
    vec.negate();
    vec.normalize();
    vec.multiplyScalar(25000);
    this.bg.position.copy(vec);
    this.bg.lookAt(this.camera.position);
  }

  private setup() {
    const size = 256;

    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', `${size * this.matrixLength}px`);
    canvas.setAttribute('height', `${size * this.matrixLength}px`);

    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('');
    }

    const len = this.matrixLength * this.matrixLength;
    for (let i = 0; i < len; i++) {
      const char = String.fromCharCode(61730 + i);

      const x = size * (i % this.matrixLength) + size / 2;
      const y = size * Math.floor(i / this.matrixLength) + size / 2;

      context.fillStyle = 'white';
      context.font = `200px ${FONT_ICON}`;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(char, x, y);
    }

    const texture = new THREE.CanvasTexture(canvas);

    this.createParticle(texture);

    const clouds = cloud();
    this.scene.add(clouds);

    this.createLogo();
  }

  private createLogo() {
    const self = this;

    const canvas = createCanvas(
      IconsWorld.WORLD_LIST[self.worldIndex],
      42,
      IconsWorld.CANVAS_W,
      IconsWorld.CANVAS_H
    );

    self.worldIndex++;
    if (self.worldIndex >= IconsWorld.WORLD_LIST.length) {
      self.worldIndex = 0;
    }

    const timeline = gsap.timeline({
      onComplete() {
        const tl = gsap.timeline();
        tl.call(() => {
          self.createLogo();
        });
      },
    });
    self.createLetter(canvas, timeline);

    /** 3種類のカメラモーションのいずれかを適用 */
    if (Math.random() < 0.3) {
      console.log('Camera Angle A');
      timeline
        .set(
          this.camera.position,
          {
            x: 200,
            y: -200,
            z: 1000,
          },
          0
        )
        .to(
          this.camera.position,
          {
            duration: 14.0,
            x: 0,
            y: 0,
            z: 5000,
            ease: Quart.easeInOut,
          },
          0
        )
        .set(this.camera, { fov: 90 }, 0)
        .to(
          this.camera,
          {
            duration: 14.0,
            fov: 45,
            ease: Quart.easeInOut,
          },
          0
        );
    } else if (Math.random() < 0.7) {
      console.log('Camera Angle B');
      timeline.set(this.camera.position, { x: 100, y: +1000, z: 1000 }, 0).to(
        this.camera.position,
        {
          duration: 14.0,
          x: 0,
          y: 0,
          z: 5000,
          ease: Quart.easeInOut,
        },
        0
      );
    } else {
      console.log('Camera Angle C');
      timeline.set(this.camera.position, { x: -3000, y: +3000, z: 0 }, 0).to(
        this.camera.position,
        {
          duration: 14.0,
          x: 0,
          y: 0,
          z: 5000,
          ease: Quart.easeInOut,
        },
        0
      );
    }

    /** 3種類のタイムリマップのいずれかを適用 */
    if (Math.random() < 0.3) {
      console.log('Time Remap A');
      timeline.timeScale(3.0);

      timeline.call(
        () => {
          gsap.to(timeline, {
            duration: 1.0,
            timeScale: 0.05,
            ease: Cubic.easeInOut,
          });
          gsap.to(timeline, {
            duration: 0.5,
            timeScale: 3.0,
            delay: 3.5,
            ease: Cubic.easeInOut,
          });
          gsap.to(timeline, {
            duration: 0.5,
            timeScale: 0.05,
            delay: 4.0,
            ease: Cubic.easeInOut,
          });
          gsap.to(timeline, {
            duration: 2.0,
            timeScale: 5.0,
            delay: 9.0,
            ease: Cubic.easeInOut,
          });
        },
        [],
        3.5
      );
    } else if (Math.random() < 0.7) {
      console.log('Time Remap B');
      timeline.timeScale(6.0);

      gsap.to(timeline, {
        duration: 4.0,
        timeScale: 0.005,
        ease: Cubic.easeOut,
      });
      gsap.to(timeline, {
        duration: 4.0,
        timeScale: 2.0,
        delay: 5.0,
        ease: Cubic.easeIn,
      });
    } else {
      console.log('Time Remap C');
      timeline.timeScale(1.0);
    }

    // 背景の色変更
    (this.bg.material as THREE.MeshLambertMaterial).color.setHSL(
      this.hue,
      1.0,
      0.5
    );

    // 色相を移動
    this.hue += 0.2;
    if (this.hue >= 1.0) {
      this.hue = 0;
    }
  }
}
