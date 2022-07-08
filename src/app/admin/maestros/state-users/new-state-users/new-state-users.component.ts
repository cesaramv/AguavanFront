import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { TranslateService } from '@ngx-translate/core';
import { FormValidate } from '@shared/util/form-validate';

import { Store } from '@ngrx/store';
import { AppState } from './../../../../store-redux/app.reducer';
import { getUserStateByIdSelector } from './../../../../store-redux/selectors/master.selectors';

import { StateUserService } from '@core/services/state-user.service';
import { AlertService } from '@core/services/alert.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-new-state-users',
  templateUrl: './new-state-users.component.html',
  styleUrls: ['./new-state-users.component.css']
})
export class NewStateUsersComponent extends FormValidate implements OnInit {

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
    private readonly stateUserService: StateUserService,
    private readonly store: Store<AppState>
  ) {
    super();
    this.esCreacion = true;
  }

  ngOnInit(): void {
    this.stateUserId = this.activatedRouter.snapshot.params.id;
    this.esCreacion = !this.stateUserId;
    this.formInit();
    if (!this.esCreacion) {
      this.store.select(getUserStateByIdSelector, this.stateUserId).pipe(
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

  saveStateUser() {
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
    this.stateUserService.crear(params).subscribe(resp => {
      this.translate.get('global.guardadoExitosoMensaje').subscribe(mensaje => {
        this.alertService.success(mensaje).then(() => {
          this.form.reset();
          this.router.navigate(['/admin/maestros/estados_usuarios']);
        });
      });
    }, err => {
      this.translate.get('global.errorGuardar').subscribe(mensaje => {
        this.alertService.error(mensaje);
      });
    });
  }

  private updateItem(params: any) {
    this.stateUserService.modificar(this.stateUserId, params).subscribe(resp => {
      this.translate.get('global.actualizacionExitosaMensaje').subscribe(mensaje => {
        this.alertService.success(mensaje).then(() => {
          this.form.reset();
          this.router.navigate(['/admin/maestros/estados_usuarios']);
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
