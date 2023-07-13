import { produce, enableMapSet } from "immer";
import { useMemo } from "react";
import {
  createThunkReducerContext,
  Dispatch,
} from "./create-thunk-reducer-context";

enableMapSet();

export type Accessors<State> = {
  [type: string]: (state: State, ...args: any) => any;
};

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

export type Thunk<Model> = (model: Model) => any;

export type Dispatchers<Model> = {
  [type: string]: (model: Model, ...args: any) => any;
};

type ThunkDispatch<State, Methods, Accessors, Dispatchers> = <R>(
  thunk: (model: Model<State, Methods, Accessors, Dispatchers>) => R
) => R;

type MethodsDispatch<Methods> = {
  [K in keyof Methods]: (
    ...args: Methods[K] extends (state: any, ...args: [...infer Args]) => any
      ? Args
      : any
  ) => void;
};

type AccessorsDispatch<Accessors> = {
  [K in keyof Accessors]: (
    ...args: Accessors[K] extends (state: any, ...args: [...infer Args]) => any
      ? Args
      : any
  ) => Accessors[K] extends (state: any, ...args: any) => infer Retval
    ? Retval
    : any;
};

type DispatchersDispatch<Dispatchers> = {
  [K in keyof Dispatchers]: (
    ...args: Dispatchers[K] extends (
      model: any,
      ...args: [...infer Args]
    ) => any
      ? Args
      : any
  ) => Dispatchers[K] extends (model: any, ...args: any) => infer Retval
    ? Retval
    : any;
};

export type Model<State, Methods, Accessors, Dispatchers> = State &
  ThunkDispatch<State, Methods, Accessors, Dispatchers> &
  MethodsDispatch<Methods> &
  AccessorsDispatch<Accessors> &
  DispatchersDispatch<Dispatchers>;

export const createModel = <
  S extends object,
  M extends Methods<S>,
  A extends Accessors<S>,
  D extends Dispatchers<Model<S, M, A, D>>
>(
  initialState: S,
  methods: M,
  accessors: A,
  dispatchers: D
) => {
  type AA = Action<M>;
  type MM = Model<S, M, A, D>;
  type T = Thunk<MM>;

  const reducer = produce((state: S, action: AA) =>
    methods[action.type](state, ...action.payload)
  ) as (state: S, action: AA) => S;

  const [useReducerContext, Provider] = createThunkReducerContext(
    reducer,
    initialState
  );

  const makeProxyFactory = (dispatch: Dispatch<S, AA>) => {
    const proxyHandler: ProxyHandler<S> = {
      get(target, p, receiver) {
        if (typeof p === "string") {
          if (p in methods)
            return (...payload: any) => dispatch({ type: p, payload });
          if (p in accessors)
            return (...args: any) => accessors[p](target, ...args);
          if (p in dispatchers)
            return (...args: any) =>
              proxiedDispatch((model) => dispatchers[p](model, ...args));
        }
        return Reflect.get(target, p, receiver);
      },
      has(target, p) {
        return (
          Reflect.has(target, p) ||
          p in methods ||
          p in accessors ||
          p in dispatchers
        );
      },
      apply(target, thisArg, [thunk]: [T]) {
        return proxiedDispatch(thunk);
      },
    };

    const proxiedDispatch = (thunk: T) =>
      thunk(makeProxy(makeGetStateProxy(dispatch.getState)));

    const makeProxy = (state: S) =>
      new Proxy(state, proxyHandler) as unknown as MM;

    return makeProxy;
  };

  const useModel = () => {
    const [state, dispatch] = useReducerContext();
    const makeProxy = useMemo(() => makeProxyFactory(dispatch), []);
    const model = useMemo(() => makeProxy(state), [state]);
    return model;
  };

  return [useModel, Provider] as const;
};

///////// HELPER FUNCTIONS //////////
const getStateProxyHandler: ProxyHandler<() => object> = Object.fromEntries(
  (
    [
      "apply",
      "construct",
      "defineProperty",
      "deleteProperty",
      "get",
      // "getOwnPropertyDescriptor",
      "getPrototypeOf",
      "has",
      "isExtensible",
      "ownKeys",
      "preventExtensions",
      "set",
      "setPrototypeOf",
    ] as const
  ).map(
    (name) =>
      [
        name,
        (target: () => object, ...args: any) =>
          (Reflect[name] as any)(target(), ...args),
      ] as const
  )
);

const makeGetStateProxy = <S extends object>(getState: () => S) =>
  new Proxy(getState, getStateProxyHandler) as unknown as S;
