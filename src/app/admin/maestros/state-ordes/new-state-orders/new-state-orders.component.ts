import { getOrderStateByIdSelector } from './../../../../store-redux/selectors/master.selectors';
import { AppState } from './../../../../store-redux/app.reducer';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { FormValidate } from '@shared/util/form-validate';
import { Observable } from 'rxjs/internal/Observable';
import { OrderStateService } from '../../../../core/services';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-new-state-orders',
  templateUrl: './new-state-orders.component.html',
  styleUrls: ['./new-state-orders.component.css']
})
export class NewStateOrdersComponent extends FormValidate implements OnInit {

  esCreacion: boolean;
  stateOrderId: number;

  form: FormGroup;
  isForm: Promise<any>;

  constructor(
    private readonly router: Router,
    private readonly activatedRouter: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly translate: TranslateService,
    private readonly alertService: AlertService,
    private readonly stateOrderService: OrderStateService,
    private readonly store: Store<AppState>
  ) {
    super();
    this.esCreacion = true;
  }

  ngOnInit(): void {
    this.stateOrderId = this.activatedRouter.snapshot.params.id;
    this.esCreacion = !this.stateOrderId;
    this.formInit();
    if (!this.esCreacion) {
      this.store.select(getOrderStateByIdSelector, this.stateOrderId).pipe(
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

  private getName() {
    return this.form.get('name').value;
  }

  saveStateOrders() {
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
    this.stateOrderService.crear(params).subscribe(resp => {
      this.translate.get('global.guardadoExitosoMensaje').subscribe(mensaje => {
        this.alertService.success(mensaje).then(() => {
          this.form.reset();
          this.router.navigate(['/admin/maestros/estados_ordenes']);
        });
      });
    }, err => {
      this.translate.get('global.errorGuardar').subscribe(mensaje => {
        this.alertService.error(mensaje);
      });
    });
  }

  private updateItem(params: any) {
    this.stateOrderService.modificar(this.stateOrderId, params).subscribe(resp => {
      this.translate.get('global.actualizacionExitosaMensaje').subscribe(mensaje => {
        this.alertService.success(mensaje).then(() => {
          this.form.reset();
          this.router.navigate(['/admin/maestros/estados_ordenes']);
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
