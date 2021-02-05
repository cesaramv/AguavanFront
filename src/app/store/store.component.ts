import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  estaIdentificado: boolean;
  produtos: any[];

  constructor(
    private readonly productoService: ProductoService,
    private readonly loginService: LoginService
  ) { 
    this.estaIdentificado = this.loginService.estaLogueado();
  }

  ngOnInit(): void {
    this.productoService.listarProductos().subscribe((resp: any) => {
      this.produtos = resp;
    });
  }

}
