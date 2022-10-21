precision highp float;

uniform sampler2D cur;
uniform sampler2D prev;
uniform sampler2D acc;

uniform int mode;
uniform float alpha;

in vec2 vUV;

out vec4 fragColor;

void main() {
  if (mode == 0) {
    fragColor = alpha * texture(cur, vUV) + (1.0 - alpha) * texture(prev, vUV);
  } else if (mode == 1) {
    fragColor = vec4(texture(acc, vUV).xyz, 1.0);
  }
}