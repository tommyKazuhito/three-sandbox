import * as THREE from 'three';

import GeoUtil from '../utils/GeoUtil';

export default class CityLine extends THREE.Group {
  private readonly line: THREE.Line;

  private readonly geometry: THREE.BufferGeometry;

  constructor(
    private startTarget: THREE.Object3D,
    private endTarget: THREE.Object3D
  ) {
    super();

    this.geometry = new THREE.BufferGeometry();
    this.line = new THREE.Line(
      this.geometry,
      new THREE.LineBasicMaterial({
        linewidth: 2,
        color: 0x00ffff,
        transparent: true,
        opacity: 0.54,
      })
    );

    this.add(this.line);
  }

  getLine() {
    return this.line;
  }

  update() {
    const { startTarget, endTarget } = this;

    const points = GeoUtil.createOrbitPoints(
      startTarget.position,
      endTarget.position
    );

    this.geometry.setFromPoints(points);
  }
}
