import { getProductCategoryByIdSelector } from './../../../../store-redux/selectors/master.selectors';
import { AppState } from './../../../../store-redux/app.reducer';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService, ProductCategoryService } from 'src/app/core/services';
import { FormValidate } from '@shared/util/form-validate';
import { Observable } from 'rxjs/internal/Observable';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/internal/operators/filter';

@Component({
  selector: 'app-new-categories-products',
  templateUrl: './new-categories-products.component.html',
  styleUrls: ['./new-categories-products.component.css']
})
export class NewCategoriesProductsComponent extends FormValidate implements OnInit {

  esCreacion: boolean;
  categoryId: number;

  form: FormGroup;
  isForm: Promise<any>;

  constructor(
    private readonly router: Router,
    private readonly activatedRouter: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly translate: TranslateService,
    private readonly categoryService: ProductCategoryService,
    private readonly alertService: AlertService,
    private readonly store: Store<AppState>
  ) {
    super();
    this.esCreacion = true;
    //this.alertService.error("El registro se guardo correctamente");
    //this.alertService.confirm('El registro se guardo correctamente', 'warning');
   }

  ngOnInit(): void {
    this.categoryId = this.activatedRouter.snapshot.params.id;
    this.esCreacion = !this.categoryId;
    this.formInit();
    if (!this.esCreacion) {
      this.store.select(getProductCategoryByIdSelector, this.categoryId).pipe(
        filter(documentsType => !!documentsType)
      ).subscribe(this.preloadData.bind(this))
    }
  }

  private preloadData(params: any) {
    this.form.patchValue(params);
  }

  private formInit(params?: any){
    this.isForm = Promise.resolve(
      this.form = this.formBuilder.group({
        name: [params ? params.name : null, [Validators.required]],
        icono: [params ? params.icono : null],
        state: [params ? params.state : true, [Validators.required]]
      })
    );
  }

  private getNameCategory() {
    return this.form.get('name').value;
  }

  saveCategory() {
    if(this.form.invalid){
      return;
    }
    if(this.esCreacion){
      this.categoryService.crear(this.form.value).subscribe(resp => {
        this.translate.get('global.guardadoExitosoMensaje').subscribe(mensaje => {
          this.alertService.success(mensaje).then(() => {
            this.form.reset();
            this.router.navigate(['/admin/maestros/categorias_productos']);
          });
        });
      }, err => {
        this.translate.get('global.errorGuardar').subscribe(mensaje => {
          this.alertService.error(mensaje);
        });
      });
    } else {
      this.categoryService.modificar(this.categoryId, this.form.value).subscribe(resp => {
        this.translate.get('global.actualizacionExitosaMensaje').subscribe(mensaje => {
          this.alertService.success(mensaje).then(() => {
            this.form.reset();
            this.router.navigate(['/admin/maestros/categorias_productos']);
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
