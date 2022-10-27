
in vec3 position;

uniform mat4 matrixWorld;
uniform mat4 projectionMatrixInverse;

in vec2 uv;
out vec2 vUV;

void main() {
  vUV = uv;
  gl_Position = vec4(position, 1.0);
}