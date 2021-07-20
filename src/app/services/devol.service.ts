import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalsService } from './globals.service';

@Injectable({
  providedIn: 'root'
})
export class DevolService {
  constructor( private http: HttpClient, private globals: GlobalsService) { }


connectService(params) {
  const encabezado = {
    headers: new HttpHeaders({
    Authorization: '',
    'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
    Pragma: 'no-cache',
    Expires: '0'
  })};
  const servUrl = this.globals.enpointDevol + '/devol/recibe';
  return this.http.post( servUrl, params, encabezado);
  }
}
