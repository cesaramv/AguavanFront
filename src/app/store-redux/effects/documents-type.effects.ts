import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as documentsTypeActions from '../actions/documents-type.actions';
import { DocumentService } from '../../core/services/document.service';
import { of } from 'rxjs';

@Injectable()
export class DocumentsTypeEffects {

    constructor(
        private actions$: Actions,
        private documentService: DocumentService
    ) { }

    loadMovies$ = createEffect(() => this.actions$.pipe(
        ofType(documentsTypeActions.loadDocumentsType),
        mergeMap((action) => this.documentService.listar(action.filtros)
            .pipe(
                map(( datos: any ) => {
                    return documentsTypeActions.loadDocumentsTypeSuccess({
                        documentsType: datos.content,
                        totalElements : datos.totalElements,
                        number : datos.number,
                        totalPages : datos.totalPages
                    })
                }),
                catchError(err => of(documentsTypeActions.loadDocumentsTypeError({ payload: err })))
            ))
    ));
}