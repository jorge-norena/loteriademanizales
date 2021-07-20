import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicaInicioService {
  resultadosCargados: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor() {
      console.log('Servicio invocado');
     }

    cambiarValor( nuevo:boolean){
      this.resultadosCargados.next(nuevo);
    }
}
