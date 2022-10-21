import { Box3, Vector3 } from "three";
import { select } from "./algorithms";

export type Triangle = [Vector3, Vector3, Vector3];

export type BVHNode = {
  element?: Triangle;
  children?: [BVHNode, BVHNode];
  aabb: Box3;
  height: number;
  depth: number;
};

export const constructBVH = (triangles: Triangle[]) => {
  const triangles_ = triangles.map((tri) => {
    const aabb = new Box3().setFromPoints(tri);
    return {
      verts: tri,
      center: aabb.getCenter(new Vector3()),
      aabb,
    };
  });

  return constructBVH_(triangles_);
};

type Triangle_ = { verts: Triangle; center: Vector3; aabb: Box3 };
const constructBVH_ = (triangles_: Triangle_[], depth = 0): BVHNode => {
  if (triangles_.length === 0) throw new Error("triangles_ is empty");

  if (triangles_.length === 1) {
    return {
      element: triangles_[0].verts,
      aabb: triangles_[0].aabb,
      height: 0,
      depth,
    };
  }
  const aabb = new Box3().setFromPoints(triangles_.flatMap((tri) => tri.verts));

  const extent = aabb.getSize(new Vector3()).toArray();
  const splitDim = extent.indexOf(Math.max(...extent));
  const splitIndex = Math.floor(triangles_.length / 2);

  select(triangles_, splitIndex, {
    compare: (a, b) =>
      a.center.getComponent(splitDim) - b.center.getComponent(splitDim),
  });

  const lo = constructBVH_(triangles_.slice(0, splitIndex), depth + 1);
  const hi = constructBVH_(triangles_.slice(splitIndex), depth + 1);

  return {
    children: [lo, hi],
    aabb,
    height: Math.max(lo.height, hi.height) + 1,
    depth,
  };
};
