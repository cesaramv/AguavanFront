import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { GridConfiguration } from './grid-configuration';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GridComponent implements OnInit {

  cols: any[];
  listUsers: any;
  firstRange: number = 0;
  lastRange: number = 0;
  totalRecords: number = 0;
  rows: number = 10;
  numberPage = 0;
  totalPages = 0;
  pages: number[] = [];

  datos: any[] = [];
  @Input() configuracion: GridConfiguration = new GridConfiguration();

  @Output() clickPaginador: EventEmitter<any> = new EventEmitter<any>();
  @Output() clickCelda: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    if (this.configuracion) {
      this.configuracion.component = this;
    }
  }

  public cargarDatos(datos: object[], options?: any) {
    this.configuracion.datos = datos;
    if (options) {
      this.totalRecords = options.totalElements;
      this.numberPage = options.number;
      this.totalPages = options.totalPages;
      this.setPages();
      this.setRange(this.numberPage);
    }
  }

  public limpliar() {
    this.cargarDatos([]);
    this.totalRecords = 0;
    this.numberPage = 0;
    this.totalPages = 0;
    this.setPages();
  }

  next() {
    if (this.totalPages <= this.numberPage) {
      return
    }
    this.clickPaginador.emit(this.numberPage + 1);
  }

  prev() {
    if (this.numberPage <= 0) {
      return;
    }
    this.clickPaginador.emit(this.numberPage - 1);
  }

  firstPage() {
    if (this.numberPage <= 0) {
      return;
    }
    this.clickPaginador.emit(0);
  }

  lastPage() {
    if (this.totalPages <= this.numberPage) {
      return
    }
    this.clickPaginador.emit(this.totalPages - 1);
  }

  irPage(page: any) {
    this.clickPaginador.emit(page);
  }

  isFirstPage(): boolean {
    return this.numberPage === 0 ? true : false;
  }

  isLastPage(): boolean {
    return this.totalPages - 1 === this.numberPage ? true : false;
  }

  setPages() {
    this.pages = [];
    if (this.numberPage >= 5) {
      if (this.totalPages < this.numberPage + 2) {
        for (let i = this.totalPages - 4; i <= this.totalPages; i++) {
          this.pages.push(i);
        }
      } else {
        for (let i = this.numberPage - 1; i < this.numberPage + 4; i++) {
          this.pages.push(i);
        }
      }
    } else if (this.totalPages < 5) {
      for (let i = 1; i <= this.totalPages; i++) {
        this.pages.push(i);
      }
    } else {
      this.pages = [1, 2, 3, 4, 5];
    }
  }

  setRange(page: number){
    this.lastRange = page + 1 === this.totalPages ? this.totalRecords : (page + 1) * 10;
    this.firstRange = page < 1 ? 1 : page * 10 + 1;
  }

  clickCelta(dataRow: any, accion: string) {
    this.clickCelda.emit({ row: dataRow, tipeAccion: accion });
  }

  funDisabled() { }

  getValue(rowData: any, colField: string){
    let obj: object;
    if(colField.includes('.')){
      for(const campo of colField.split('.')){
        obj = obj ? obj[campo] : rowData[campo];
        if(!obj && !rowData[campo]){ break; }
      }
      return obj? obj : '-';
    } else {
      return rowData[colField];
    }

  }

}
