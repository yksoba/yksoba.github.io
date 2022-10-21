
in vec3 position;

uniform mat4 matrixWorld;
uniform mat4 projectionMatrixInverse;

in vec2 uv;
out vec2 vUV;

void main() {
  vUV = (position.xy + 1.0) / 2.0;
  gl_Position = vec4(position, 1.0);
}