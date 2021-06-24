import { createAction, props } from '@ngrx/store';

export const loadDepartments = createAction(
    '[Admin Departments Component] loader departmets',
    props<{filtros: any}>());

export const loadDepartmentsSuccess = createAction(
    '[Admin Departments Component] List departments',
    props<{
        departments: any[],
        totalElements: number,
        number: number,
        totalPages: number
    }>()
);

export const loadDepartmentsError = createAction(
    '[Admin Departments Component] Error loader departments',
    props<{payload: any}>()
);