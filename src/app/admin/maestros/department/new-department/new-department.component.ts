import { capitalize } from './../../../../shared/util/util';
import { getDepartmentById } from './../../../../store-redux/selectors/departments.selectors';
import { AppState } from './../../../../store-redux/app.reducer';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { FormValidate } from '@shared/util/form-validate';
import { Observable } from 'rxjs';
import { DepartmentsService } from '@core/services/departments.service';
import { Store } from '@ngrx/store';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import * as actionsDepartments from '../../../../store-redux/actions/departments.actions';

@Component({
  selector: 'app-new-department',
  templateUrl: './new-department.component.html',
  styleUrls: ['./new-department.component.css']
})
export class NewDepartmentComponent extends FormValidate implements OnInit {

  esCreacion: boolean;
  departmentId: number;

  form: FormGroup;
  isForm: Promise<any>;

  constructor(
    private readonly router: Router,
    private readonly activatedRouter: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly translate: TranslateService,
    private readonly departmentsService: DepartmentsService,
    private readonly alertService: AlertService,
    private readonly store: Store<AppState>
  ) {
    super();
    this.esCreacion = true;
  }

  ngOnInit(): void {
    this.departmentId = this.activatedRouter.snapshot.params.id;
    this.esCreacion = !this.departmentId;
    if (this.esCreacion) {
      this.formInit();
    } else {
      this.store.select(getDepartmentById, this.departmentId).pipe(
        filter(department => !!department),
        tap(this.formInit.bind(this)),
      ).subscribe().unsubscribe();
      //const rowDepartment = await this.departmentsService.listarPorId(this.departmentId).toPromise();
    }
  }

  private getDepartments(departmentId: number) {
    let params = { departmentId };
    this.store.dispatch(actionsDepartments.loadDepartments({ filtros: params }));
  }

  private formInit(params?: any) {
    this.isForm = Promise.resolve(
      this.form = this.formBuilder.group({
        name: [params ? capitalize(params.name) : null, [Validators.required]]
      })
    );
  }

  private getDepartment() {
    return this.form.get('name');
  }

  actionSave() {
    const _form = this.form.getRawValue();
    const params = {
      name: _form.name
    };
    if (this.esCreacion) {
      this.saveDepartment(params);
    } else {
      this.updateDepartment(params);
    }
  }

  private saveDepartment(params: any) {
    this.departmentsService.crear(params).subscribe((resp: any) => {
      if (resp && resp.msg) {
        this.handlerAlertError('global.errorGuardar')
      } else {
        this.handlerAlertSuccess('global.guardadoExitosoMensaje')
      }
    }, err => this.handlerAlertError('global.errorGuardar'));
  }

  private updateDepartment(params: any) {
    this.departmentsService.modificar(this.departmentId, params).subscribe((resp: any) => {
      if (resp && resp.msg) {
        this.handlerAlertError('global.errorGuardar')
      } else {
        this.handlerAlertSuccess('global.actualizacionExitosaMensaje')
      }
    }, err => this.handlerAlertError('global.errorGuardar'));
  }

  private handlerAlertSuccess(message: string) {
    this.translate.get(message).subscribe(mensaje => {
      this.alertService.success(mensaje).then(() => {
        this.form.reset();
        this.router.navigate(['/admin/maestros/departamentos']);
      });
    });
  }

  private handlerAlertError(message: string) {
    this.translate.get(message).subscribe(mensaje => {
      this.alertService.error(mensaje).then(() => { });
    });
  }

  hasChanges(): Observable<boolean> | Promise<boolean> | boolean {
    return !this.isPristine(this.form) && this.form && this.form.dirty;
  }

}
