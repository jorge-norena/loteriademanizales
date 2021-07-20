import { Component, OnInit } from '@angular/core';
import { ConsultaContactosService } from '../../services/consulta-contactos.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.sass']
})
export class ContactoComponent implements OnInit {
  arrContactos;
  cargando = true;
  constructor( private servContactos: ConsultaContactosService ) { }

  ngOnInit() {
    this.consultaContactos();
  }
  
  consultaContactos(){
    this.servContactos.connectService().subscribe( (resContactos: any) => {
      this.arrContactos = resContactos.contactos;
    })
  }

}
