import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css']
})
export class OfficeComponent implements OnInit {

  listMenu: any[] = [];

  constructor(private readonly menuService: MenuService) { }

  ngOnInit(): void {
    this.menuService.getMenuCambio().subscribe(menus => {
      this.listMenu = menus.filter(x => x.main_menu === false);
      console.log(this.listMenu);
    });
  }

}
