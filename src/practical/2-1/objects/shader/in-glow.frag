uniform vec3 glowColor; // グローの色
varying float opacity; // 頂点シェーダーから受け取る透明度

void main()
{
  gl_FragColor = vec4(glowColor, opacity);
}
