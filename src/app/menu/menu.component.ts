import { getProductCount } from './../store-redux/selectors/product.selectors';
import { getMenuMainSelector, getUserSelector } from './../store-redux/selectors/auth.selectors';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { LoginService } from '../services/login.service';
import { filter, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../store-redux/app.reducer';
import { getMensuList } from '../store-redux/selectors/menus.selectors';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  listMenu: any[];
  listMenuLast: any[] = [];
  idMenuLast: [6, 7];
  menu$: Observable<any>;
  user$: Observable<any>;
  productSelectedCount$: Observable<number>;
  //estaIdentificado: boolean;

  constructor(
    private readonly menuService: MenuService,
    private readonly loginService: LoginService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    //this.menu$ = this.menuService.getMenuCambio();
    this.menu$ = this.store.select(getMenuMainSelector);
    this.user$ = this.store.select(getUserSelector);
    this.productSelectedCount$ = this.store.select(getProductCount);
   
    /*  this.menuService.getMenuCambio().subscribe(menus => {
       this.listMenu = menus.filter(x => x.idMenu !== 6 && x.idMenu !== 7 && x.main_menu === true);
       if(!this.loginService.estaLogueado()){
         this.listMenuLast = menus.filter(x => x.idMenu === 6 || x.idMenu === 7);
       }
     }); */
  }

  getMenus(){

  }

  cerrarSesion() {
    this.loginService.cerrarSesion();
  }

  estaIdentificado() {
    return this.loginService.estaLogueado();
  }

}
function getMenuList(getMenuList: any) {
  throw new Error('Function not implemented.');
}

