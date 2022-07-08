import { pagination, paginationInit } from './../../../store-redux/models/pagination';
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
  rows: number = 10;
  pages: number[] = [];

  pagination: pagination;
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
      this.pagination = { ...options };
      this.setPages();
      this.setRange(this.pagination.page);
    }
  }

  public limpliar() {
    this.cargarDatos([]);
    this.pagination = paginationInit
    this.setPages();
  }

  next() {
    if (!this.pagination.hasNextPage) {
      return
    }
    this.clickPaginador.emit(this.pagination.next);
  }

  prev() {
    if (!this.pagination.hasPrevPage) {
      return;
    }
    this.clickPaginador.emit(this.pagination.prev);
  }

  firstPage() {
    if (!this.pagination.hasPrevPage) {
      return;
    }
    this.clickPaginador.emit(1);
  }

  lastPage() {
    if (!this.pagination.hasNextPage) {
      return
    }
    this.clickPaginador.emit(this.pagination.totalPages);
  }

  irPage(page: any) {
    this.clickPaginador.emit(page);
  }

  isFirstPage(): boolean {
    return !this.pagination?.hasPrevPage;
  }

  isLastPage(): boolean {
    return !this.pagination?.hasNextPage;
  }

  setPages() {
    this.pages = [];
    if (this.pagination && this.pagination.page >= 5) {
      if (this.pagination.totalPages < this.pagination.page + 2) {
        for (let i = this.pagination.totalPages - 4; i <= this.pagination.totalPages; i++) {
          this.pages.push(i);
        }
      } else {
        for (let i = this.pagination.page - 1; i < this.pagination.page + 4; i++) {
          this.pages.push(i);
        }
      }
    } else if (this.pagination && this.pagination.totalPages < 5) {
      for (let i = 1; i <= this.pagination.totalPages; i++) {
        this.pages.push(i);
      }
    } else {
      this.pages = [1, 2, 3, 4, 5];
    }
  }

  setRange(page: number) {
    this.lastRange = page === this.pagination.totalPages ? this.pagination.totalElements : (page) * 10;
    this.firstRange = page === 1 ? 1 : (page - 1) * 10 + 1;
  }

  clickCelta(dataRow: any, accion: string) {
    this.clickCelda.emit({ row: dataRow, tipeAccion: accion });
  }

  funDisabled() { }

  getValue(rowData: any, colField: string) {
    let obj: object;
    if (colField.includes('.')) {
      for (const campo of colField.split('.')) {
        obj = obj ? obj[campo] : rowData[campo];
        if (!obj && !rowData[campo]) { break; }
      }
      return obj ? obj : '-';
    } else {
      return rowData[colField];
    }

  }

}
