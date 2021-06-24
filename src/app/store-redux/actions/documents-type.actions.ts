import { createAction, props } from '@ngrx/store';

export const loadDocumentsType = createAction(
    '[Admin Documents type Component] loader documents type',
    props<{filtros: any}>());

export const loadDocumentsTypeSuccess = createAction(
    '[Admin Documents type Component] List documents type',
    props<{
        documentsType: any[],
        totalElements: number,
        number: number,
        totalPages: number
    }>()
);

export const loadDocumentsTypeError = createAction(
    '[Admin Documents type Component] Error loader documents type',
    props<{payload: any}>()
);