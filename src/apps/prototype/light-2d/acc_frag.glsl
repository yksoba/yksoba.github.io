precision highp float;

uniform sampler2D cur;
uniform sampler2D prev;
uniform sampler2D acc;
uniform int mode;
uniform float alpha;

in vec2 vUV;

out vec4 fragColor;

/////////////////////////////////

float compress(float x, float k) {
  return pow(-1. + 2. / (1. + exp(-2. * pow(x, k))), 1. / k);
}
float compress(float x) { return compress(x, 1.); }

vec3 compress(vec3 v, float k) {
  return vec3(compress(v.x, k), compress(v.y, k), compress(v.z, k));
}
vec3 compress(vec3 v) { return compress(v, 1.); }

/////////////////////////////////

void main() {
  if (mode == 0) {
    fragColor = alpha * texture(cur, vUV) + (1.0 - alpha) * texture(prev, vUV);
  } else if (mode == 1) {
    fragColor = vec4(compress(texture(acc, vUV).xyz), 1.0);
  }
}