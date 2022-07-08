import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { TranslateService } from '@ngx-translate/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store-redux/app.reducer';
import * as actionsDocuments from '../../../../store-redux/actions/documents-type.actions';

import { DocumentService } from '@core/services/document.service';
import { ListarDocumentsConfig } from './list-documents.config';
import { Subscription } from 'rxjs/internal/Subscription';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-list-documents',
  templateUrl: './list-documents.component.html',
  styleUrls: ['./list-documents.component.css']
})
export class ListDocumentsComponent implements OnInit, OnDestroy {

  configuracion: ListarDocumentsConfig = new ListarDocumentsConfig();
  subscription: Subscription[] = [];
  pageCuerrent: number = 1;

  constructor(
    private readonly router: Router,
    private readonly translate: TranslateService,
    private readonly alertService: AlertService,
    private readonly documentService: DocumentService,
    private readonly store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.subscription.push(
      this.store.select('documentsType').pipe(
        filter(data => !!data && !!this.configuracion.gridList.component),
        tap(this.handlerGrid.bind(this))
      ).subscribe()
    );
    this.getDatos();
  }

  private handlerGrid({ documentsType, pagination }) {
    this.configuracion.gridList.component.limpliar();
    this.configuracion.gridList.component.cargarDatos(
      documentsType, pagination
    );
  }

  private getDatos(page = 1, size = 10, sort = 'registerDate,desc', addParams?: any) {
    let params = { page, size, sort, isPaged: true, ...addParams };
    this.store.dispatch(actionsDocuments.loadDocumentsType({ filtros: params }));
  }

  clickCelda(event) {
    if (event.tipeAccion === 'editar') {
      this.router.navigate([`/admin/maestros/documentos/${event.row.uid}`]);
    } else {
      this.translate.get('global.deleteRow').subscribe(mensaje => {
        this.alertService.confirm(mensaje).then(resp => {
          if (resp) {
            this.documentService.eliminar(event.row.uid).subscribe(resp => {
              this.translate.get('global.eliminadoExitosoMensaje').subscribe(menssage => {
                this.alertService.success(menssage).then(() => {
                  this.getDatos(this.pageCuerrent);
                });
              });
            });
          }
        });
      });
    }
  }

  clickPaginador(event) {
    this.pageCuerrent = event;
    this.getDatos(event);
  }

  ngOnDestroy(): void {
    this.subscription.forEach(x => x.unsubscribe());
  }

}
