import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { TranslateService } from '@ngx-translate/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store-redux/app.reducer';
import * as actionsUserStates from '../../../../store-redux/actions/user-states.actions';

import { AlertService } from '@core/services/alert.service';
import { StateUserService } from '@core/services/state-user.service';
import { ListarStateUsersConfig } from './list-state-users.config';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-list-state-users',
  templateUrl: './list-state-users.component.html',
  styleUrls: ['./list-state-users.component.css']
})
export class ListStateUsersComponent implements OnInit, OnDestroy {

  configuracion: ListarStateUsersConfig = new ListarStateUsersConfig();
  subscription: Subscription[] = [];
  pageCuerrent: number = 1;

  constructor(
    private readonly router: Router,
    private readonly translate: TranslateService,
    private readonly alertService: AlertService,
    private readonly stateUserService: StateUserService,
    private readonly store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.subscription.push(
      this.store.select('userStates').pipe(
        filter(data => !!data && !!this.configuracion.gridList.component),
        tap(this.handlerGrid.bind(this))
      ).subscribe()
    );
    this.getDatos();
  }

  private handlerGrid({ userStates, pagination }) {
    this.configuracion.gridList.component.limpliar();
    this.configuracion.gridList.component.cargarDatos(
      userStates, pagination
    );
  }

  private getDatos(page = 1, size = 10, sort = 'registerDate,desc', addParams?: any) {
    let params = { page, size, sort, isPaged: true, ...addParams };
    this.store.dispatch(actionsUserStates.loadUserStates({ filtros: params }));
  }

  clickCelda(event: any){
    if (event.tipeAccion === 'editar') {
      this.router.navigate([`/admin/maestros/estados_usuarios/${event.row.uid}`]);
    } else {
      this.translate.get('global.deleteRow').subscribe(mensaje => {
        this.alertService.confirm(mensaje).then(resp => {
          if (resp) {
            this.stateUserService.eliminar(event.row.uid).subscribe(resp => {
              this.translate.get('global.eliminadoExitosoMensaje').subscribe(menssage => { 
                this.alertService.success(menssage).then(() => {
                  this.getDatos();
                });
              });
            });
          }
        });
      });
    }
  }

  clickPaginador(event){
    this.pageCuerrent = event;
    this.getDatos(event);
  }

  ngOnDestroy(): void {
    this.subscription.forEach(x => x.unsubscribe());
  }
}
