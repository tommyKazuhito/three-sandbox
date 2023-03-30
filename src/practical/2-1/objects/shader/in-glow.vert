uniform vec3 viewVector; // カメラ位置
varying float opacity; // 透明度

void main()
{
  // 単位ベクトル化した頂点法線ベクトル
  vec3 nNomal = normalize(normal);
  // 単位ベクトル化したカメラの位置ベクトル
  vec3 nViewVec = normalize(viewVector);

  // 透明度
  opacity = dot(nNomal, nViewVec);
  opacity = 1.0 - opacity;

  // 3次元上頂点座標を画面上の2次元座標に変換(お決まり)
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
