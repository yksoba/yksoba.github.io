import { produce, enableMapSet } from "immer";
import React, { useMemo } from "react";
import { createReducerContext } from "react-use";

enableMapSet();

export type Methods<State> = {
  [type: string]: (state: State, ...args: any) => void;
};

type Action<Methods> = {
  [K in keyof Methods]: {
    type: K;
    payload: Methods[K] extends (state: any, ...args: [...infer Args]) => any
      ? Args
      : any;
  };
}[keyof Methods];

export type DispatchMethods<Methods> = React.Dispatch<Action<Methods>> & {
  [K in keyof Methods]: (
    ...args: Methods[K] extends (state: any, ...args: [...infer Args]) => any
      ? Args
      : any
  ) => void;
};

export const createImmerMethodsContext = <S, M extends Methods<S>>(
  methods: M,
  initialState: S
) => {
  type A = Action<M>;
  const reducer = produce((state: S, action: A) =>
    methods[action.type](state, ...action.payload)
  );

  const [useReducerContext, Provider] = createReducerContext(
    reducer as (state: S, action: A) => S,
    initialState
  );

  const useMethodsContext = () => {
    const [state, dispatch] = useReducerContext();

    const dispatchMethods = useMemo(
      () =>
        new Proxy(dispatch, {
          get(target, p, receiver) {
            if (typeof p === "string" && p in methods) {
              return (...payload: any) => target({ type: p, payload });
            }
            return Reflect.get(target, p, receiver);
          },
          has(target, p) {
            return Reflect.has(target, p) || p in methods;
          },
        }),
      [dispatch, methods]
    ) as DispatchMethods<M>;

    return [state, dispatchMethods] as const;
  };

  return [useMethodsContext, Provider] as const;
};
