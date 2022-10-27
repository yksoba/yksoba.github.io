#define RandomState uvec4

precision highp float;

uniform float[4] randomSeed;
uniform sampler2D elems;
uniform sampler2D nodes;

in vec2 vUV;
in vec2 vPosition;

out vec4 fragColor;

/////////////////////////////////

struct Light {
  vec3 position;
  vec3 color;
  float intensity;
};

struct Ray {
  vec2 o;
  vec2 d;
  vec2 inv_d;
};

Ray Ray_(vec2 o, vec2 d) { return Ray(o, d, vec2(0., 0.)); }

struct Hit {
  int elem;
  float t;
  float u;
};

Hit Hit_() { return Hit(-1, -1., -1.); }
Hit Hit_(float t) { return Hit(-1, t, -1.); }

struct Box {
  vec2 min;
  vec2 max;
};

/////////////////////////////////

struct CurveSegment {
  int type;
  vec2 v1;
  vec2 v2;
};

CurveSegment get_elem(int i) {
  vec4 tex0 = texelFetch(elems, ivec2(0, i), 0);
  vec4 tex1 = texelFetch(elems, ivec2(1, i), 0);

  int type = int(tex0.x);
  vec2 v1 = tex0.yz;
  vec2 v2 = tex1.xy;

  return CurveSegment(type, v1, v2);
}

/////////////////////////////////

struct Node {
  Box box;
  int left;
  int right;
  int next;
};

Node get_node(int i) {
  vec4 tex0 = texelFetch(nodes, ivec2(0, i), 0);
  vec4 tex1 = texelFetch(nodes, ivec2(1, i), 0);

  vec2 min = tex0.xy;
  vec2 max = vec2(tex0.z, tex1.x);
  Box box = Box(min, max);
  int left = int(tex1.y);
  int right = tex1.z >= 0. ? int(tex1.z) : -1;
  int next = tex1.z < 0. ? int(-tex1.z) : i + 1;

  return Node(box, left, right, next);
}

/////////////////////////////////

float cross2(vec2 a, vec2 b) { return a.x * b.y - b.x * a.y; }

/////////////////////////////////

uvec4 init_rand() {
  uvec4 state;
  state.x = floatBitsToUint(randomSeed[0]) ^ floatBitsToUint(vUV.x) ^
            floatBitsToUint(vUV.y);
  state.y = floatBitsToUint(randomSeed[1]) ^ floatBitsToUint(vUV.x) ^
            floatBitsToUint(vUV.y);
  state.z = floatBitsToUint(randomSeed[2]) ^ floatBitsToUint(vUV.x) ^
            floatBitsToUint(vUV.y);
  state.w = floatBitsToUint(randomSeed[3]) ^ floatBitsToUint(vUV.x) ^
            floatBitsToUint(vUV.y);
  return state;
}

uint taus_step(uint z, int S1, int S2, int S3, uint M) {
  uint b = (((z << S1) ^ z) >> S2);
  return (((z & M) << S3) ^ b);
}

uint lcg_step(uint z, uint A, uint C) { return (A * z + C); }

uint next_bits(inout uvec4 state) {
  state.x = taus_step(state.x, 13, 19, 12, 4294967294u);
  state.y = taus_step(state.y, 2, 25, 4, 4294967288u);
  state.z = taus_step(state.z, 3, 11, 17, 4294967280u);
  state.w = lcg_step(state.w, 1664525u, 1013904223u);
  return state.x ^ state.y ^ state.z ^ state.w;
}

float next_uniform(inout uvec4 state) {
  uint bits = next_bits(state);
  bits &= 0x007FFFFFu;
  bits |= 0x3F800000u;
  return uintBitsToFloat(bits) - 1.0;
}

/////////////////////////////////

