import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as menusActions from '../actions/menus.actions';
import { MenuService } from '../../core/services/index';
import { of } from 'rxjs';

@Injectable()
export class MenusEffects {

    constructor(
        private actions$: Actions,
        private readonly menuService: MenuService,
    ) { }

    loadMenu$ = createEffect(() => this.actions$.pipe(
        ofType(menusActions.loadMenus),
        mergeMap((action) => this.menuService.listar(action.filtros)
            .pipe(
                map((datos: any) => {
                    return menusActions.loadMenusSuccess({ menus: datos })
                }),
                catchError(err => of(menusActions.loadMenusError({ payload: err })))
            ))
    ));
}