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
                map((datos: any) => {
                    return documentsTypeActions.loadDocumentsTypeSuccess({
                        documentsType: datos.content.map(x => ({ ...x, _state: x.state ? 'Si' : 'No' })),
                        pagination: {
                            hasNextPage: datos.hasNextPage,
                            hasPrevPage: datos.hasPrevPage,
                            next: datos.next,
                            page: datos.page,
                            pagingCounter: datos.pagingCounter,
                            prev: datos.prev,
                            totalElements: datos.totalElements,
                            totalPages: datos.totalPages,
                        },
                    })
                }),
                catchError(err => of(documentsTypeActions.loadDocumentsTypeError({ payload: err })))
            ))
    ));
}