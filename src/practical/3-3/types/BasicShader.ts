import type * as THREE from 'three';

export default interface BasicShader {
  uniforms: THREE.ShaderMaterialParameters['uniforms'];
  vertexShader: string;
  fragmentShader: string;
}
