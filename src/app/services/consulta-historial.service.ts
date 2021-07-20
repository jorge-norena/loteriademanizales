import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultaHistorialService {
  constructor( private http: HttpClient ) {
  }
    connectService(ano) {
      const encabezado = {
        headers: new HttpHeaders({
          'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
          Pragma: 'no-cache',
          Expires: '0'
        })};
      // const servUrl = 'http://localhost:8888/hist.php';
      const servUrl = 'https://loteriademanizales.com/assets/data/scripts/hist.php';
      console.log(servUrl);
      return this.http.get( servUrl, encabezado );
    }
}
