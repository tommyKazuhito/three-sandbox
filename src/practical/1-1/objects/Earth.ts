import * as THREE from 'three';

import bumpTexture from '@img/trigonometric/bump.jpg';
import cloudTexture from '@img/trigonometric/cloud.jpg';
import groundTexture from '@img/trigonometric/ground.jpg';
import specularTexture from '@img/trigonometric/specular.png';

export default class Earth extends THREE.Group {
  /** 球 **/
  ground: THREE.Mesh;

  /** 雲 **/
  cloud: THREE.Mesh;

  constructor() {
    super();

    {
      // 地球の球体
      const geometry = new THREE.SphereGeometry(100, 60, 60);
      const material = new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load(groundTexture),
        bumpMap: new THREE.TextureLoader().load(bumpTexture),
        bumpScale: 1,
        specularMap: new THREE.TextureLoader().load(specularTexture),
      });

      this.ground = new THREE.Mesh(geometry, material);
      this.ground.receiveShadow = true;

      this.add(this.ground);
    }

    {
      // 雲
      const geometry = new THREE.SphereGeometry(102, 60, 60);
      const material = new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load(cloudTexture),
        transparent: true,
        blending: THREE.AdditiveBlending,
      });

      this.cloud = new THREE.Mesh(geometry, material);
      this.cloud.castShadow = true;

      this.add(this.cloud);
    }
  }

  update() {
    this.cloud.rotation.y += 0.0005;
  }
}
