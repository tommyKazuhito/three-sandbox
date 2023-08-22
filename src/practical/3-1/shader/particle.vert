attribute vec3 position0;
attribute vec3 position1;
attribute vec3 color;
varying vec4 vColor;
varying mat4 mvpMatrix;
uniform float pointSize;
uniform float timeScale;
uniform float colorScale;

void main()
{
  vec3 diff = (vec3(1, 1, 1) - color) * colorScale;
  vColor = vec4(color + diff, 1);
  vec3 position = position0 + (position1 - position0) * timeScale;
  gl_Position = mvpMatrix * vec4(position, 1.0);
  gl_PointSize = pointSize;
}
