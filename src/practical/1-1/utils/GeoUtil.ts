import * as THREE from 'three';

export default class GeoUtil {
  constructor() {
    throw new Error();
  }

  /**
   * 緯度経度から位置を算出します。
   *
   * @static
   * @param {number} lat - 緯度
   * @param {number} lng - 経度
   * @param {number} radius - 半径
   * @return {THREE.Vector3} - 3D座標
   * @memberof GeoUtil
   */
  static translateGeoCoords(lat: number, lng: number, radius: number) {
    // 仰角
    const phi = (lat * Math.PI) / 180;
    // 方位角
    const theta = ((lng - 180) * Math.PI) / 180;

    const r = radius * Math.cos(phi);

    const x = -r * Math.cos(theta);
    const y = radius * Math.sin(phi);
    const z = r * Math.sin(theta);

    return new THREE.Vector3(x, y, z);
  }

  /**
   *
   *
   * @static
   * @param {THREE.Vector3} start - 開始点
   * @param {THREE.Vector3} end - 終了点
   * @param {number} [segments=100] - セグメント分割数
   * @return {THREE.Vector3[]} - 3D座標の配列
   * @memberof GeoUtil
   */
  static createOrbitPoints(
    start: THREE.Vector3,
    end: THREE.Vector3,
    segments: number = 100
  ) {
    // 頂点を格納する配列
    const vertices: THREE.Vector3[] = [];

    const startVec = start.clone();
    const endVec = end.clone();

    // ２つのベクトルの回転軸
    const axis = startVec.clone().cross(endVec);
    axis.normalize();

    // ２つのベクトルが織りなす角度
    const angle = startVec.angleTo(endVec);

    // ２つの衛星を結ぶ弧を描くための頂点を打つ
    for (let i = 0; i < segments; i++) {
      // axisを軸としたクォータニオンを生成
      const q = new THREE.Quaternion();
      q.setFromAxisAngle(axis, (angle / segments) * i);

      // ベクトルを回転させる
      vertices.push(startVec.clone().applyQuaternion(q));
    }

    // 終了点を追加
    vertices.push(endVec);

    return vertices;
  }
}
