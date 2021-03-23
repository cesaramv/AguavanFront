import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { FormValidate } from '@shared/util/form-validate';
import { Observable } from 'rxjs';
import { DepartmentsService } from '../../services/departments.service';

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
    private readonly alertService: AlertService
  ) { 
    super();
    this.esCreacion = true;
  }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(async params => {
      this.departmentId = params.id || null;
      if(this.departmentId){
        this.esCreacion = false;
        const rowDepartment = await this.departmentsService.listarPorId(this.departmentId).toPromise();
        this.formInit(rowDepartment);
      } else {
        this.esCreacion = true;
        this.formInit();
      }
    });
  }

  private formInit(params?: any){
    this.isForm = Promise.resolve(
      this.form = this.formBuilder.group({
        name: [params ? params.name : null, [Validators.required]]
      })
    );
  }

  private getDepartment() {
    return this.form.get('name');
  }

  saveDepartment() {
    const _form = this.form.getRawValue();
    const params = {
      name: _form.name
    }
    if(this.esCreacion){
      this.departmentsService.crear(params).subscribe(() => {
        this.translate.get('global.guardadoExitosoMensaje').subscribe(mensaje => {
          this.alertService.success(mensaje).then(() => {
            this.form.reset();
            this.router.navigate(['/admin/maestros/departamentos']);
          });
        });
      }, err => {
        this.translate.get('global.errorGuardar').subscribe(mensaje => {
          this.alertService.error(mensaje);
        });
      });
    } else {
      params['departmentId'] = this.departmentId;
      this.departmentsService.modificar(params).subscribe(() => {
        this.translate.get('global.actualizacionExitosaMensaje').subscribe(mensaje => {
          this.alertService.success(mensaje).then(() => {
            this.form.reset();
            this.router.navigate(['/admin/maestros/departamentos']);
          });
        });
      }, err => { 
        this.translate.get('global.errorActualizar').subscribe(mensaje => {
          this.alertService.error(mensaje);
        });
      });
    }
  }

  hasChanges(): Observable<boolean> | Promise<boolean> | boolean {
    return !this.isPristine(this.form) && this.form && this.form.dirty;
  }

}
