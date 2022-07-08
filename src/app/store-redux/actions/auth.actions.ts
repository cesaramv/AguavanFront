import { createAction, props } from '@ngrx/store';

export const loadAuth = createAction(
    '[Component Auth] loadAuth',
    props<{ filtros: any }>()
);
export const loadAuthSuccess = createAction(
    '[Auth Component] List Auth',
    props<{ auth: any[] }>()
);
export const loadAuthError = createAction(
    '[Auth Component] Error loader Auth',
    props<{ payload: any }>()
);


export const loadRefreshAuth = createAction(
    '[Component Auth] loadRefreshAuth'
);