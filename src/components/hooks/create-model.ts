import { produce, enableMapSet } from "immer";
import { useMemo } from "react";
import {
  createThunkReducerContext,
  DispatchWithoutThunk,
  DispatchWithThunk,
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

export type Thunk<Model> = (dispatch: Model) => any;

export type Dispatchers<Methods, Model> = {
  [type: string]: (...args: any) => Thunk<Model> | Action<Methods>;
};

type ThunkDispatch<State, Methods, Accessors, Dispatchers> = <R>(
  thunk: (
    dispatch: Model<State, Methods, Accessors, Dispatchers>,
    getState: () => State
  ) => R
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
    ...args: Dispatchers[K] extends (...args: [...infer Args]) => any
      ? Args
      : any
  ) => Dispatchers[K] extends (...args: any) => infer ThunkOrAction
    ? ThunkOrAction extends (...args: any) => infer Retval
      ? Retval
      : void
    : any;
};

export type Model<State, Methods, Accessors, Dispatchers> = State &
  DispatchWithoutThunk<Action<Methods>> &
  ThunkDispatch<State, Methods, Accessors, Dispatchers> &
  MethodsDispatch<Methods> &
  AccessorsDispatch<Accessors> &
  DispatchersDispatch<Dispatchers>;

export const createModel = <
  S extends object,
  M extends Methods<S>,
  A extends Accessors<S>,
  D extends Dispatchers<M, Model<S, M, A, D>>
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

  const makeProxyFactory = (dispatch: DispatchWithThunk<S, AA>) => {
    const proxiedThunkDispatch = (thunk: T) => {
      return dispatch((_, getState) => thunk(makeProxy(getState())));
    };
    const proxiedDispatch = (actionOrThunk: AA | T) =>
      typeof actionOrThunk === "function"
        ? proxiedThunkDispatch(actionOrThunk)
        : dispatch(actionOrThunk);

    const proxyHandler: ProxyHandler<S> = {
      get(target, p, receiver) {
        if (typeof p === "string") {
          if (p in methods)
            return (...payload: any) => dispatch({ type: p, payload });
          if (p in accessors)
            return (...args: any) => accessors[p](target, ...args);
          if (p in dispatchers)
            return (...args: any) => {
              const actionOrThunk = dispatchers[p](...args);
              return proxiedDispatch(actionOrThunk);
            };
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
      apply(target, thisArg, [actionOrThunk]) {
        return proxiedDispatch(actionOrThunk);
      },
    };

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
