import * as THREE from 'three';

export default class CityPoint extends THREE.Group {
  /** 球 */
  sphere: THREE.Mesh;

  /** 点光源 */
  pointLight: THREE.PointLight;

  /** 地球からポイントまでの距離 */
  private radius = 110;

  /** 緯度 */
  private lat = 0;

  /** 経度 */
  private lng = 0;

  /**
   * Creates an instance of CityPoint.
   *
   * @param {number} color - ポイントの色
   * @param {[number, number]} coords - 緯度・経度
   * @memberof CityPoint
   */
  constructor(color: number, coords: [number, number]) {
    super();

    // 球
    const geometry = new THREE.SphereGeometry(2, 10, 10);
    const material = new THREE.MeshLambertMaterial({ color });

    this.sphere = new THREE.Mesh(geometry, material);
    this.sphere.receiveShadow = true;

    this.add(this.sphere);

    // 点光源
    this.pointLight = new THREE.PointLight(color, 2, 0);
    this.add(this.pointLight);

    this.lat = coords[0];
    this.lng = coords[1];
  }

  setLat(lat: number) {
    this.lat = lat;
  }

  setLng(lng: number) {
    this.lng = lng;
  }

  /**
   * 緯度・経度・半径の情報をまとめて取得します。
   *
   * @memberof CityPoint
   */
  getCoords() {
    const { radius, lat, lng } = this;

    return {
      lat,
      lng,
      radius,
    };
  }
}
