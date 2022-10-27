precision highp float;

uniform sampler2D cur;
uniform sampler2D prev;
uniform sampler2D acc;

uniform int mode;
uniform float alpha;

in vec2 vUV;

out vec4 fragColor;

#define EPS 0.0001

float pow2(float b, float e) {
  if (abs(b) < EPS && abs(e) < EPS)
    return 1.0;
  else
    return pow(b, e);
}

vec4 pow2(vec4 v, float e) {
  return vec4(pow2(v.x, e), pow2(v.y, e), pow2(v.z, e), pow2(v.w, e));
}

void main() {
  if (mode == 0) {
    fragColor = alpha * texture(cur, vUV) + (1.0 - alpha) * texture(prev, vUV);
  } else if (mode == 1) {
    fragColor = pow2(vec4(texture(acc, vUV).xyz, 1.0), 1.0/2.2);
  }
}