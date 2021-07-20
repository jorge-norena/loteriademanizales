import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalsService } from './globals.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultarPqrService {
  constructor( private http: HttpClient, private globlas: GlobalsService ) {
  }
    connectService(params) {
      const encabezado = {
        headers: new HttpHeaders({
          Authorization: '',
          'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
          Pragma: 'no-cache',
          Expires: '0'
        })};
      const servUrl = this.globlas.endpointPqr + '/consultaPqr.php';
      return this.http.post( servUrl, params );
    }
}
