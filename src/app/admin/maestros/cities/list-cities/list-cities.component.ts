import { TranslateService } from '@ngx-translate/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';

import { Store } from '@ngrx/store';
import * as actionsCities from '../../../../store-redux/actions/cities.actions';
import { AppState } from './../../../../store-redux/app.reducer';

import { AlertService } from '@core/services/alert.service';
import { CityService } from '@core/services/city.service';
import { ListCitiesConfig } from './list-cities.config';

@Component({
  selector: 'app-list-cities',
  templateUrl: './list-cities.component.html',
  styleUrls: ['./list-cities.component.css']
})
export class ListCitiesComponent implements OnInit, OnDestroy {

  listCiudades: any;
  configuracion: ListCitiesConfig = new ListCitiesConfig();
  subscription: Subscription[] = [];
  pageCuerrent: number = 1;

  constructor(
    private readonly cityService: CityService,
    private readonly router: Router,
    private readonly alertService: AlertService,
    private readonly translate: TranslateService,
    private readonly store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.subscription.push(
      this.store.select('cities').pipe(
        filter(data => !!data && !!this.configuracion.gridList.component),
        tap(this.handlerGrid.bind(this))
      ).subscribe()
    );
    this.getData();
  }

  private handlerGrid({ cities, pagination }) {
    this.configuracion.gridList.component.limpliar();
    this.configuracion.gridList.component.cargarDatos(
      cities, pagination
    );
  }

  private getData(page = 1, size = 10, sort = 'registerDate,desc', addParams?: any) {
    let params = { page, size, sort, isPaged: true, ...addParams };
    this.store.dispatch(actionsCities.loadCities({ filtros: params }));
  }

  clickCelda(event) {
    if (event.tipeAccion === 'editar') {
      this.router.navigate([`/admin/maestros/ciudades/${event.row.uid}`]);
    } else {
      this.translate.get('global.deleteRow').subscribe(mensaje => {
        this.alertService.confirm(mensaje).then(resp => {
          if (resp) {
            this.cityService.eliminar(event.row.uid).subscribe(resp => {
              this.translate.get('global.eliminadoExitosoMensaje').subscribe(menssage => {
                this.alertService.success(menssage).then(() => this.getData(this.pageCuerrent));
              });
            });
          }
        });
      })
    }
  }

  clickPaginador(event) {
    this.pageCuerrent = event;
    this.getData(event);
  }

  ngOnDestroy(): void {
    this.subscription.forEach(x => x.unsubscribe());
  }

}
