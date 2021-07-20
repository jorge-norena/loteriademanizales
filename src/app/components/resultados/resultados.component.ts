import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ConsultaResultadosService } from '../../services/consulta-resultados.service';
import { gsap } from "gsap";
import { ComunicaInicioService } from '../../services/comunica-inicio.service';
import { GoogleAnalyticsService } from '../../services/google-analytics.service';
type MyArrayType = Array<{nom: string, pre: string, num: string, ser: string, ciu: string, dep: string}>;
@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.sass']
})
export class ResultadosComponent implements OnInit, AfterViewInit {
constructor( private servResultados: ConsultaResultadosService, 
              private servInitResultados: ComunicaInicioService,
              private analytics: GoogleAnalyticsService ) { }
objResultados: MyArrayType;
objSorteo = null;
arrNumeroMayor = [];
arrSerieMayor = [];
fechaAhora = new Date();
fechaProximo = null;
difFechas = null;
mostrarDetalles = false;
tl_Detalles;
tl_Balotas;
tl_IntroRes
cargando = true;
ngOnInit() {
    this.consultaResultados();
    this.tl_Detalles = gsap.timeline({
      paused: true,
    });
    this.tl_Balotas = gsap.timeline({
      paused: true,
    });
    
  }

  ngAfterViewInit(){
    this.tl_Detalles.to(
      '#detResultados',
      {
        duration: 1,
        y:'100%',
        ease: 'bounce.out'
      }
    );
  }
consultaResultados() {
  this.servResultados.connectService().subscribe( (res: any) => {
    this.objSorteo = res.sorteo[0];
    this.objResultados = res.resultados;
    this.fechaProximo = new Date(Date.parse(res.sorteo[0].prox));
    this.difFechas = Math.floor((this.fechaProximo.getTime() - this.fechaAhora.getTime()) / 1000);
    // console.log(this.fechaProximo.getTime(), this.fechaAhora.getTime(), this.difFechas);
    this.arrNumeroMayor = Array.from(res.resultados[0].num);
    this.arrSerieMayor = Array.from(res.resultados[0].ser);
    this.cargando = false;
    this.animarResultadosIntro();
  });
  }

ajustarFecha( formatoLot: string ): string {
    const arr = formatoLot.split('/');
    const fecha: string = arr[2] + '-' + arr[1] + '-' + arr[0];
    return fecha;
  }

  toggleDetalles(){
    this.mostrarDetalles = !this.mostrarDetalles;
    if(this.mostrarDetalles){
      this.tl_Detalles.play(0);
      this.animarBalotas();
      this.analytics.eventEmitter('detalle-resultados', this.objSorteo.num, '', '');
    }else{
      this.tl_Detalles.reverse(0);
    }
  }

  animarResultadosIntro(){
    this.tl_IntroRes = gsap.timeline({
      paused: true,
      onStart: ()=>{this.servInitResultados.cambiarValor(true);}
    });
    this.tl_IntroRes.from(
      '.balota-numero-resultado, .balota-serie-resultado',
      {
        autoAlpha: 0,
        scale: gsap.utils.random(2, 3, 0.2, true),
        y: gsap.utils.random(-150, 350, 10, true),
        x: gsap.utils.random(-150, 150, 10, true),
        rotation: gsap.utils.random(-360, 360, 10, true),
        duration: 5,
        ease: 'elastic.out',
        stagger:{
          each: 0.2,
          from: "start",
        },
      }
    ).play();
  }
  
  animarBalotas(){
    this.tl_Balotas.from(
      '.balota-numero-resultado-sm, .balota-serie-resultado-sm',
      {
        autoAlpha: 0,
        scale: gsap.utils.random(2, 3, 0.2, true),
        y: gsap.utils.random(-150, 350, 10, true),
        x: gsap.utils.random(-150, 150, 10, true),
        rotation: gsap.utils.random(-360, 360, 10, true),
        duration: 5,
        ease: 'elastic.out',
        stagger:{
          each: 0.09,
          from: "center",
          grid:[4,25],
        },
        onComplete: this.resetBalotas(),
      }
    ).play();
  }

  resetBalotas(){
    this.tl_Balotas.kill();
  }

}