bool intersect(Ray r, CurveSegment s, out float t1, out float t2) {
  vec2 a = r.o - s.v1;
  vec2 b = s.v2 - s.v1;

  mat2 m = mat2(-r.d, b);
  vec2 t = inverse(m) * a;

  t1 = t.x;
  t2 = t.y;

  return t1 >= 0. && 0. <= t2 && t2 <= 1.;
}
bool intersect(Ray r, CurveSegment s, out float t1) {
  float t2;
  return intersect(r, s, t1, t2);
}
bool intersect(Ray r, CurveSegment s) {
  float t1, t2;
  return intersect(r, s, t1, t2);
}

bool intersect(Ray r, Box b) {
  vec2 t1 = (b.min - r.o) * r.inv_d;
  vec2 t2 = (b.max - r.o) * r.inv_d;

  float tmin = min(t1.x, t2.x);
  float tmax = max(t1.x, t2.x);

  tmin = max(tmin, min(t1.y, t2.y));
  tmax = min(tmax, max(t1.y, t2.y));

  return tmax >= tmin;
}

/////////////////////////////////

Ray ray_to(vec2 from, vec2 to) { return Ray_(from, normalize(to - from)); }

Ray ray_from_angle(vec2 o, float angle) {
  return Ray_(o, vec2(cos(angle), sin(angle)));
}

Ray advance_ray(Ray r, float dt) { return Ray_(r.o + dt * r.d, r.d); }

/////////////////////////////////

vec2 compute_normal(CurveSegment s, float u) {
  vec2 t = s.v2 - s.v1;
  return normalize(vec2(t.y, -t.x));
}

/////////////////////////////////

bool cast_ray(Ray ray, int elem, inout Hit hit) {
  float t, u;

  CurveSegment s = get_elem(elem);
  if (intersect(ray, s, t, u) && (hit.t < 0. || t < hit.t)) {
    hit.elem = elem;
    hit.t = t;
    hit.u = u;
    return true;
  }
  return false;
}

bool cast_ray(Ray ray, inout Hit hit) {
  ray.inv_d = 1. / ray.d;

  int j = 0;
  bool did_hit = false;
  for (int i = 0; i < N_NODES; i++) {
    if (j >= N_NODES)
      break;

    Node node = get_node(j);

    if (!intersect(ray, node.box)) {
      j = node.next;
      continue;
    }

    if (node.left >= 0)
      did_hit = cast_ray(ray, node.left, hit) || did_hit;

    if (node.right >= 0)
      did_hit = cast_ray(ray, node.right, hit) || did_hit;

    j++;
  }

  return did_hit;
}

bool cast_ray(Ray ray, float max_t) {
  Hit hit = Hit_(max_t);
  return cast_ray(ray, hit);
}

/////////////////////////////////

void main() {
  RandomState g = init_rand();
  vec3 color = vec3(0., 0., 0.);

  Light light = Light(vec3(0., 0., 10.), vec3(1., 0.75, 0.5), 100.);

  Ray vis_ray = ray_to(vPosition, light.position.xy);
  float r = distance(vPosition, light.position.xy);
  if (!cast_ray(vis_ray, r))
    color += light.color * light.intensity * pow(r + light.position.z, -2.);

  float angle = 2. * PI * next_uniform(g);
  Ray ray = ray_from_angle(vPosition, angle);

  for (int i = 0; i < 3; i++) {
    Hit hit = Hit_();
    if (!cast_ray(ray, hit))
      break;

    CurveSegment s = get_elem(hit.elem);
    vec2 normal = compute_normal(s, hit.u);
    // vec2 ref_d = reflect(ray.d, normal);

    float angle = 2. * PI * next_uniform(g);
    vec2 ref_d = vec2(cos(angle), sin(angle));

    if (dot(normal, ray.d) * dot(normal, ref_d) > 0.)
      ref_d *= -1.;

    ray = Ray_(ray.o + hit.t * ray.d + 0.001 * ref_d, ref_d);

    Ray vis_ray = ray_to(ray.o, light.position.xy);
    float r = distance(ray.o, light.position.xy);
    if (!cast_ray(vis_ray, r))
      color += light.color * light.intensity * pow(r + light.position.z, -2.);
  }

  fragColor = vec4(color, 1.);
}