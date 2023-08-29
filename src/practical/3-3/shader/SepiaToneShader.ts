import * as THREE from 'three';

import { VERTEX_SHADER } from '../constant/vertex-shader';

const FRAGMENT_SHADER = `
// 輝度を計算するときの重ねづけ。緑の重みが高いのは、人間の目が緑に敏感だからです。
#define R_LUMINANCE 0.298912
#define G_LUMINANCE 0.586611
#define B_LUMINANCE 0.114478

varying vec2 vUv;

uniform sampler2D tDiffuse;

void main()
{
  vec4 color = texture2D(tDiffuse, vUv);
  float v = color.x * R_LUMINANCE + color.y * G_LUMINANCE + color.z * B_LUMINANCE;
  // セピア調に変換（セピアなので赤や緑を多め）
  color.x = v * 0.9; // R
  color.y = v * 0.7; // G
  color.z = v * 0.4; // B
  gl_FragColor = vec4(color);
}
`;

export default class SepiaToneShader extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        tDiffuse: {
          value: null,
        },
      },
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
    });
  }
}
