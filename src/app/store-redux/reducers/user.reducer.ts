import { createReducer, on } from '@ngrx/store';
import { loadUser, loadUserSuccess, loadUserError } from '../actions';

export interface UserState {
    user: any,
    /* documentsType: any,
    departments: any,
    //cities        : any,
    statesUsers: any, */
    loaded: boolean,
    loading: boolean,
    error: any
}

export const userInitialState: UserState = {
    user: null,
    /* documentsType: null,
    departments: null,
    //cities         : null,
    statesUsers: null, */
    loaded: false,
    loading: false,
    error: null
}

const _userReducer = createReducer(userInitialState,

    on(loadUser, (state, { userId }) => ({ ...state, loading: true, userId })),

    on(loadUserSuccess, (state, { user }) => ({ //, documentsType, departments, statesUsers
        ...state,
        loading: false,
        loaded: true,
        user: { ...user },
        /* documentsType,
        departments,
        //cities,
        statesUsers */
    })),

    on(loadUserError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload
    })),
);

export function userReducer(state, action) {
    return _userReducer(state, action);
}