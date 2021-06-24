import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GenericService<T> {

  constructor(
    readonly http: HttpClient,
    @Inject(String) protected url: string
  ) { }

  listar(params: any){
    return this.http.get<T[]>(`${this.url}`, {params});
  }

  listarPorId(codigo: any){
    return this.http.get<T>(`${this.url}/${codigo}`);
  }

  crear(t: T){
    return this.http.post(this.url, t);
  }

  modificar(t: T){
    return this.http.put(this.url, t);
  }

  eliminar(codigo: any){
    return this.http.delete<T>(`${this.url}/${codigo}`);
  }
}
