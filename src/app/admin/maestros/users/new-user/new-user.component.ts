import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { FormValidate } from '@shared/util/form-validate';
import { Observable } from 'rxjs/internal/Observable';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { UsersService } from 'src/app/admin/services/users.service';
import { ProductoService } from 'src/app/services/producto.service';
import { CityService } from '../../services/city.service';
import { DepartmentsService } from '../../services/departments.service';
import { DocumentService } from '../../services/document.service';
import { StateUserService } from '../../services/state-user.service';
import { DateUtil } from '@shared/util/date.util';
import { ES } from '@shared/util/constantes/generales';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent extends FormValidate implements OnInit {

  esCreacion: boolean;
  userId: number;
  itemUser: any;
  documents: any;
  departments: any;
  cities: any;
  statesUsers: any;

  form: FormGroup;
  isForm: Promise<any>;

  patrocinador: any;
  bloquear: boolean;

  es = ES;

  constructor(
    private readonly router: Router,
    private readonly activatedRouter: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly translate: TranslateService,
    private readonly alertService: AlertService,
    private readonly userService: UsersService,
    private readonly documentService: DocumentService,
    private readonly departmentService: DepartmentsService,
    private readonly cityService: CityService,
    private readonly stateUserService: StateUserService
  ) {
    super();
    this.esCreacion = true;
    this.documents = [];
    this.departments = [];
    this.cities = [];
    this.statesUsers = [];
  }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params => {
      this.userId = params.id || null;
      this.esCreacion = this.userId && false;
      forkJoin({
        _documents: this.documentService.listar({state: true}),
        _departments: this.departmentService.listar({state: true}),
        _cities: this.cityService.listar({state: true}),
        _statesUsers: this.stateUserService.listar({state: true}),
      }).subscribe(async (resp: any) => {
        this.documents = resp._documents.content;
        this.departments = resp._departments.content;
        this.cities = resp._cities.content;
        this.statesUsers = resp._statesUsers.content;
        if (this.userId) {
          this.itemUser = await this.userService.listarPorId(this.userId).toPromise();
          this.formInit(this.itemUser);
        } else {
          this.formInit();
        }
      });
    });
  }

  private formInit(params?: any) {
    this.isForm = Promise.resolve(
      this.form = this.formBuilder.group({
        firstName: [params ? params.firstName : null, [Validators.required]],
        lastName: [params ? params.lastName : null, [Validators.required]],
        document: [params ? this.selectedDocument(params.document.documentId) : null, [Validators.required]],
        documentoNumber: [params ? params.documentoNumber : null, [Validators.required]],
        birthDate: [params ? this.birthDateSelected(params.birthDate) : null, [Validators.required]],
        phoneCell: [params ? params.phoneCell : null, [Validators.required]],
        phone: [params ? params.phone : 0],
        address: [params ? params.address : null, [Validators.required]],
        department: [params ? this.selectedDepartment(params.city.department.departmentId) : null, [Validators.required]],
        city: [params ? this.selectedCity(params.city.cityId) : null, [Validators.required]],
        email: [params ? params.email : null, [Validators.required]],
        stateUser: [params ? this.selectedCity(params.stateUser.stateUserId) : null, [Validators.required]],
        password: [params ? params.password : null, [Validators.required]],
        rut: [params ? params.rut : null],
        levelOneId: [params ? params.levelOneId : null, [Validators.required]],
        contract: [params ? params.contract : true, [Validators.required]]
      })
    );

    if(!this.esCreacion){
      this.bloquear = true;
      this.form.controls.levelOneId.disable();
      this.getPatrocinador();
    }
  }

  private selectedDocument(codigo: number) {
    return this.documents.find(x => x.documentId === codigo);
  }

  private selectedDepartment(codigo: number) {
    return this.departments.find(x => x.departmentId === codigo);
  }

  private selectedCity(codigo: number) {
    return this.cities.find(x => x.cityId === codigo);
  }

  private selectedStateUser(codigo: number) {
    return this.statesUsers.find(x => x.stateUserId === codigo);
  }

  birthDateSelected(birthDate: any) {
    return DateUtil.stringToDate(birthDate);
  }

  private getName() {
    return this.form.get('name').value;
  }

  saveUser() {
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
    this.userService.crear(params).subscribe(resp => {
      this.translate.get('global.guardadoExitosoMensaje').subscribe(mensaje => {
        this.alertService.success(mensaje).then(() => {
          this.form.reset();
          this.router.navigate(['/admin/maestros/usuarios']);
        });
      });
    }, err => {
      this.translate.get('global.errorGuardar').subscribe(mensaje => {
        this.alertService.error(mensaje);
      });
    });
  }

  private updateItem(params: any) {
    params = { ...params, userId: this.userId };
    this.userService.modificar(params).subscribe(resp => {
      this.translate.get('global.actualizacionExitosaMensaje').subscribe(mensaje => {
        this.alertService.success(mensaje).then(() => {
          this.form.reset();
          this.router.navigate(['/admin/maestros/usuarios']);
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

  getPatrocinador() {
    const _form = this.form.getRawValue();
    this.userService.listar({username: _form.levelOneId}).subscribe((resp: any) => {
      this.patrocinador = resp.content[0];
    });
    
  }

}
