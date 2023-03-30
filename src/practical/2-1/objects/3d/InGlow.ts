import * as THREE from 'three';

import Camera from '../Camera';
import fragmentSource from '../shader/in-glow.frag?raw';
import vertexSource from '../shader/in-glow.vert?raw';

export default class InGlow extends THREE.Object3D {
  /** ジオメトリ */
  private geometry: THREE.SphereGeometry;

  /** マテリアル */
  private material: THREE.ShaderMaterial;

  /** メッシュ */
  private mesh: THREE.Mesh;

  constructor() {
    super();

    // ジオメトリ
    this.geometry = new THREE.SphereGeometry(2.07, 20, 20);

    // カメラ
    const camera = Camera.getInstance();

    // マテリアル
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        viewVector: { value: camera.position },
        glowColor: { value: new THREE.Color(0x96ecff) },
      },
      vertexShader: vertexSource,
      fragmentShader: fragmentSource,
      side: THREE.FrontSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });

    // メッシュ
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.add(this.mesh);
  }
}
