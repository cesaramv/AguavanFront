import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { StateOrderService } from '../../services/state-order.service';
import { ListStateOrdersConfig } from './list-state-orders.config'

@Component({
  selector: 'app-list-state-ordes',
  templateUrl: './list-state-ordes.component.html',
  styleUrls: ['./list-state-ordes.component.css']
})
export class ListStateOrdesComponent implements OnInit {

  configuracion: ListStateOrdersConfig = new ListStateOrdersConfig();

  constructor(
    private readonly router: Router,
    private readonly translate: TranslateService,
    private readonly alertService: AlertService,
    private readonly stateOrderService: StateOrderService
  ) { }

  ngOnInit(): void {
    this.getDatos();
  }

  private getDatos(page = 0, size = 10, sort = 'registerDate,desc', addParams?: any) {
    let params = { page, size, sort, isPaged: true };
    if (addParams) {
      params = { ...params, ...addParams };
    }
    this.stateOrderService.listar(params).subscribe((datos: any) => {
      this.configuracion.gridList.component.cargarDatos(
        datos.content, {
          totalElements: datos.totalElements,
          number: datos.number,
          totalPages: datos.totalPages
        }
      );
    });
  }

  clickCelda(event){
    if (event.tipeAccion === 'editar') {
      this.router.navigate([`/admin/maestros/estados_ordenes/${event.row.stateOrderId}`]);
    } else {
      this.translate.get('global.deleteRow').subscribe(mensaje => {
        this.alertService.confirm(mensaje).then(resp => {
          if (resp) {
            this.stateOrderService.eliminar(event.row.stateOrderId).subscribe(resp => {
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
    this.getDatos(event);
  }

}
