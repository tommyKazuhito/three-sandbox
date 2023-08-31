import * as THREE from 'three';

import { VERTEX_SHADER } from '../constant/vertex-shader';

const FRAGMENT_SHADER = `
// 輝度を計算するときの重ねづけ。緑の重みが高いのは、人間の目が緑に敏感だからです。
#define R_LUMINANCE 0.298912
#define G_LUMINANCE 0.586611
#define B_LUMINANCE 0.114478

varying vec2 vUv;

uniform sampler2D tDiffuse;

const vec3 monochromeScale = vec3(R_LUMINANCE, G_LUMINANCE, B_LUMINANCE);

void main()
{
  vec4 color = texture2D(tDiffuse, vUv);
  float grayColor = dot(color.rgb, monochromeScale);
  color = vec4(vec3(grayColor), 1.0);
  gl_FragColor = vec4(color);
}
`;

export default class MonochromeShader extends THREE.ShaderMaterial {
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
