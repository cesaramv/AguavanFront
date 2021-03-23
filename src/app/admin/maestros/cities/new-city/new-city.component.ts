import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { FormValidate } from '@shared/util/form-validate';
import { Observable } from 'rxjs/internal/Observable';
import { CityService } from '../../services/city.service';
import { DepartmentsService } from '../../services/departments.service';

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
  
  constructor(
    private readonly router: Router,
    private readonly activatedRouter: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly translate: TranslateService,
    private readonly alertService: AlertService,
    private readonly cityService: CityService,
    private readonly departmentService: DepartmentsService
  ) {
    super();
    this.esCreacion = true;
    this.departments = [];
   }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params => {
      this.cityId = params.id || null;

      this.departmentService.listar({isPaged: true, size:1000000}).subscribe(async (resp: any) => {
        //this.setDepartmet(resp.content);
        this.departments = resp.content;
        if(this.cityId){
          this.esCreacion = false;
          const rowCity = await this.cityService.listarPorId(this.cityId).toPromise();
          this.formInit(rowCity);
        } else {
          this.esCreacion = true;
          this.formInit();
        }
      });
    });
  }

  private formInit(params?: any){
    this.isForm = Promise.resolve(
      this.form = this.formBuilder.group({
        name: [params ? params.name : null, [Validators.required]],
        specialCity: [params ? params.specialCity : false],
        department: [params ? this.selectedDepartment(params.department.departmentId) : null, [Validators.required]],
        state: [params ? params.state : true, [Validators.required]]
      })
    );
  }

  private selectedDepartment(codigo: number){
    return this.departments.find(item => item.departmentId === codigo);
  }

  saveCategory() {
    if(this.form.invalid){
      return;
    }
    const _form = this.form.getRawValue();
    const params = {
      name: _form.name,
      specialCity: _form.specialCity,
      department: _form.department,
      state: _form.state
    }
    if(this.esCreacion){
      this.createItem(params);
    } else {
      this.updateItem(params);
    }
  }

  private createItem(params: any){
    this.cityService.crear(params).subscribe(resp => {
      this.translate.get('global.guardadoExitosoMensaje').subscribe(mensaje => {
        this.alertService.success(mensaje).then(() => {
          this.form.reset();
          this.router.navigate(['/admin/maestros/ciudades']);
        });
      });
    }, err => {
      this.translate.get('global.errorGuardar').subscribe(mensaje => {
        this.alertService.error(mensaje);
      });
    });
  }

  private updateItem(params: any){
    params['cityId'] = this.cityId;
      this.cityService.modificar(params).subscribe(resp => {
        this.translate.get('global.actualizacionExitosaMensaje').subscribe(mensaje => { 
          this.alertService.success(mensaje).then(() => {
            this.form.reset();
            this.router.navigate(['/admin/maestros/ciudades']);
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
