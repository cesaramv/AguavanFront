import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { CityService } from '@core/services/city.service';
import { ListCitiesConfig } from './list-cities.config';

@Component({
  selector: 'app-list-cities',
  templateUrl: './list-cities.component.html',
  styleUrls: ['./list-cities.component.css']
})
export class ListCitiesComponent implements OnInit {

  listCiudades: any;
  configuracion: ListCitiesConfig = new ListCitiesConfig();

  constructor(
    private readonly cityService: CityService,
    private readonly router: Router,
    private readonly alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  private getData(page = 0, size = 10, sort = 'registerDate,desc', addParams?: any) {
    let params = { page, size, sort, isPaged: true };
    if (addParams) {
      params = { ...params, ...addParams };
    }
    this.cityService.listar(params).subscribe((datos: any) => {
      this.listCiudades = datos.content.map(x => { return {...x, _specialCity: x.specialCity? 'Si': 'No'}} );
      this.configuracion.gridList.component.cargarDatos(
        this.listCiudades, {
          totalElements: datos.totalElements,
          number: datos.number,
          totalPages: datos.totalPages
        }
      );
    });
  }

  clickCelda(event){
    if(event.tipeAccion === 'editar'){
      this.router.navigate([`/admin/maestros/ciudades/${event.row.cityId}`]);
    } else {
      this.alertService.confirm('global.deleteRow').then(resp =>{
        if(resp){
          this.cityService.eliminar(event.row.cityId).subscribe(resp => {
            this.alertService.success('global.eliminadoExitosoMensaje').then(() => {
              this.getData();
            });
          });
        }
      });
    }
  }

  clickPaginador(event){
    this.getData(event);
  }

}
