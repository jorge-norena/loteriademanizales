import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultaPlanService {
  constructor( private http: HttpClient ) {
  }
    connectService() {
      const encabezado = {
        headers: new HttpHeaders({
          Authorization: '',
          'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
          Pragma: 'no-cache',
          Expires: '0'
        })};
      const servUrl = '/assets/data/pprs.json';
      console.log(servUrl);
      return this.http.get( servUrl, encabezado );
    }
}
