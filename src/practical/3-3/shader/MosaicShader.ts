import * as THREE from 'three';

import { VERTEX_SHADER } from '../constant/vertex-shader';

const FRAGMENT_SHADER = `
varying vec2 vUv;

uniform sampler2D tDiffuse;
uniform vec2 vScreenSize;
uniform float fMosaicScale;

void main()
{
  vec2 vUv2 = vUv;
  vUv2.x = floor(vUv2.x * vScreenSize.x / fMosaicScale) / (vScreenSize.x / fMosaicScale) + (fMosaicScale / 2.0) / vScreenSize.x;
  vUv2.y = floor(vUv2.y * vScreenSize.y / fMosaicScale) / (vScreenSize.y / fMosaicScale) + (fMosaicScale / 2.0) / vScreenSize.y;

  gl_FragColor = texture2D(tDiffuse, vUv2);
}
`;

export default class MosaicShader extends THREE.ShaderMaterial {
  constructor(width: number, height: number) {
    super({
      uniforms: {
        tDiffuse: { value: null },
        vScreenSize: { value: new THREE.Vector2(width, height) },
        fMosaicScale: { value: 10.0 },
      },
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
    });
  }

  setScreenSize(width: number, height: number) {
    this.uniforms.vScreenSize.value.set(width, height);
  }

  setMosaicScale(scale: number) {
    this.uniforms.fMosaicScale.value = scale;
  }
}
