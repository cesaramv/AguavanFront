import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { CategoryService } from '../../services/category.service';
import { ListCategoriesProductsConfig } from './list-categories-products.config';

@Component({
  selector: 'app-list-categories-products',
  templateUrl: './list-categories-products.component.html',
  styleUrls: ['./list-categories-products.component.css']
})
export class ListCategoriesProductsComponent implements OnInit {

  configuracion: ListCategoriesProductsConfig = new ListCategoriesProductsConfig();

  constructor(
    private readonly categoryService: CategoryService,
    private readonly router: Router,
    private readonly alertService: AlertService
    ) { }

  ngOnInit(): void {
    this.getDatos();
  }

  private getDatos(page = 0, size = 10, addParams?: any) {
    let params = { page, size };
    if (addParams) {
      params = { ...params, ...addParams };
    }
    this.categoryService.listar(params).subscribe((datos: any) => {
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
    if(event.tipeAccion === 'editar'){
      this.router.navigate([`/admin/maestros/categorias_productos/${event.row.categoryId}`]);
    } else {
      this.alertService.confirm('global.deleteRow').then(resp =>{
        if(resp){
          this.categoryService.eliminar(event.row.categoryId).subscribe(resp => {
            this.alertService.success('global.eliminadoExitosoMensaje').then(() => {
              this.getDatos();
            });
          });
        }
      });
    }
  }

  clickPaginador(event){
    this.getDatos(event);
  }

}
