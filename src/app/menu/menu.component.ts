import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  listMenu: any[];
  listMenuLast: any[];
  idMenuLast: [6,7];
  //estaIdentificado: boolean;

  constructor(
    private readonly menuService: MenuService,
    private readonly loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.menuService.getMenuCambio().subscribe(menus => {
      this.listMenu = menus.filter(x => x.idMenu !== 6 && x.idMenu !== 7 && x.main_menu === true);
      if(!this.loginService.estaLogueado()){
        this.listMenuLast = menus.filter(x => x.idMenu === 6 || x.idMenu === 7);
      }
    });
  }

  cerrarSesion(){
    this.loginService.cerrarSesion();
  }

  estaIdentificado(){
    return this.loginService.estaLogueado();
  }

}
