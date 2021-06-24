import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { FormValidate } from '@shared/util/form-validate';
import { Observable } from 'rxjs/internal/Observable';
import { DocumentService } from '@core/services/document.service';

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
    private readonly documentService: DocumentService
  ) { 
    super();
    this.esCreacion = true;
  }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(async params => {
      this.documentId = params.id || null;
      if(this.documentId){
        this.esCreacion = false;
        const rowCategory = await this.documentService.listarPorId(this.documentId).toPromise();
        this.formInit(rowCategory);
      } else {
        this.esCreacion = true;
        this.formInit();
      }
    });
  }

  private formInit(params?: any){
    this.isForm = Promise.resolve(
      this.form = this.formBuilder.group({
        name: [params ? params.name : null, [Validators.required]],
        state: [params ? params.state : true, [Validators.required]]
      })
    );
  }

  private getNameDocument() {
    return this.form.get('name').value;
  }

  saveDocument() {
    if(this.form.invalid){
      return;
    }
    const _form = this.form.getRawValue();
    const params = {
      name: this.getNameDocument(),
      state: _form.state
    }
    if(this.esCreacion){
      this.createItem(params);
    } else {
      this.updateItem(params);
    }
  }

  private createItem(params: any){
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

  private updateItem(params: any){
    params['documentId'] = this.documentId;
      this.documentService.modificar(params).subscribe(resp => {
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
