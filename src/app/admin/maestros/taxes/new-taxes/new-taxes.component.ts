import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { FormValidate } from '@shared/util/form-validate';
import { Observable } from 'rxjs/internal/Observable';
import { TaxService } from '../../services/tax.service';

@Component({
  selector: 'app-new-taxes',
  templateUrl: './new-taxes.component.html',
  styleUrls: ['./new-taxes.component.css']
})
export class NewTaxesComponent extends FormValidate implements OnInit {

  esCreacion: boolean;
  taxId: number;

  form: FormGroup;
  isForm: Promise<any>;
  
  constructor(
    private readonly router: Router,
    private readonly activatedRouter: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly translate: TranslateService,
    private readonly alertService: AlertService,
    private readonly taxService: TaxService
  ) { 
    super();
    this.esCreacion = true;
  }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(async params => {
      this.taxId = params.id || null;
      if(this.taxId){
        this.esCreacion = false;
        const rowCategory = await this.taxService.listarPorId(this.taxId).toPromise();
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
        description: [params ? params.description : null, [Validators.required]],
        rate: [params ? params.rate : null, [Validators.required]],
        ratePublic: [params ? params.ratePublic : null, [Validators.required]],
        state: [params ? params.state : true, [Validators.required]]
      })
    );
  }

  private getDescription() {
    return this.form.get('description').value;
  }

  saveTaxe() {
    if(this.form.invalid){
      return;
    }
    const _form = this.form.getRawValue();
    const params = {
      description: this.getDescription(),
      rate: _form.rate,
      ratePublic: _form.ratePublic,
      state: _form.state
    }
    if(this.esCreacion){
      this.createItem(params);
    } else {
      this.updateItem(params);
    }
  }

  private createItem(params: any){
    this.taxService.crear(params).subscribe(resp => {
      this.translate.get('global.guardadoExitosoMensaje').subscribe(mensaje => {
        this.alertService.success(mensaje).then(() => {
          this.form.reset();
          this.router.navigate(['/admin/maestros/impuestos']);
        });
      });
    }, err => {
      this.translate.get('global.errorGuardar').subscribe(mensaje => {
        this.alertService.error(mensaje);
      });
    });
  }

  private updateItem(params: any){
    params['taxId'] = this.taxId;
      this.taxService.modificar(params).subscribe(resp => {
        this.translate.get('global.actualizacionExitosaMensaje').subscribe(mensaje => {
          this.alertService.success(mensaje).then(() => {
            this.form.reset();
            this.router.navigate(['/admin/maestros/impuestos']);
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
