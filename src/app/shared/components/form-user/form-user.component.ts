import { loadUserStates } from './../../../store-redux/actions/user-states.actions';
import { loadDocumentsType } from './../../../store-redux/actions/documents-type.actions';
import { loadDepartments } from './../../../store-redux/actions/departments.actions';
import { 
  getCitiesSelector, 
  getDepartmentsSelector, 
  getDocumentsSelector, 
  getUserStatesSelector 
} from './../../../store-redux/selectors/master.selectors';
import { Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { AlertService } from '@core/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store-redux/app.reducer';
import { ES } from '@shared/util/constantes/generales';
import { Observable } from 'rxjs/internal/Observable';
// import * as actionsPatrocinador from '../../../store-redux/actions/patrocinador.actions';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  esCreacion: boolean;
  userId: number;
  itemUser: any;
  documents$: Observable<any>;
  departments$: Observable<any>;
  cities$: Observable<any>;
  statesUser$: Observable<any>

  isForm: Promise<any>;

  //patrocinador: any;
  bloquear: boolean;

  es = ES;

  constructor(
    public controlContainer: ControlContainer,    
    private readonly translate: TranslateService,
    private readonly alertService: AlertService,
    private readonly store: Store<AppState>
  ) {
    this.esCreacion = true;
    this.bloquear = false;
  }

  ngOnInit(): void {
    this.departments$ = this.store.select(getDepartmentsSelector);
    this.documents$ = this.store.select(getDocumentsSelector);
    this.cities$ = this.store.select(getCitiesSelector);
    this.statesUser$ = this.store.select(getUserStatesSelector);

    const params = { page: 1, size: 10, isPaged: false };
    this.store.dispatch(loadDepartments({ filtros: params }));
    this.store.dispatch(loadDocumentsType({ filtros: params }));
    this.store.dispatch(loadUserStates({ filtros: params }));

    this.store.select('user',).subscribe(({
      loaded, user: itemUser
    }) => {
      if(loaded){
        
      }
    });

    /* this.store.select('citiesBydepartment').subscribe(({ loaded, cities }) => {
      if(loaded){ this.cities = cities; }
    }); */

    /* this.store.select('patrocinador').subscribe(({ loaded, patrocinador }) => {
      if(loaded){ 
        this.bloquear = false;
        this.patrocinador = patrocinador; }
    }); */
  }

  /* getPatrocinador() {
    this.bloquear = true;
    this.store.dispatch(actionsPatrocinador.loadPatrocinador(
      { filtros: this.controlContainer.control['controls'].levelOneId.value }
    )); */
    /* const _form = this.form.getRawValue();
    this.userService.getUserByUsername(_form.levelOneId).subscribe((resp: any) => {
      this.bloquear = false;
      this.patrocinador = resp;
    }, err => {
      this.bloquear = false;
      this.translate.get('No se encontro patrocinador para el código ingresado, asegurese de que el código ingresado sea correcto').subscribe(mensaje => {
        this.alertService.error(mensaje);
        this.form.controls.levelOneId.setValue(null);
      });
    }); */
    
  //}

}
