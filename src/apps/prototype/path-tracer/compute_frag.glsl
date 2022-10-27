precision highp float;

uniform sampler2D faces;
uniform sampler2D normals;
uniform sampler2D bvhNodes;
uniform sampler2D materials;

uniform float[4] seed;

in vec3 vO;
in vec3 vD;
in vec2 vUV;

out vec4 fragColor;

///////////////
/// STRUCTS ///
///////////////

struct Ray {
  vec3 origin;
  vec3 direction;
  vec3 inv_dir;
};

Ray Ray_(vec3 origin, vec3 direction) {
  return Ray(origin, direction, vec3(0.0, 0.0, 0.0));
}

struct Box {
  vec3 min;
  vec3 max;
};

struct Tri {
  vec3 v1;
  vec3 v2;
  vec3 v3;
};

////////////
/// DATA ///
////////////

struct Face {
  Tri tri;
  int material;
  int normals;
};

Face load_face(int i) {
  vec4 tex0 = texelFetch(faces, ivec2(0, i), 0);
  vec4 tex1 = texelFetch(faces, ivec2(1, i), 0);
  vec4 tex2 = texelFetch(faces, ivec2(2, i), 0);

  return Face(Tri(tex0.xyz, tex1.xyz, tex2.xyz), int(tex0.w), int(tex1.w));
}

void load_normals(int i, out vec3 n1, out vec3 n2, out vec3 n3) {
  vec4 tex0 = texelFetch(normals, ivec2(0, i), 0);
  vec4 tex1 = texelFetch(normals, ivec2(1, i), 0);
  vec4 tex2 = texelFetch(normals, ivec2(2, i), 0);

  n1 = tex0.xyz;
  n2 = tex1.xyz;
  n3 = tex2.xyz;
}

struct Node {
  Box aabb;
  int elem;
  int next;
};

Node load_node(int i) {
  vec4 tex0 = texelFetch(bvhNodes, ivec2(0, i), 0);
  vec4 tex1 = texelFetch(bvhNodes, ivec2(1, i), 0);

  return Node(Box(tex0.xyz, tex1.xyz), int(tex0.w), int(tex1.w));
}

struct Material {
  int flags;
  float metalness;
  vec3 color;
  vec4 emissive;
};

Material load_material(int i) {
  vec4 tex0 = texelFetch(materials, ivec2(0, i), 0);
  vec4 tex1 = texelFetch(materials, ivec2(1, i), 0);
  vec4 tex2 = texelFetch(materials, ivec2(2, i), 0);
  return Material(int(tex0.r), tex0.g, tex1.rgb, tex2);
}

////////////////////////
/// HELPER FUNCTIONS ///
////////////////////////

bool intersect(Ray ray, Box box) {
  vec3 o = ray.origin;
  vec3 inv_d = ray.inv_dir;
  vec3 mn = box.min;
  vec3 mx = box.max;

  vec3 t1 = (mn - o) * inv_d;
  vec3 t2 = (mx - o) * inv_d;

  float tmin = min(t1.x, t2.x);
  float tmax = max(t1.x, t2.x);

  tmin = max(tmin, min(t1.y, t2.y));
  tmax = min(tmax, max(t1.y, t2.y));

  tmin = max(tmin, min(t1.z, t2.z));
  tmax = min(tmax, max(t1.z, t2.z));

  return tmax >= tmin;
}

bool intersect(Ray ray, Tri tri, out vec3 tuv) {
  vec3 t = ray.origin - tri.v1;
  vec3 e1 = tri.v2 - tri.v1;
  vec3 e2 = tri.v3 - tri.v1;
  vec3 p = cross(ray.direction, e2);
  vec3 q = cross(t, e1);

  tuv = vec3(dot(q, e2), dot(p, t), dot(q, ray.direction)) / dot(p, e1);
  return tuv.x >= 0.0 && tuv.y >= 0.0 && tuv.z >= 0.0 && tuv.y + tuv.z <= 1.0;
}

bool intersect(Ray ray, Tri tri, inout float t, out float u, out float v) {
  vec3 tuv;
  if (intersect(ray, tri, tuv) && (t < 0.0 || tuv.x < t)) {
    t = tuv.x;
    u = tuv.y;
    v = tuv.z;
    return true;
  } else {
    return false;
  }
}

