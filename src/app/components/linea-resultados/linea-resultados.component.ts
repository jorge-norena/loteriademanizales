import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-linea-resultados',
  templateUrl: './linea-resultados.component.html',
  styleUrls: ['./linea-resultados.component.sass']
})
export class LineaResultadosComponent implements OnInit {
  @Input() nombre: string;
  @Input() numero: string;
@Input() serie: string;
@Input() premio: any;
@Input() ciudad: string;

arrNumero = [];
arrSerie = [];
  constructor() { }

  ngOnInit() {
    this.arrNumero = this.convertArr(this.numero);
    this.arrSerie = this.convertArr(this.serie);
    // console.log(this.arrNumero);
  }

  convertArr( cadena: string ) {
    const arrResp: Array<string> = Array.from(cadena);
    // console.log('arr', arrResp)
    return arrResp;
  }

}
