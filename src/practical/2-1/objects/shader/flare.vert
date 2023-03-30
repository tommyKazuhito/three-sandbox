varying vec2 vUv; // フラグメントシェーダーに渡すUV座標
varying float radius; // フラグメントシェーダーに渡す半径
uniform vec2 offset; // カラーマップのズレ位置

void main()
{
  // 本来の位置からUVをずらす
  vUv = uv + offset;

  // 中心から頂点座標までの距離
  radius = length(position);

  // 3次元上頂点座標を画面上の二次元座標に変換(お決まり)
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
