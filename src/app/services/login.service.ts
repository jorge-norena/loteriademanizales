import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalsService } from './globals.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http: HttpClient, private globals: GlobalsService) { }
  connectService(params) {
    const servUrl = this.globals.enpointDevol + '/login';
    return this.http.post( servUrl, params);
  }
}
