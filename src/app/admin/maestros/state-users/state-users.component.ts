import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { FormValidate } from '@shared/util/form-validate';
import { Observable } from 'rxjs/internal/Observable';
import { StateUserService } from '../services/state-user.service';

@Component({
  selector: 'app-state-users',
  templateUrl: './state-users.component.html',
  styleUrls: ['./state-users.component.css']
})
export class StateUsersComponent extends FormValidate implements OnInit {

  esCreacion: boolean;
  stateUserId: number;

  form: FormGroup;
  isForm: Promise<any>;
  
  constructor(
    private readonly router: Router,
    private readonly activatedRouter: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly translate: TranslateService,
    private readonly alertService: AlertService,
    private readonly stateUserService: StateUserService
  ) { 
    super();
    this.esCreacion = true;
  }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(async params => {
      this.stateUserId = params.id || null;
      if(this.stateUserId){
        this.esCreacion = false;
        const rowCategory = await this.stateUserService.listarPorId(this.stateUserId).toPromise();
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
    this.stateUserService.crear(params).subscribe(resp => {
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
    params['stateUserId'] = this.stateUserId;
      this.stateUserService.modificar(params).subscribe(resp => {
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
