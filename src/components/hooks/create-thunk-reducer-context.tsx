import { State } from "@mdx-js/mdx/lib/plugin/recma-stringify";
import React, {
  useContext,
  Reducer,
  ReducerState,
  useState,
  createContext,
  PropsWithChildren,
  ReducerAction,
  useRef,
  useCallback,
  useMemo,
} from "react";

export type Thunk<State, Action> = (
  dispatch: ThunkDispatch<State, Action>,
  getState: () => State
) => any;

type ThunkDispatch<State, Action> = <R>(
  thunk: (dispatch: ThunkDispatch<State, Action>, getState: () => State) => R
) => R;

export type DispatchWithoutThunk<Action> = (action: Action) => void;

export type DispatchWithThunk<State, Action> = DispatchWithoutThunk<Action> &
  ThunkDispatch<State, Action>;

export type Dispatch<State, Action> = {
  getState: () => State;
} & DispatchWithThunk<State, Action>;

export const createThunkReducerContext = <R extends Reducer<any, any>>(
  reducer: R,
  defaultInitialState: ReducerState<R>
) => {
  type S = ReducerState<R>;
  type A = ReducerAction<R>;
  type D = Dispatch<S, A>;
  type T = Thunk<S, A>;

  const ReducerContext = createContext<[state: S, dispatch: D]>([
    defaultInitialState,
    undefined as any,
  ]);

  const Provider = ({
    children,
    initialState = defaultInitialState,
  }: PropsWithChildren<{ initialState?: S }>) => {
    const stateRef = useRef(initialState);
    const [state, setState] = useState(stateRef.current);

    const dispatch: D = useMemo(() => {
      const getState = () => stateRef.current;
      return Object.assign(
        function (actionOrThunk: A | T) {
          if (typeof actionOrThunk === "function") {
            const thunk = actionOrThunk as T;
            return thunk(dispatch, getState);
          } else {
            const action = actionOrThunk as A;
            stateRef.current = reducer(stateRef.current, action);
            setState(stateRef.current);
          }
        },
        { getState }
      );
    }, []);

    return (
      <ReducerContext.Provider value={[state, dispatch]}>
        {children}
      </ReducerContext.Provider>
    );
  };

  const useReducerContext = () => useContext(ReducerContext);
  return [useReducerContext, Provider] as const;
};
