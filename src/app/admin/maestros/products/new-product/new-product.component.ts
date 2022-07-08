import {
  getProductByIdSelector,
  getProductCategoriesSelector,
  getProductCategoriesState,
  getTaxesSelector,
  getTaxesState
} from './../../../../store-redux/selectors/master.selectors';
import { AppState } from './../../../../store-redux/app.reducer';
import { PointsProduct } from './../../../../shared/calculations/points-product';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FormValidate } from '@shared/util/form-validate';
import { combineLatest, forkJoin } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ProductService, ProductCategoryService } from '../../../../core/services';
import {
  AlertService,
  CalculationService,
  TaxService,
} from '../../../../core/services';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/internal/operators/filter';
import { loadProductCategories, loadTaxes } from '../../../../store-redux/actions';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent extends FormValidate implements OnInit {

  esCreacion: boolean;
  productId: number;
  itemProduct: any;
  categories$: Observable<any>;
  taxes$: Observable<any>;

  form: FormGroup;
  isForm: Promise<any>;

  urlImagen: any;
  extencionesPermitidas = ['jpg', 'png'];
  selectedImage: any;

  pointsProduct = new PointsProduct();

  constructor(
    private readonly router: Router,
    private readonly activatedRouter: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly translate: TranslateService,
    private readonly alertService: AlertService,
    private readonly productService: ProductService,
    private readonly categoryService: ProductCategoryService,
    private readonly taxService: TaxService,
    private readonly calculationService: CalculationService,
    private readonly store: Store<AppState>
  ) {
    super();
  }

  ngOnInit(): void {
    this.productId = this.activatedRouter.snapshot.params.id;
    this.esCreacion = !this.productId;
    this.formInit();

    this.categories$ = this.store.select(getProductCategoriesSelector);
    this.taxes$ = this.store.select(getTaxesSelector);

    const params = { page: 1, size: 10, isPaged: false };
    this.store.dispatch(loadProductCategories({ filtros: params }));
    this.store.dispatch(loadTaxes({ filtros: params }));

    if (!this.esCreacion) {
      combineLatest([this.categories$, this.taxes$]).pipe(
        filter(data => !!data[0] && !!data[1]),
      ).subscribe(this.getData.bind(this));
    }
  }

  private getCategory() {
    return this.form.get('category').value;
  }

  private getData(params: any) {
    this.store.select(getProductByIdSelector, this.productId).pipe(
      filter(documentsType => !!documentsType)
    ).subscribe(this.preloadData.bind(this))
  }

  private preloadData(params: any) {
    this.form.patchValue(params);
    const { __v, _id, ...category } = params.category;
    this.urlImagen = params.img;
    category.uid = _id;
    category._state = category.state ? 'Si': 'No';
    this.form.controls.category.setValue(category);
    if(params.tax){
      const { __v: vs, _id: uid, _state: st, createdAt, updatedAt, ...tax } = params.tax;
      tax.uid = uid;
      tax._state = tax.state ? 'Si': 'No';
      this.form.controls.tax.setValue(tax);
    }
  }

  private formInit(params?: any) {
    this.isForm = Promise.resolve(
      this.form = this.formBuilder.group({
        name: [params ? params.name : null, [Validators.required]],
        category: [null, [Validators.required]],
        tax: [null, [Validators.required]],
        detail: [params ? params.detail : null],
        price: [params ? params.price : null, [Validators.required]],
        cost: [params ? params.cost : null, [Validators.required]],
        weight: [params ? params.weight : null, [Validators.required]],
        containerWeith: [params ? params.containerWeith : null],
        image: [params ? params.image : null],
        remarks: [params ? params.remarks : null],
        state: [params ? params.state : true, [Validators.required]]
      })
    );
    this.urlImagen = '../../../../assets/images/productos/default.png';
    /* if (this.esCreacion && params.image) {
      this.urlImagen = `../../../../assets/images/productos/${params.image}`;
    } */
    //this.form.disable();
  }

  saveProduct() {
    if (this.form.invalid) {
      return;
    }
    const uploadImageData = new FormData();
    const _form = this.form.getRawValue();
    //uploadImageData.append('img', this.selectedImage, this.setNameImage());
    uploadImageData.append('img', this.urlImagen);
    uploadImageData.append('name', _form.name);
    uploadImageData.append('category', _form.category.uid);
    uploadImageData.append('tax', _form.tax.uid);
    uploadImageData.append('detail', _form.detail);
    uploadImageData.append('price', _form.price);
    uploadImageData.append('cost', _form.cost);
    uploadImageData.append('weight', _form.weight);
    uploadImageData.append('containerWeith', _form.containerWeith);
    uploadImageData.append('remarks', _form.remarks);
    uploadImageData.append('state', _form.state)

    if (this.esCreacion) {
      this.createItem(uploadImageData);
    } else {
      this.updateItem(uploadImageData);
    }
  }

  private setNameImage() {
    const _form = this.form.getRawValue();
    const category = _form.category.name.replace(/\s/g, '-');
    const name = _form.name.replace(/\s/g, '-');
    return `${category}-${name}`;
    //_form.image.setValue(`${category}-${description}`);
  }

  private createItem(params: any) {
    this.productService.crear(params).subscribe(resp => {
      this.translate.get('global.guardadoExitosoMensaje').subscribe(mensaje => {
        this.alertService.success(mensaje).then(() => {
          this.form.reset();
          this.router.navigate(['/admin/maestros/productos']);
        });
      });
    }, err => {
      this.translate.get('global.errorGuardar').subscribe(mensaje => {
        this.alertService.error(mensaje);
      });
    });
  }

  private updateItem(params: any) {
    this.productService.modificar(this.productId, params).subscribe(resp => {
      this.translate.get('global.actualizacionExitosaMensaje').subscribe(mensaje => {
        this.alertService.success(mensaje).then(() => {
          this.form.reset();
          this.router.navigate(['/admin/maestros/productos']);
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

  selectFiles(event) {
    if (event.target.files) {
      for (let i = 0; i < File.length - 1; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        if (event.target.files[i].type.match('image.*')) {
          this.selectedImage = event.target.files[i];
          reader.onload = (event: any) => {
            this.urlImagen = event.target.result;
          }
        } else {
          this.alertService.info('Formato no valido');
        }
      }
    }
  }
}
