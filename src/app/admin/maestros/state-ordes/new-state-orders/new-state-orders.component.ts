import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { FormValidate } from '@shared/util/form-validate';
import { Observable } from 'rxjs/internal/Observable';
import { StateOrderService } from '../../services/state-order.service';

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
    private readonly stateOrderService: StateOrderService
  ) { 
    super();
    this.esCreacion = true;
  }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(async params => {
      this.stateOrderId = params.id || null;
      if(this.stateOrderId){
        this.esCreacion = false;
        const rowCategory = await this.stateOrderService.listarPorId(this.stateOrderId).toPromise();
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

  private getName() {
    return this.form.get('name').value;
  }

  saveStateOrders() {
    if(this.form.invalid){
      return;
    }
    const _form = this.form.getRawValue();
    const params = {
      name: this.getName(),
      state: _form.state
    }
    if(this.esCreacion){
      this.createItem(params);
    } else {
      this.updateItem(params);
    }
  }

  private createItem(params: any){
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

  private updateItem(params: any){
    params['stateOrderId'] = this.stateOrderId;
      this.stateOrderService.modificar(params).subscribe(resp => {
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
