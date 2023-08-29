import * as THREE from 'three';

import { VERTEX_SHADER } from '../constant/vertex-shader';

const FRAGMENT_SHADER = `
// 輝度を計算するときの重ねづけ。緑の重みが高いのは、人間の目が緑に敏感だからです。
#define R_LUMINANCE 0.298912
#define G_LUMINANCE 0.586611
#define B_LUMINANCE 0.114478

varying vec2 vUv;

uniform sampler2D tDiffuse;

// 自作のランダム関数
float rand(vec2 co) {
  float a = fract(dot(co, vec2(2.067390879775102, 12.451168662908249))) - 0.5;
  float s = a * (6.182785114200511 + a * a * (-38.026512460676566 + a * a * 53.392573080032137));
  float t = fract(s * 43758.5453);
  return t;
}

void main()
{
  vec4 color = texture2D(tDiffuse, vUv);

  // 明るさを0.0〜1.0の範囲で計算
  float v = color.x * R_LUMINANCE + color.y * G_LUMINANCE + color.z * B_LUMINANCE;
  if (v >= rand(vUv)) {
    // 白にする
    color.x = 1.0;
    color.y = 1.0;
    color.z = 1.0;
  } else {
    // 白にする
    color.x = 0.0;
    color.y = 0.0;
    color.z = 0.0;
  }

  gl_FragColor = color;
}
`;

export default class RandomDitherShader extends THREE.ShaderMaterial {
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
