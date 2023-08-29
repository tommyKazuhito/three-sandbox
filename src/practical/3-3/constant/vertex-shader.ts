// eslint-disable-next-line import/prefer-default-export
export const VERTEX_SHADER = `
varying vec2 vUv;

void main()
{
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
