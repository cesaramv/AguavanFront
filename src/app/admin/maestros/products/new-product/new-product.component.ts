import { PointsProduct } from './../../../../shared/calculations/points-product';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { CalculationService } from '@core/services/calculation.service';
import { TranslateService } from '@ngx-translate/core';
import { FormValidate } from '@shared/util/form-validate';
import { forkJoin } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ProductoService } from 'src/app/services/producto.service';
import { CategoryService } from '../../services/category.service';
import { TaxService } from '../../services/tax.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent extends FormValidate implements OnInit {

  esCreacion: boolean;
  productId: number;
  itemProduct: any;
  categories: any;
  taxes: any;

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
    private readonly productService: ProductoService,
    private readonly categoryService: CategoryService,
    private readonly taxService: TaxService,
    private readonly calculationService: CalculationService
  ) {
    super();
    this.esCreacion = true;
    this.categories = [];
    this.taxes = [];
  }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params => {
      this.productId = params.id || null;
      forkJoin({ 
        _categories: this.categoryService.listar({}),
        _taxes: this.taxService.listar({})
      }).subscribe(async (resp: any) => {
        this.categories = resp._categories.content;
        this.taxes = resp._taxes.content;
        if(this.productId){
          this.esCreacion = false;
          const itemProduct = await this.productService.listarPorId(this.productId).toPromise();
          this.formInit(itemProduct);
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
        description: [params ? params.description : null, [Validators.required]],
        category: [params ? this.selectedCategory(params.category.categoryId): null, [Validators.required]],
        tax: [params ? this.selectedTax(params.tax.taxId): null, [Validators.required]],
        ratePublic: [params ? params.ratePublic: null],
        price: [params ? params.price : null, [Validators.required]],
        cost: [params ? params.cost : null, [Validators.required]],
        points: [params ? params.points : 0],
        weight: [params ? params.weight : null, [Validators.required]],
        weightContainer: [params ? params.weightContainer : null],
        image: [params ? params.image : null],
        remarks: [params ? params.remarks : null],
        state: [params ? params.state : true, [Validators.required]]
      })
    );
    this.form.controls.points.disable();
    this.urlImagen = '../../../../assets/images/productos/default.png';
    if(!this.esCreacion && params.image){
      this.urlImagen = `../../../../assets/images/productos/${params.image}`;
    }
    this.form.disable();
    this.changePriceOrCost();
  }

  private selectedCategory(codigo: number){
    return this.categories.find(x => x.categoryId === codigo);
  }

  private selectedTax(codigo: number){
    return this.taxes.find(x => x.taxId === codigo);
  }

  private changePriceOrCost(){
    this.form.controls.price.valueChanges.subscribe(item => {
      const _cost = this.form.controls.cost.value;
      if(item && _cost){
        //this.form.controls.points.setValue(this.calculationService.getPoint(item, _cost, 1).point);
        this.form.controls.points.setValue(this.pointsProduct.poinstP1(item, _cost, 1).points.toFixed(2));
      }
    });

    this.form.controls.cost.valueChanges.subscribe(item => {
      const _price = this.form.controls.price.value;
      if(item && _price){
        //this.form.controls.points.setValue(this.calculationService.getPoint(_price, item, 1).point);
        this.form.controls.points.setValue(this.pointsProduct.poinstP1(_price, item, 1).points.toFixed(2));
      }
    });
  }

  private getName() {
    return this.form.get('name').value;
  }

  saveProduct() {
    if(this.form.invalid){
      return;
    }
    const uploadImageData = new FormData();
    const _form = this.form.getRawValue();
    uploadImageData.append('imageFile', this.selectedImage, this.setNameImage());
    uploadImageData.append('description', _form.description);
    uploadImageData.append('category', _form.category.descripcion);
    uploadImageData.append('tax', _form.tax);
    uploadImageData.append('ratePublic', _form.ratePublic);
    uploadImageData.append('price', _form.price);
    uploadImageData.append('cost', _form.cost);
    uploadImageData.append('points', _form.points);
    uploadImageData.append('weight', _form.weight);
    uploadImageData.append('weightContainer', _form.weightContainer);
    uploadImageData.append('remarks', _form.remarks);
    uploadImageData.append('state', _form.state)

    if(this.esCreacion){
      this.createItem(uploadImageData);
    } else {
      this.updateItem(uploadImageData);
    }
  }

  private setNameImage() {
    const _form = this.form.getRawValue();
    const category = _form.category.descripcion.replace(/\s/g, '-');
    const description = _form.description.replace(/\s/g, '-');
    return `${category}-${description}`;
    //_form.image.setValue(`${category}-${description}`);
  }

  private createItem(params: any){
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

  private updateItem(params: any){
    params['productId'] = this.productId;
      this.productService.modificar(params).subscribe(resp => {
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
    if(event.target.files){
      for(let i=0; i< File.length - 1; i++){
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        if (event.target.files[i].type.match('image.*')) {
          this.selectedImage = event.target.files[i];
          reader.onload = (event: any) => {
            this.urlImagen = event.target.result;
          }
        }else {
          this.alertService.info('Formato no valido');
        }
      }
    }
  }

}
