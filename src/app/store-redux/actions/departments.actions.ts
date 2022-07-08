import { pagination } from './../models/pagination';
import { createAction, props } from '@ngrx/store';

export const loadDepartments = createAction(
    '[Admin Departments Component] loader departmets',
    props<{filtros: any}>());

export const loadDepartmentsSuccess = createAction(
    '[Admin Departments Component] List departments',
    props<{
        departments: any[],
        pagination: pagination
    }>()
);

export const loadDepartmentsError = createAction(
    '[Admin Departments Component] Error loader departments',
    props<{payload: any}>()
);

export const deleteDepartment = createAction(
    '[Admin Departments Component] Code a delete department',
    props<{code: string}>()
);

export const deleteDepartmentSuccess = createAction(
    '[Admin Departments Component] Deleted department',
    props<{ code: string }>()
);

export const deleteDepartmentError = createAction(
    '[Admin Departments Component] Error delete department',
    props<{ error: any }>()
);