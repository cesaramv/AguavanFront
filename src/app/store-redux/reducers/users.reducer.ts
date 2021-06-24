import { createReducer, on } from '@ngrx/store';
import { loadUsers, loadUsersSuccess, loadUsersError } from '../actions';

export interface UsersState {
    users        : any[],
    loaded       : boolean,
    loading      : boolean,
    error        : any,
    filtros      : any
    totalElements: number,
    number       : number,
    totalPages   : number
}

export const usersInitialState: UsersState = {
    users         : [],
    loaded        : false,
    loading       : false,
    error         : null,
    filtros       : null,
    totalElements : 0,
    number        : 0,
    totalPages    : 0
}

const _usersReducer = createReducer(usersInitialState,

    on(loadUsers, ( state, { filtros }) => ({ ...state, loading: true, filtros })),

    on(loadUsersSuccess, (state, { users, totalElements, number, totalPages }) => ({ 
        ...state, 
        loading : false,
        loaded  : true,
        users   : [ ...users ],
        totalElements,
        number,
        totalPages
    })),

    on(loadUsersError, (state, { payload }) => ({ 
        ...state, 
        loading : false,
        loaded  : false,
        error   : payload
    })),
);

export function usersReducer(state, action) {
    return _usersReducer(state, action);
}