vec3 compute_normal(Tri tri) {
  return normalize(cross(tri.v2 - tri.v1, tri.v3 - tri.v1));
}

//////////////
/// RANDOM ///
//////////////

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

vec3 next_unit(inout uvec4 state) {
  float theta = 2.0 * PI * next_uniform(state);
  float phi = acos(1.0 - 2.0 * next_uniform(state));
  return vec3(sin(phi) * cos(theta), sin(phi) * sin(theta), cos(phi));
}

uvec4 init_rand() {
  uvec4 state;
  state.x = floatBitsToUint(seed[0]) ^ floatBitsToUint(vUV.x) ^
            floatBitsToUint(vUV.y);
  state.y = floatBitsToUint(seed[1]) ^ floatBitsToUint(vUV.x) ^
            floatBitsToUint(vUV.y);
  state.z = floatBitsToUint(seed[2]) ^ floatBitsToUint(vUV.x) ^
            floatBitsToUint(vUV.y);
  state.w = floatBitsToUint(seed[3]) ^ floatBitsToUint(vUV.x) ^
            floatBitsToUint(vUV.y);
  return state;
}

//////////////////
/// RAYTRACING ///
//////////////////

struct Hit {
  int face;
  float t;
  float u;
  float v;
};

Hit Hit_() { return Hit(-1, -1.0, 0.0, 0.0); }

bool cast_ray(Ray ray, out Hit hit) {
  bool did_hit = false;
  ray.inv_dir = 1.0 / ray.direction;

  int node_ptr = 0;
  for (int i = 0; i < N_BVH_NODES; i++) {
    if (node_ptr >= N_BVH_NODES)
      break;

    Node node = load_node(node_ptr);

    node_ptr++;

    if (node.elem <= 0) {
      Face face = load_face(-node.elem);
      if (intersect(ray, face.tri, hit.t, hit.u, hit.v)) {
        hit.face = -node.elem;
        did_hit = true;
      }
    }
    if (node.next <= 0) {
      Face face = load_face(-node.next);
      if (intersect(ray, face.tri, hit.t, hit.u, hit.v)) {
        hit.face = -node.next;
        did_hit = true;
      }
    } else if (!intersect(ray, node.aabb)) {
      node_ptr = node.next;
    }
  }

  return did_hit;
}

void sample_hit(inout uvec4 g, Ray ray, Hit hit, out vec3 color, out vec3 light,
                inout Ray next_ray) {
  Face face = load_face(hit.face);

  vec3 normal;

  Material mat = load_material(face.material);
  if ((mat.flags & SMOOTH_NORMALS_FLAG) == 0) {
    normal = compute_normal(face.tri);
  } else {
    vec3 n1, n2, n3;
    load_normals(face.normals, n1, n2, n3);
    normal = normalize((1.0 - hit.u - hit.v) * n1 + hit.u * n2 + hit.v * n3);
  }
  if (dot(normal, ray.direction) > 0.0)
    normal *= -1.0;

  vec3 hemi = next_unit(g);
  if (dot(hemi, normal) < 0.0)
    hemi *= -1.0;

  next_ray.direction =
      normalize(mix(reflect(ray.direction, normal), hemi, 1.0 - mat.metalness));
  next_ray.origin =
      ray.origin + hit.t * ray.direction + 0.001 * next_ray.direction;

  color = mat.color;
  light = mat.emissive.rgb * mat.emissive.a;
}

void sample_sky(Ray ray, out vec3 light) { light = vec3(1.0, 1.0, 1.0); }

void main() {
  uvec4 g = init_rand();

  vec3 running_color = vec3(1.0, 1.0, 1.0);
  vec3 total_light = vec3(0.0, 0.0, 0.0);

  vec3 o = vO;
  vec3 d = normalize(vD);
  Ray ray = Ray_(o, d);

  for (int i = 0; i < 5; i++) {
    Hit hit = Hit_();

    if (cast_ray(ray, hit)) {
      Ray next_ray;
      vec3 color, light;

      sample_hit(g, ray, hit, color, light, next_ray);
      total_light += running_color * light;
      running_color *= color;

      ray = next_ray;
    } else {
      vec3 light;
      sample_sky(ray, light);
      total_light += running_color * light;
      break;
    }
  }

  fragColor = vec4(total_light, 1.0);
}