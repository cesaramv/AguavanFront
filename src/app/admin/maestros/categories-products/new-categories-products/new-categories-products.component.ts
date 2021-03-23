import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { CategoryService } from '../../services/category.service';
import { FormValidate } from '@shared/util/form-validate';
import { Observable } from 'rxjs/internal/Observable';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TranslateService } from '@ngx-translate/core';

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
    private readonly categoryService: CategoryService,
    private readonly alertService: AlertService
  ) {
    super();
    this.esCreacion = true;
    //this.alertService.error("El registro se guardo correctamente");
    //this.alertService.confirm('El registro se guardo correctamente', 'warning');
   }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(async params => {
      this.categoryId = params.id || null;
      if(this.categoryId){
        this.esCreacion = false;
        const rowCategory = await this.categoryService.listarPorId(this.categoryId).toPromise();
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
        descripcion: [params ? params.descripcion : null, [Validators.required]],
        icono: [params ? params.icono : null],
        state: [params ? params.state : true, [Validators.required]]
      })
    );
  }

  private getNameCategory() {
    return this.form.get('descripcion').value;
  }

  saveCategory() {
    if(this.form.invalid){
      return;
    }
    const _form = this.form.getRawValue();
    const params = {
      descripcion: this.getNameCategory(),
      icono: _form.icono,
      state: _form.state
    }
    if(this.esCreacion){
      this.categoryService.crear(params).subscribe(resp => {
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
      params['categoryId'] = this.categoryId;
      this.categoryService.modificar(params).subscribe(resp => {
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
