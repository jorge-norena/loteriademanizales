import { Component, OnInit } from '@angular/core';
import { ConsultaHistorialService } from '../../services/consulta-historial.service';
import { ConsultaResHistoricosService } from '../../services/consulta-res-historicos.service';
declare var $: any;

type MyArrayType = Array<{nom: string, pre: string, num: string, ser: string, ciu: string, dep: string}>;

@Component({
  selector: 'app-historial-premios',
  templateUrl: './historial-premios.component.html',
  styleUrls: ['./historial-premios.component.sass']
})
export class HistorialPremiosComponent implements OnInit {
  arrArchivos = [];
  objResultados: MyArrayType;
  objSorteo = null;
  cargando = true;
  cargandoDet = true;
  anoConsulta = '2021';
  sorteoConsulta = '';
  fechaConsulta = '';
  constructor( private servHistorico: ConsultaHistorialService, private servResultadosHist: ConsultaResHistoricosService ) { }

  ngOnInit() {
    this.consultarSorteos(this.anoConsulta);
  }

  consultarSorteos(ano) {
    this.cargando = true;
    this.servHistorico.connectService(ano).subscribe( (respHist: any) => {
      if (respHist.codigoRespuesta === '0') {
        let arrTmp = [];
        arrTmp = respHist.respuesta;
        arrTmp.forEach( (elemento: string) => {
          const arrNombre = elemento.split('.');
          const tmpObj = {
            num: arrNombre[0],
            fech: arrNombre[1],
            comp: arrNombre[0] + '.' + arrNombre[1]
          };
          this.arrArchivos.push( tmpObj );
        });
      }
      this.cargando = false;
    } );
  }

  consultaResultados(anoActual, arch) {
    this.sorteoConsulta = arch.split('.')[0];
    this.fechaConsulta = arch.split('.')[1];
    this.cargandoDet = true;
    $('#modalDetalle').modal('show');
    this.servResultadosHist.connectService(anoActual, arch).subscribe( (res: any) => {
      this.objSorteo = res.sorteo[0];
      this.objResultados = res.resultados;
      // console.log(this.fechaProximo.getTime(), this.fechaAhora.getTime(), this.difFechas
      this.cargandoDet = false;
      // this.animarResultadosIntro();
    });
    }
}
