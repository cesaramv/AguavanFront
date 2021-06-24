import { Action, createReducer, on } from "@ngrx/store";
import { getUserById, getUsers } from "./form-user.actions";

export const initialState = {};

const _counterReducer  = createReducer(
    initialState,
    on(getUsers, (state) => state),
    on(getUserById, (state, props) => props.userId)
  );

  export function counterReducer(state, action) {
    return _counterReducer(state, action);
  }