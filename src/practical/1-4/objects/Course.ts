import * as THREE from 'three';

export default class Course extends THREE.Object3D {
  private points: THREE.Vector3[] = [];

  constructor() {
    super();

    // ジオメトリ生成のための配列
    const floatArray: number[] = [];
    const radius = 5;
    for (let i = 0; i < 362; i++) {
      const rad = (i * Math.PI) / 180;

      const sin = Math.sin(rad * 3);

      const x = radius * Math.cos(rad) * 2 + sin * 2;
      const y = radius * Math.sin(rad) + sin * 3;

      this.points.push(new THREE.Vector3(x, y, 0));

      // ジオメトリ生成のために頂点を追加
      floatArray.push(x, y, 0);
    }

    // バッファージオメトリで、軌跡を作成
    // 参照: https://threejs.org/docs/#api/en/core/BufferGeometry
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(floatArray), 3)
    );

    const line = new THREE.Line(geometry, material);
    this.add(line);
  }

  getPoints() {
    return this.points;
  }
}
