import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';

import type * as THREE from 'three';
import type { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';

/* eslint-disable import/prefer-default-export */
export const addEffect = (
  composer: EffectComposer,
  shader: THREE.ShaderMaterial,
  name: string
) => {
  const pass = new ShaderPass(shader);

  composer.addPass(pass);

  pass.renderToScreen = false;
  pass.enabled = false;

  return {
    id: name,
    material: shader,
    pass,
  };
};
