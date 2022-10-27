
uniform mat4 matrixWorld;
uniform mat4 projectionMatrixInverse;

in vec3 position;
in vec2 uv;

out vec2 vUV;
out vec2 vPosition;

void main() {
  vUV = uv;

  vPosition = (matrixWorld * projectionMatrixInverse * vec4(position, 1.0)).xy;

  gl_Position = vec4(position, 1.0);
}