import { Component, OnInit } from '@angular/core';
import { ConsultaTransparenciaService } from '../../services/consulta-transparencia.service';

@Component({
  selector: 'app-transparencia',
  templateUrl: './transparencia.component.html',
  styleUrls: ['./transparencia.component.sass']
})
export class TransparenciaComponent implements OnInit {
  objEstructura;
  cargando = true;
  constructor( private _consultarTransparencia: ConsultaTransparenciaService) { }

  ngOnInit() {
    this.procesarEstructura();
  }

  procesarEstructura(){
    this._consultarTransparencia.connectService().subscribe( (respuesta: any) => {
      this.objEstructura = respuesta;
      this.cargando = false;
    })
  }

}
