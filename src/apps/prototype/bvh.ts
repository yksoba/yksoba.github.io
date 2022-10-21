import { Box3, Vector3 } from "three";
import { select } from "./algorithms";

export type Face<T> = { verts: [Vector3, Vector3, Vector3]; data: T };

export type BVHNode<T> = {
  element?: Face<T>;
  children?: [BVHNode<T>, BVHNode<T>];
  aabb: Box3;
  height: number;
  depth: number;
};

export const constructBVH = <T>(faces: Face<T>[]) => {
  const faces_ = faces.map((face) => {
    const aabb = new Box3().setFromPoints(face.verts);
    return {
      ...face,
      center: aabb.getCenter(new Vector3()),
      aabb,
    };
  });

  return constructBVH_(faces_);
};

type Face_<T> = Face<T> & { center: Vector3; aabb: Box3 };
const constructBVH_ = <T>(faces_: Face_<T>[], depth = 0): BVHNode<T> => {
  if (faces_.length === 0) throw new Error("triangles_ is empty");

  if (faces_.length === 1) {
    return {
      element: faces_[0],
      aabb: faces_[0].aabb,
      height: 0,
      depth,
    };
  }
  const aabb = new Box3().setFromPoints(faces_.flatMap((face) => face.verts));

  const extent = aabb.getSize(new Vector3()).toArray();
  const splitDim = extent.indexOf(Math.max(...extent));
  const splitIndex = Math.floor(faces_.length / 2);

  select(faces_, splitIndex, {
    compare: (a, b) =>
      a.center.getComponent(splitDim) - b.center.getComponent(splitDim),
  });

  const lo = constructBVH_(faces_.slice(0, splitIndex), depth + 1);
  const hi = constructBVH_(faces_.slice(splitIndex), depth + 1);

  return {
    children: [lo, hi],
    aabb,
    height: Math.max(lo.height, hi.height) + 1,
    depth,
  };
};
