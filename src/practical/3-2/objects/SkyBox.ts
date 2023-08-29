import * as THREE from 'three';

export default class SkyBox extends THREE.Mesh {
  static readonly textureDir = 'img/texture/';

  static readonly urls = [
    'bottom.png',
    'bottom.png',
    'bottom.png',
    'bottom.png',
    'bottom.png',
    'bottom.png',
  ];

  constructor() {
    const map = new THREE.CubeTextureLoader()
      .setPath(SkyBox.textureDir)
      .load(SkyBox.urls);

    const material = new THREE.MeshBasicMaterial({
      envMap: map,
      side: THREE.BackSide,
    });
    const geometry = new THREE.BoxGeometry(1000, 1000, 1000);

    super(geometry, material);
  }
}
