import { filter, tap } from 'rxjs/operators';
import { AppState } from 'src/app/store-redux/app.reducer';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { FormValidate } from '@shared/util/form-validate';
import { Observable } from 'rxjs/internal/Observable';
import { CityService } from '@core/services/city.service';
import { Store } from '@ngrx/store';
import { getCityByIdSelector, getDepartmentsSelector } from './../../../../store-redux/selectors/master.selectors';
import * as actionsDepartments from '../../../../store-redux/actions/departments.actions';

@Component({
  selector: 'app-new-city',
  templateUrl: './new-city.component.html',
  styleUrls: ['./new-city.component.css']
})
export class NewCityComponent extends FormValidate implements OnInit {

  esCreacion: boolean;
  cityId: number;
  departments: any;

  form: FormGroup;
  isForm: Promise<any>;

  department$: Observable<any>;

  constructor(
    private readonly router: Router,
    private readonly activatedRouter: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly translate: TranslateService,
    private readonly alertService: AlertService,
    private readonly cityService: CityService,
    private readonly store: Store<AppState>
  ) {
    super();
    this.esCreacion = true;
    this.departments = [];
  }

  ngOnInit(): void {

    this.department$ = this.store.select(getDepartmentsSelector);
    const params = { page: 1, size: 10, isPaged: false };
    this.store.dispatch(actionsDepartments.loadDepartments({ filtros: params }));
    this.cityId = this.activatedRouter.snapshot.params.id;
    this.esCreacion = !this.cityId;
    this.formInit();
    if (!this.esCreacion) {
      this.store.select(getDepartmentsSelector).pipe(
        filter(departments => !!departments && departments.length > 0)
      ).subscribe(this.handlerGetData.bind(this))
    }
  }

  private handlerGetData(params: any) {
    this.store.select(getCityByIdSelector, this.cityId).pipe(
      filter(city => !!city),
      tap(this.preloadData.bind(this)),
    ).subscribe();
  }

  private preloadData(params: any) {
    const { _id, ...department } = params.department;
    department.uid = _id;
    this.form.patchValue(params);
    this.form.controls.department.setValue(department);
  }

  private formInit(params?: any) {
    this.isForm = Promise.resolve(
      this.form = this.formBuilder.group({
        name: [params ? params.name : null, [Validators.required]],
        specialCity: [params ? params.specialCity : false],
        department: [params ? this.selectedDepartment(params.department.departmentId) : null, [Validators.required]],
        state: [params ? params.state : true, [Validators.required]]
      })
    );
  }

  private selectedDepartment(codigo: number) {
    return this.departments.find(item => item.departmentId === codigo);
  }

  saveCategory() {
    if (this.form.invalid) {
      return;
    }
    const _form = this.form.getRawValue();
    const params = {
      name: _form.name,
      specialCity: _form.specialCity,
      department: _form.department.uid,
      state: _form.state
    }
    if (this.esCreacion) {
      this.createItem(params);
    } else {
      this.updateItem(params);
    }
  }

  private createItem(params: any) {
    this.cityService.crear(params).subscribe((resp: any) => {
      if (resp && resp.msg) {
        this.handlerAlertError('global.errorGuardar')
      } else {
        this.handlerAlertSuccess('global.guardadoExitosoMensaje')
      }
    }, err => this.handlerAlertError('global.errorGuardar'));
  }

  private updateItem(params: any) {
    this.cityService.modificar(this.cityId, params).subscribe((resp: any) => {
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
        this.router.navigate(['/admin/maestros/ciudades']);
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
