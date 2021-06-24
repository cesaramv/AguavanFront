import { createAction, props } from '@ngrx/store';

export const loadCitiesByDepartment = createAction(
    '[Admin Component User] loadCitiesByDepartment',
    props<{filtros: any}>()
);

export const loadCitiesByDepartmentSuccess = createAction(
    '[Cities Component User] CitiesByDepartment',
    props<{ cities: any[] }>()
);

export const loadCitiesByDepartmentError = createAction(
    '[Cities Component User] Error loader CitiesByDepartment',
    props<{payload: any}>()
);