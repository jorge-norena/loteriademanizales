import { Component, OnInit } from '@angular/core';
import { ConsultaContratacionService } from '../../services/consulta-contratacion.service';
import { ConsultaTransparenciaService } from '../../services/consulta-transparencia.service';

@Component({
  selector: 'app-contratacion',
  templateUrl: './contratacion.component.html',
  styleUrls: ['./contratacion.component.sass']
})
export class ContratacionComponent implements OnInit {
  objEstructura = [];
  numProcesos = 0;
  cargando = true;
  constructor( private _consultarContratacion: ConsultaTransparenciaService) { }

  ngOnInit() {
    this.procesarEstructura();
  }

  procesarEstructura(){
    this._consultarContratacion.connectService().subscribe( (respuesta: any) => {
      this.objEstructura = respuesta;
      this.numProcesos = this.objEstructura.length;
      this.cargando = false;
    })
  }
}
