import * as THREE from 'three';

import { VERTEX_SHADER } from '../constant/vertex-shader';

const FRAGMENT_SHADER = `
// 輝度を計算するときの重ねづけ。緑の重みが高いのは、人間の目が緑に敏感だからです。
#define R_LUMINANCE 0.298912
#define G_LUMINANCE 0.586611
#define B_LUMINANCE 0.114478

varying vec2 vUv;

uniform sampler2D tDiffuse;
uniform vec2 vScreenSize;

void main()
{
  vec4 color = texture2D(tDiffuse, vUv);

  float x = floor(vUv.x * vScreenSize.x);
  float y = floor(vUv.y * vScreenSize.y);

  mat4 m = mat4(
    vec4(0.0, 8.0, 2.0, 10.0),
    vec4(12.0, 4.0, 14.0, 6.0),
    vec4(3.0, 11.0, 1.0, 9.0),
    vec4(15.0, 7.0, 13.0, 5.0)
  );
  float xi = mod(x, 4.0);
  float yi = mod(y, 4.0);
  float threshold = 0.0;

  if(xi == 0.0) {
    if(yi == 0.0) {threshold = m[0][0]; }
    if(yi == 1.0) {threshold = m[0][1]; }
    if(yi == 2.0) {threshold = m[0][2]; }
    if(yi == 3.0) {threshold = m[0][3]; }
  }

  if(xi == 1.0) {
    if(yi == 0.0) {threshold = m[1][0]; }
    if(yi == 1.0) {threshold = m[1][1]; }
    if(yi == 2.0) {threshold = m[1][2]; }
    if(yi == 3.0) {threshold = m[1][3]; }
  }

  if(xi == 2.0) {
    if(yi == 0.0) {threshold = m[2][0]; }
    if(yi == 1.0) {threshold = m[2][1]; }
    if(yi == 2.0) {threshold = m[2][2]; }
    if(yi == 3.0) {threshold = m[2][3]; }
  }

  if(xi == 3.0) {
    if(yi == 0.0) {threshold = m[3][0]; }
    if(yi == 1.0) {threshold = m[3][1]; }
    if(yi == 2.0) {threshold = m[3][2]; }
    if(yi == 3.0) {threshold = m[3][3]; }
  }

  color = color * 16.0;

  // 明るさを0.0〜1.0の範囲で計算
  float v = color.x * R_LUMINANCE + color.y * G_LUMINANCE + color.z * B_LUMINANCE;
  if (v < threshold) {
    // 白にする
    color.x = 1.0;
    color.y = 1.0;
    color.z = 1.0;
  } else {
    // 黒にする
    color.x = 0.0;
    color.y = 0.0;
    color.z = 0.0;
  }

  gl_FragColor = color;
}
`;

export default class BayerDitherShader extends THREE.ShaderMaterial {
  constructor(width: number, height: number) {
    super({
      uniforms: {
        tDiffuse: {
          value: null,
        },
        vScreenSize: { value: new THREE.Vector2(width, height) },
      },
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
    });
  }

  setScreenSize(width: number, height: number) {
    this.uniforms.vScreenSize.value.set(width, height);
  }
}
