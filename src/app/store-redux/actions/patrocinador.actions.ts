import { createAction, props } from '@ngrx/store';

export const loadPatrocinador = createAction(
    '[Component User] loadPatrocinadort',
    props<{filtros: any}>()
);

export const loadPatrocinadorSuccess = createAction(
    '[Component User] Patrocinador',
    props<{ patrocinador: any }>()
);

export const loadPatrocinadorError = createAction(
    '[Component User] Error loader Patrocinador',
    props<{payload: any}>()
);