import * as THREE from 'three';

import { VERTEX_SHADER } from '../constant/vertex-shader';

const FRAGMENT_SHADER = `
varying vec2 vUv;

uniform sampler2D tDiffuse;
uniform vec2 vScreenSize;
uniform vec2 vCenter;
uniform float fRadius;
uniform float fStrength;

void main()
{
  vec2 pos = (vUv * vScreenSize) - vCenter;
  float len = length(pos);
  if (len >= fRadius) {
    gl_FragColor = texture2D(tDiffuse, vUv);
    return;
  }

  float uzu = min(max(1.0 - (len / fRadius), 0.0), 1.0) * fStrength;
  float x = pos.x * cos(uzu) - pos.y * sin(uzu);
  float y = pos.x * sin(uzu) + pos.y * cos(uzu);
  vec2 retPos = (vec2(x, y) + vCenter) / vScreenSize;
  vec4 color = texture2D(tDiffuse, retPos);

  gl_FragColor = color;
}
`;

export default class UzumakiShader extends THREE.ShaderMaterial {
  constructor(width: number, height: number) {
    super({
      uniforms: {
        tDiffuse: { value: null },
        vScreenSize: { value: new THREE.Vector2(width, height) },
        vCenter: { value: new THREE.Vector2(0, 0) },
        fRadius: { value: 150 },
        fStrength: { value: 2.5 },
      },
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
    });
  }

  setMousePos(x: number, y: number) {
    this.uniforms.vCenter.value.x = x;
    this.uniforms.vCenter.value.y = this.uniforms.vScreenSize.value.y - y;
  }

  setScreenSize(width: number, height: number) {
    this.uniforms.vScreenSize.value.set(width, height);
  }

  setUzumakiScale(scale: number) {
    this.uniforms.fRadius.value = scale;
  }
}
