import { createAction, props } from '@ngrx/store';
import { pagination } from '../models/pagination';

export const loadDocumentsType = createAction(
    '[Admin Documents type Component] loader documents type',
    props<{filtros: any}>());

export const loadDocumentsTypeSuccess = createAction(
    '[Admin Documents type Component] List documents type',
    props<{
        documentsType: any[],
        pagination: pagination
    }>()
);

export const loadDocumentsTypeError = createAction(
    '[Admin Documents type Component] Error loader documents type',
    props<{payload: any}>()
);