import { Box2, Box3, Vector2, Vector3 } from "three";
import { select } from "./algorithms";

export type ElementIn<T> = { aabb: Box2 | Box3; data: T };
export type ElementOut<T> = { aabb: Box2 & Box3; data: T };

export type BVHNode<T> = {
  element?: ElementOut<T>;
  children?: [BVHNode<T>, BVHNode<T>];
  aabb: Box2 & Box3;
  height: number;
  depth: number;
};

export const constructBVH = <T>(elems: ElementIn<T>[]) => {
  const elems_ = elems.map((elem) => {
    const aabb = elem.aabb;
    return {
      ...elem,
      center: aabb.min
        .clone()
        .add(aabb.max as Vector3 & Vector2)
        .divideScalar(2),
      aabb,
    };
  });

  return constructBVH_(elems_);
};

type Element_<T> = ElementIn<T> & {
  center: Vector2 | Vector3;
  aabb: Box2 | Box3;
};
const constructBVH_ = <T>(elems_: Element_<T>[], depth = 0): BVHNode<T> => {
  if (elems_.length === 0) throw new Error("triangles_ is empty");

  if (elems_.length === 1) {
    return {
      element: elems_[0] as unknown as ElementOut<T>,
      aabb: elems_[0].aabb as Box2 & Box3,
      height: 0,
      depth,
    };
  }

  const aabb = elems_.reduce(
    (acc, cur) => acc.union(cur.aabb as Box2 & Box3),
    elems_[0].aabb.clone()
  );

  const extent = aabb.max
    .clone()
    .sub(aabb.min as Vector2 & Vector3)
    .toArray();
  const splitDim = extent.indexOf(Math.max(...extent));
  const splitIndex = Math.floor(elems_.length / 2);

  select(elems_, splitIndex, {
    compare: (a, b) =>
      a.center.getComponent(splitDim) - b.center.getComponent(splitDim),
  });

  const lo = constructBVH_(elems_.slice(0, splitIndex), depth + 1);
  const hi = constructBVH_(elems_.slice(splitIndex), depth + 1);

  return {
    children: [lo, hi],
    aabb: aabb as Box2 & Box3,
    height: Math.max(lo.height, hi.height) + 1,
    depth,
  };
};

export type CollatedNode = {
  aabb: Box2 & Box3;
  left?: number;
  right?: number;
  next?: number;
};
export const collateBVH = <T>(node: BVHNode<T>) => {
  const elems: ElementOut<T>[] = [];
  const nodes: CollatedNode[] = [];

  const collate = (node: BVHNode<T>) => {
    if (node.children) {
      const data: CollatedNode = { aabb: node.aabb };
      nodes.push(data);

      if (node.children[0].element) {
        const i = elems.length;
        elems.push(node.children[0].element);
        data.left = i;
      } else {
        collate(node.children[0]);
      }

      if (node.children[1].element) {
        const i = elems.length;
        elems.push(node.children[1].element);
        data.right = i;
      } else {
        collate(node.children[1]);
        data.next = nodes.length;
      }
    }
  };

  collate(node);
  return { elems, nodes };
};
