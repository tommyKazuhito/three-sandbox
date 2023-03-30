uniform sampler2D map; // テクスチャ
uniform float opacity; // 透明度
uniform float topRadius; // 外径
uniform float bottomRadius; // 内径
varying vec2 vUv; // UV座標
varying float radius; // 頂点位置から中心までの距離
const float PI = 3.1415926; // 円周率

void main()
{
  // uvの位置情報からテクスチャーの色を取得
  vec4 tColor = texture2D(map, vUv);

  // ドーナツの辺の幅 = 円柱上面の半径 - 円柱下面の半径
  float width = topRadius - bottomRadius;
  // 描画位置がドーナツの幅の何割の位置になるか
  float ratio = (radius - bottomRadius) / width;
  float opacity = opacity * sin(PI * ratio);

  // ベースカラー
  vec4 baseColor = (tColor + vec4(0.0, 0.0, 0.3, 1.0));

  // 透明度を反映させる
  gl_FragColor = baseColor * vec4(1.0, 1.0, 1.0, opacity);
}
