import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { TaxService } from '../../services/tax.service';
import { ListTaxesConfig } from './list-taxes.config';

@Component({
  selector: 'app-list-taxes',
  templateUrl: './list-taxes.component.html',
  styleUrls: ['./list-taxes.component.css']
})
export class ListTaxesComponent implements OnInit {

  configuracion: ListTaxesConfig = new ListTaxesConfig();

  constructor(
    private readonly router: Router,
    private readonly translate: TranslateService,
    private readonly alertService: AlertService,
    private readonly taxService: TaxService
  ) { }

  ngOnInit(): void {
    this.getDatos();
  }

  private getDatos(page = 0, size = 10, sort = 'registerDate,desc', addParams?: any) {
    let params = { page, size, sort, isPaged: true };
    if (addParams) {
      params = { ...params, ...addParams };
    }
    this.taxService.listar(params).subscribe((datos: any) => {
      this.configuracion.gridList.component.cargarDatos(
        datos.content, {
          totalElements: datos.totalElements,
          number: datos.number,
          totalPages: datos.totalPages
        }
      );
    });
  }

  clickCelda(event: any){
    if (event.tipeAccion === 'editar') {
      this.router.navigate([`/admin/maestros/impuestos/${event.row.taxId}`]);
    } else {
      this.translate.get('global.deleteRow').subscribe(mensaje => {
        this.alertService.confirm(mensaje).then(resp => {
          if (resp) {
            this.taxService.eliminar(event.row.taxId).subscribe(resp => {
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
