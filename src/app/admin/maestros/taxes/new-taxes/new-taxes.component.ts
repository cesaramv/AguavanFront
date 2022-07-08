import { percentageToDecimal, decimaltoPercentage } from './../../../../shared/util/util';
import { getTaxByIdSelector } from './../../../../store-redux/selectors/master.selectors';
import { AppState } from './../../../../store-redux/app.reducer';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { FormValidate } from '@shared/util/form-validate';
import { Observable } from 'rxjs/internal/Observable';
import { filter } from 'rxjs/operators';
import { TaxService } from '../../../../core/services/tax.service';

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
    private readonly taxService: TaxService,
    private readonly store: Store<AppState>
  ) {
    super();
    this.esCreacion = true;
  }

  ngOnInit(): void {
    this.taxId = this.activatedRouter.snapshot.params.id;
    this.esCreacion = !this.taxId;
    this.formInit();
    if (!this.esCreacion) {
      this.store.select(getTaxByIdSelector, this.taxId).pipe(
        filter(documentsType => !!documentsType)
      ).subscribe(this.preloadData.bind(this))
    }
  }

  private preloadData(params: any) {
    this.form.patchValue(params);
    this.form.controls.iva.setValue(decimaltoPercentage(params.iva, 0));
  }

  private formInit(params?: any) {
    this.isForm = Promise.resolve(
      this.form = this.formBuilder.group({
        name: [params ? params.name : null, [Validators.required]],
        iva: [params ? params.iva : null, [Validators.required]],
        state: [params ? params.state : true, [Validators.required]]
      })
    );
  }

  private getDescription() {
    return this.form.get('description').value;
  }

  saveTaxe() {
    if (this.form.invalid) {
      return;
    }
    const {iva, ...params} = this.form.value;
    params.iva = percentageToDecimal(parseFloat(iva), 2)
    if (this.esCreacion) {
      this.createItem(params);
    } else {
      this.updateItem(params);
    }
  }

  private createItem(params: any) {
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

  private updateItem(params: any) {
    this.taxService.modificar(this.taxId, params).subscribe(resp => {
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
