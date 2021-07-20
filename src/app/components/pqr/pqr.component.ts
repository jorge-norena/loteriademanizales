import { Component, OnInit } from '@angular/core';
import { ConsultarPqrService } from 'src/app/services/consultar-pqr.service';
import { RadicarPqrService } from '../../services/radicar-pqr.service';
declare var $: any;
@Component({
  selector: 'app-pqr',
  templateUrl: './pqr.component.html',
  styleUrls: ['./pqr.component.sass']
})
export class PqrComponent implements OnInit {
  logueado;
  cargando = false;
  objCaso = {
    nombre: '',
    apellido: '',
    identificacion: '',
    email: '',
    direccion: '',
    ciudad: '',
    pais: 'Colombia',
    caso: ''
  };
  ticketConsulta = '';
  opcion = 0;
  errRadica = false;
  errConsulta = false;
  ticketRespuesta = null;

  constructor(  private servRadicar: RadicarPqrService,
                private servConsultar: ConsultarPqrService ) { }

  ngOnInit() {
  }
  cambiarOpcion(op) {
    this.opcion = op;
  }
  radicar() {
    this.cargando = true;
    this.servRadicar.connectService( this.objCaso ).subscribe( (resp: any) => {
      console.log('respuesta', resp);
      if ( resp.codigoRespuesta === '0') {
        this.ticketRespuesta = resp.respuesta;
      } else {
        this.errRadica = true;
      }
      this.objCaso = {
        nombre: '',
        apellido: '',
        identificacion: '',
        email: '',
        direccion: '',
        ciudad: '',
        pais: 'Colombia',
        caso: ''
      };
      $('#modalPqr').modal('show');
      this.cargando = false;
    });
  }
  consultar() {
    this.cargando = true;
    const param = {ticketid: this.ticketConsulta}
    this.servConsultar.connectService( param ).subscribe( (resp: any) => {
      console.log('respuesta', resp);
      if ( resp.codigoRespuesta === '0') {
        this.ticketRespuesta = resp.respuesta;
        this.errConsulta = false;
      } else {
        this.errConsulta = true;
      }
      this.ticketConsulta = '';
      $('#modalPqrCons').modal('show');
      this.cargando = false;
    });
  }
}
