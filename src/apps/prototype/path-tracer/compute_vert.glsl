in vec3 position;

uniform mat4 matrixWorld;
uniform mat4 projectionMatrixInverse;

out vec3 vO;
out vec3 vD;

in vec2 uv;
out vec2 vUV;

void main() {
  vUV = (position.xy + 1.0) / 2.0;

  vec4 o4 = matrixWorld * vec4(0.0, 0.0, 0.0, 1.0);
  vO = o4.xyz / o4.w;

  vec4 p4 = matrixWorld * projectionMatrixInverse * vec4(position.xy, 0.5, 1.0);
  vec3 p = p4.xyz / p4.w;

  vD = normalize(p - vO);

  gl_Position = vec4(position, 1.0);
}