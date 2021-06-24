import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { TranslateService } from '@ngx-translate/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store-redux/app.reducer';
import * as actionsDocuments from '../../../../store-redux/actions/documents-type.actions'; 

import { DocumentService } from '@core/services/document.service';
import { ListarDocumentsConfig } from './list-documents.config';

@Component({
  selector: 'app-list-documents',
  templateUrl: './list-documents.component.html',
  styleUrls: ['./list-documents.component.css']
})
export class ListDocumentsComponent implements OnInit {

  configuracion: ListarDocumentsConfig = new ListarDocumentsConfig();

  constructor(
    private readonly router: Router,
    private readonly translate: TranslateService,
    private readonly alertService: AlertService,
    private readonly documentService: DocumentService,
    private readonly store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select('documentsType').subscribe((resp : any) => {
      if(this.configuracion.gridList.component){
        this.configuracion.gridList.component.limpliar();
        this.configuracion.gridList.component.cargarDatos(
          resp.documentsType, {
            totalElements: resp.totalElements,
            number: resp.number,
            totalPages: resp.totalPages
          }
        );
      }
    });
    this.getDatos();
  }

  private getDatos(page = 0, size = 10, sort = 'registerDate,desc', addParams?: any) {
    let params = { page, size, sort, isPaged: true, ...addParams };

    this.store.dispatch(actionsDocuments.loadDocumentsType({filtros: params}));
    /* this.documentService.listar(params).subscribe((datos: any) => {
      this.configuracion.gridList.component.cargarDatos(
        datos.content, {
          totalElements: datos.totalElements,
          number: datos.number,
          totalPages: datos.totalPages
        }
      );
    }); */
  }

  clickCelda(event){
    if (event.tipeAccion === 'editar') {
      this.router.navigate([`/admin/maestros/documentos/${event.row.documentId}`]);
    } else {
      this.translate.get('global.deleteRow').subscribe(mensaje => {
        this.alertService.confirm(mensaje).then(resp => {
          if (resp) {
            this.documentService.eliminar(event.row.documentId).subscribe(resp => {
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
