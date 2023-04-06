import gsap, { Bounce, Cubic, Expo } from 'gsap';
import * as THREE from 'three';

import BasicView from '../views/BasicView';

export default class WorldCubes extends BasicView {
  /** オブジェクトの個数 */
  static OBJECT_NUM = 3000;

  /** カメラの円運動用 */
  rotation = 0;

  /** カメラの座標管理用オブジェクト */
  cameraPosition: THREE.Vector3;

  /** カメラの視点管理用オブジェクト */
  cameraLookAt: THREE.Vector3;

  /** ボックスの境界線の更新のための配列 */
  private edgesPool: THREE.LineSegments[] = [];

  /** ボックスの一辺の長さ */
  private readonly step = 100;

  constructor(wrapperId: string) {
    super(wrapperId);

    this.scene.fog = new THREE.Fog(0x000000, 100, 12500);

    this.cameraPosition = new THREE.Vector3();
    this.cameraLookAt = new THREE.Vector3();

    const timeline = gsap.timeline();
    timeline.repeat(-1);

    // カメラの動きをTweenで作る
    timeline
      .set(this, { rotation: 135 }, 0)
      .to(this, { rotation: 0, duration: 7, ease: Cubic.easeInOut }, 0)
      .set(this.cameraPosition, { y: 0 }, 0)
      .to(
        this.cameraPosition,
        { y: 400, duration: 6, ease: Cubic.easeInOut },
        0
      )
      .set(this.cameraLookAt, { y: 500 }, 0)
      .to(this.cameraLookAt, { y: 0, duration: 6, ease: Cubic.easeInOut }, 0);

    const geometryBox = new THREE.BoxGeometry(
      this.step,
      this.step,
      this.step,
      1,
      1,
      1
    );
    const edges = new THREE.EdgesGeometry(geometryBox);
    const materialBox = new THREE.LineBasicMaterial({ color: 0xff0000 });

    [...Array(WorldCubes.OBJECT_NUM)].forEach((_, i) => {
      // 立方体を作る
      const edge = new THREE.LineSegments(edges, materialBox);

      // ランダムに立方体を配置
      edge.position.x =
        this.step * Math.round((20000 * (Math.random() - 0.5)) / this.step) +
        this.step / 2;
      edge.position.z =
        this.step * Math.round((20000 * (Math.random() - 0.5)) / this.step) +
        this.step / 2;

      edge.updateMatrix();

      this.scene.add(edge);
      this.edgesPool.push(edge);

      // 秒数
      const duration = 2 * Math.random() + 3;

      // 立方体の落下する動き
      timeline.set(edge.position, { y: 8000 }, 0).to(
        edge.position,
        {
          y: this.step / 2,
          duration,
          ease: Bounce.easeOut,
        },
        0
      );
    });

    this.createTimeScale(timeline);

    timeline.call(
      () => {
        this.createTimeScale(timeline);
      },
      [],
      timeline.duration()
    );

    // 地面
    const grid = new THREE.GridHelper(10000, this.step, 0x444444, 0x444444);
    this.scene.add(grid);

    this.startRendering();
  }

  protected onTick() {
    this.camera.position.x = 1000 * Math.cos((this.rotation * Math.PI) / 180);
    this.camera.position.y = this.cameraPosition.y;
    this.camera.position.z = 1000 * Math.sin((this.rotation * Math.PI) / 180);

    this.camera.lookAt(this.cameraLookAt);

    this.edgesPool.forEach((edge) => edge.updateMatrix());
  }

  private createTimeScale(timeline: gsap.core.Timeline) {
    const totalTimeline = gsap.timeline();
    totalTimeline
      .set(timeline, { timeScale: 1.5 })
      .to(
        timeline,
        { timeScale: 0.01, duration: 1.5, ease: Expo.easeInOut },
        `+=0.8`
      )
      .to(
        timeline,
        { timeScale: 1.5, duration: 1.5, ease: Expo.easeInOut },
        `+=5`
      );
  }
}
