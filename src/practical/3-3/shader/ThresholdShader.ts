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

  // 明るさを0.0〜1.0の範囲で計算
  float v = color.x * R_LUMINANCE + color.y * G_LUMINANCE + color.z * B_LUMINANCE;
  if (v >= 0.5) {
    v = 1.0; // 白
  } else {
    v = 0.0; // 黒
  }

  gl_FragColor = vec4(vec3(v, v, v), 1.0);
}
`;

export default class ThresholdShader extends THREE.ShaderMaterial {
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
