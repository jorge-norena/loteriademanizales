import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsultaResultadosService {
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
      const servUrl = '/assets/data/usort.json';
      console.log(servUrl);
      return this.http.get( servUrl, encabezado );
    }
}
