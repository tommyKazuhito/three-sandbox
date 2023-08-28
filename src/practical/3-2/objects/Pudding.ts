import * as THREE from 'three';

import fragmentSource from '../shader/pudding.frag?raw';
import vertexSource from '../shader/pudding.vert?raw';

export default class Pudding extends THREE.Mesh {
  geometry: THREE.CylinderGeometry;

  material: THREE.ShaderMaterial;

  constructor() {
    const geometry = new THREE.CylinderGeometry(8.4, 11.2, 11.2, 100, 30);

    const texture = new THREE.TextureLoader().load('img/texture/pudding.png');
    const uniforms: THREE.ShaderMaterialParameters['uniforms'] = {
      frame: {
        value: 0.0,
      },
      amplitude: {
        value: 5,
      },
      map: {
        value: texture,
      },
      lightPosition: {
        value: new THREE.Vector3(),
      },
      modelHeight: {
        value: 11.2,
      },
      swingVec: {
        value: new THREE.Vector3(),
      },
      swingStrength: {
        value: 0,
      },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: vertexSource,
      fragmentShader: fragmentSource,
    });

    super(geometry, material);

    this.geometry = geometry;
    this.material = material;

    this.position.set(0, 21, 0);
  }
}
