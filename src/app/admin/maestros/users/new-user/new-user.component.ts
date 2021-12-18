import { getPaymentMethodsList } from './../../../../store-redux/selectors/user.selectors';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { FormValidate } from '@shared/util/form-validate';
import { Observable } from 'rxjs/internal/Observable';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { UsersService } from '../../../../services/users.service';
import { ProductoService } from 'src/app/services/producto.service';
import { CityService } from '@core/services/city.service';
import { DepartmentsService } from '@core/services/departments.service';
import { DocumentService } from '@core/services/document.service';
import { StateUserService } from '@core/services/state-user.service';
import { DateUtil } from '@shared/util/date.util';
import { ES } from '@shared/util/constantes/generales';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store-redux/app.reducer';
import * as actionsUser from '../../../../store-redux/actions/user.actions';
import * as citiesByDepartmentActions from '../../../../store-redux/actions/cities-by-department.actions';

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
    private readonly stateUserService: StateUserService,
    private readonly store: Store<AppState>
  ) {
    super();
    this.esCreacion = true;
    this.bloquear = false;
    this.documents = [];
    this.departments = [];
    this.cities = [];
    this.statesUsers = [];
  }

  ngOnInit(): void {
    this.userId = Number(this.activatedRouter.snapshot.paramMap.get('id'));
    this.esCreacion = this.userId ? false : true;

    //TODO: Esto creo que lo puedo hacer con selectores
    this.store.select<any, any>('user', 'citiesBydepartment').subscribe((resp: any) => { console.log('respuesta ', resp);

    })

    this.store.select(getPaymentMethodsList).subscribe(resp => {
      debugger
    })

    //TODO: Pendiente de que seleccione la ciudad en el control list cities

    this.store.select('user').subscribe(({
      loaded, documentsType, departments, statesUsers, user: itemUser
    }) => {
      if(loaded){
        this.documents = documentsType;
        this.departments = departments;
        this.statesUsers = statesUsers;
        this.itemUser = itemUser;
        this.formInit(this.itemUser);
      }
    });

    this.store.select('citiesBydepartment').subscribe(({ loaded, cities }) => {
      if(loaded){
        this.cities = cities; 
        if (!this.esCreacion) {
          this.selectedCity(this.itemUser.city.cityId);
        }
      }
    });

   // this.store.dispatch(actionsUser.loadUser({ userId: this.userId }));
    forkJoin({
      _documents: this.documentService.listar({ state: true }),
      _departments: this.departmentService.listar({ state: true }),
      //_cities: this.cityService.listar({ state: true }),
      _statesUsers: this.stateUserService.listar({ state: true }),
    }).subscribe(async (resp: any) => {
      this.documents = resp._documents.content;
      this.departments = resp._departments.content;
      //this.cities = resp._cities.content;
      this.statesUsers = resp._statesUsers.content;
      if (this.userId) {
        this.itemUser = await this.userService.listarPorId(this.userId).toPromise();
        this.formInit(this.itemUser);
      } else {
        this.formInit();
      }
    });
  }

  private formInit(params?: any) {
    this.isForm = Promise.resolve(
      this.form = this.formBuilder.group({
        userForm: this.formBuilder.group({
          firstName: [params ? params.firstName : null, [Validators.required]],
          lastName: [params ? params.lastName : null, [Validators.required]],
          document: [params ? this.selectedDocument(params.document.documentId) : null, [Validators.required]],
          documentoNumber: [params ? params.documentoNumber : null, [Validators.required]],
          birthDate: [params ? this.birthDateSelected(params.birthDate) : null, [Validators.required]],
          phoneCell: [params ? params.phoneCell : null, [Validators.required]],
          phone: [params ? params.phone : null],
          address: [params ? params.address : null, [Validators.required]],
          department: [null, [Validators.required]],
          city: [null, [Validators.required]],
          email: [params ? params.email : null, [Validators.required]],
          stateUser: [params ? this.selectedStateUser(params.stateUser.stateUserId) : null, [Validators.required]],
          password: [params ? params.password : null, [Validators.required]],
          rut: [params ? params.rut : null],
          levelOneId: [params ? params.levelOneId : null, [Validators.required]],
          contract: [params ? params.contract : true, [Validators.required]]
        })
      })
    );

    this.form.controls.userForm['controls'].department.valueChanges.subscribe(itemSelected => {
      this.getCitiesByDepartment(itemSelected.departmentId);
    });

    if (!this.esCreacion) {
      this.bloquear = true;
      this.form.controls.userForm['controls'].levelOneId.disable();
      this.form.controls.userForm['controls'].password.disable();
      this.selectedDepartment(params.city.department.departmentId);
      this.getPatrocinador();
    }

  }

  private selectedDocument(codigo: number) {
    return this.documents.find(x => x.documentId === codigo);
  }

  private selectedDepartment(codigo: number) {
    this.form.controls.userForm['controls'].department.setValue(this.departments.find(x => x.departmentId === codigo));
  }

  private selectedCity(codigo: number) {
    this.form.controls.userForm['controls'].city.setValue(this.cities.find(x => x.cityId === codigo));
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

    const params = {
      ...this.form.value,
      levelOneId: this.patrocinador ? this.patrocinador.username : '0',
      levelTwoId: this.patrocinador ? this.patrocinador.levelOneId : '0',
      levelThreeId: this.patrocinador ? this.patrocinador.levelTwoId : '0',
      levelFourId: this.patrocinador && this.patrocinador.levelThreeId ? this.patrocinador.levelThreeId : '0',
      levelFiveId: this.patrocinador && this.patrocinador.levelFourId ? this.patrocinador.levelFourId : '0'
    }

    if (this.esCreacion) {
      this.createItem(params);
    } else {
      this.updateItem(params);
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
    this.bloquear = true;
    const _form = this.form.getRawValue();
    this.userService.getUserByUsername(_form.userForm.levelOneId).subscribe((resp: any) => {
      this.bloquear = false;
      this.patrocinador = resp;
    }, err => {
      this.bloquear = false;
      this.translate.get('No se encontro patrocinador para el código ingresado, asegurese de que el código ingresado sea correcto').subscribe(mensaje => {
        this.alertService.error(mensaje);
        this.form.controls.levelOneId.setValue(null);
      });
    });

  }

  private getCitiesByDepartment(idDepartment: number) {
    
      const _params = { state: true, 'department.departmentId': idDepartment };
      this.store.dispatch(citiesByDepartmentActions.loadCitiesByDepartment({filtros: _params}));
  

    /* this.cityService.listar({ 'department.departmentId': idDepartment }).subscribe((resp: any) => {
      this.cities = resp.content;
      if (!this.esCreacion) {
        this.selectedCity(this.itemUser.city.cityId);
      }
    }); */
  }

}
