import { getDocumentByIdSelector } from './../../../../store-redux/selectors/master.selectors';
import { AppState } from 'src/app/store-redux/app.reducer';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { FormValidate } from '@shared/util/form-validate';
import { Observable } from 'rxjs/internal/Observable';
import { DocumentService } from '@core/services/document.service';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-new-documets',
  templateUrl: './new-documets.component.html',
  styleUrls: ['./new-documets.component.css']
})
export class NewDocumetsComponent extends FormValidate implements OnInit {

  esCreacion: boolean;
  documentId: number;

  form: FormGroup;
  isForm: Promise<any>;

  constructor(
    private readonly router: Router,
    private readonly activatedRouter: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly translate: TranslateService,
    private readonly alertService: AlertService,
    private readonly documentService: DocumentService,
    private readonly store: Store<AppState>
  ) {
    super();
    this.esCreacion = true;
  }

  ngOnInit(): void {
    this.documentId = this.activatedRouter.snapshot.params.id;
    this.esCreacion = !this.documentId;
    this.formInit();
    if (!this.esCreacion) {
      this.store.select(getDocumentByIdSelector, this.documentId).pipe(
        filter(documentsType => !!documentsType)
      ).subscribe(this.preloadData.bind(this))
    }
  }

  private preloadData(params: any) {
    this.form.patchValue(params);
  }

  private formInit(params?: any) {
    this.isForm = Promise.resolve(
      this.form = this.formBuilder.group({
        name: [params ? params.name : null, [Validators.required]],
        state: [params ? params.state : true, [Validators.required]]
      })
    );
  }

  saveDocument() {
    if (this.form.invalid) {
      return;
    }
    if (this.esCreacion) {
      this.createItem(this.form.value);
    } else {
      this.updateItem(this.form.value);
    }
  }

  private createItem(params: any) {
    this.documentService.crear(params).subscribe(resp => {
      this.translate.get('global.guardadoExitosoMensaje').subscribe(mensaje => {
        this.alertService.success(mensaje).then(() => {
          this.form.reset();
          this.router.navigate(['/admin/maestros/documentos']);
        });
      });
    }, err => {
      this.translate.get('global.errorGuardar').subscribe(mensaje => {
        this.alertService.error(mensaje);
      });
    });
  }

  private updateItem(params: any) {
    this.documentService.modificar(this.documentId, params).subscribe(resp => {
      this.translate.get('global.actualizacionExitosaMensaje').subscribe(mensaje => {
        this.alertService.success(mensaje).then(() => {
          this.form.reset();
          this.router.navigate(['/admin/maestros/documentos']);
        });
      });
    }, err => {
      this.translate.get('global.errorActualizar').subscribe(mensaje => {
        this.alertService.error(mensaje);
      });
    });
  }

  hasChanges(): Observable<boolean> | Promise<boolean> | boolean {
    return !this.isPristine(this.form) && this.form && this.form.dirty;
  }

}
