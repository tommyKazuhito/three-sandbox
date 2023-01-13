import * as THREE from 'three';

import Course from './objects/Course';
import Truck from './objects/Truck';

import AppVector from '@script/modules/AppVector';
import SceneModule from '@script/modules/Scene';

class Scene extends SceneModule {
  course: Course;

  truck: Truck;

  private frame = 0;

  constructor() {
    super();

    // カメラ
    this.camera.position.x = 10;
    this.camera.position.y = 10;
    this.camera.position.z = 30;

    // 環境光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.add(ambientLight);

    // 平行光源
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    this.add(directionalLight);

    // 床
    const plane = new THREE.GridHelper(50, 30);
    plane.position.y = -10;
    this.add(plane);
    this.add(new THREE.AxesHelper(1000));

    // コース
    this.course = new Course();
    this.add(this.course);

    // トロッコ
    this.truck = new Truck();
    this.truck.scale.multiplyScalar(0.5);
    this.truck.position.copy(this.course.getPoints()[0]);
    this.add(this.truck);
  }

  update(start: number) {
    // カメラを更新
    this.camera.update();

    // 現在時間の継続時間に対する進捗度を算出
    const progress = (Date.now() - start) / 6000;

    // 6秒かけて1周する
    this.frame = Math.round(360 * (progress - Math.floor(progress)));

    // コースの法線を取得
    const points = this.course.getPoints();
    const normal = this.getNormal(points[this.frame], points[this.frame + 1]);

    // トラックの位置を修正
    this.truck.position.copy(points[this.frame]);
    this.truck.up.copy(normal);
    this.truck.lookAt(points[this.frame + 1]);
  }

  /**
   *
   *
   * @private
   * @param {THREE.Vector3} current
   * @param {THREE.Vector3} next
   * @return {THREE.Vector3} 法線ベクトル
   * @memberof Scene
   */
  private getNormal(current: THREE.Vector3, next: THREE.Vector3) {
    const frontVector = next.clone().sub(current).normalize();
    const sideVector = new THREE.Vector3(0, 0, 1);

    return frontVector.cross(sideVector);
  }
}

const init = () => {
  const wrapper = document.getElementById('app1')!;

  new AppVector(wrapper, new Scene());
};

window.addEventListener('DOMContentLoaded', init);
