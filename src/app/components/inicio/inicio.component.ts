import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { gsap } from 'gsap';
import { environment } from '../../../environments/environment';
import { ComunicaInicioService } from '../../services/comunica-inicio.service';
import { GoogleAnalyticsService } from '../../services/google-analytics.service';

declare var $: any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.sass'],
})
export class InicioComponent implements OnInit, AfterViewInit {
  env = environment;
  @ViewChild('slider2', { read: ElementRef, static: true })
  elementView: ElementRef;
  tamanoVentana = window.innerWidth;
  altoSlider = 1000;
  verMovil = false;
  muestraNovedades = false;
  tl_IntroSlider;
  tl_IntroTarjetas;
  iniciaContenido = false; // Debe iniciar cuando cargen los resultados
  constructor( private servInicioResultados: ComunicaInicioService, private router: Router, private analytics: GoogleAnalyticsService) {}

  ngOnInit() {
    this.tl_IntroTarjetas = gsap.timeline({
      paused: true,
    });
    this.servInicioResultados.resultadosCargados.subscribe((iniciar: boolean) => {
      if(iniciar){
        this.animaIntroSlider();
      }
      this.iniciaContenido = iniciar;
  });
  }
  ngAfterViewInit() {
    this.ajusteSlider();
    // this.animaIntroTarjetas();
    // $('#infoModal').modal('show')
  }

  ajusteSlider() {
    let offsetHeight = 0;
    if (this.tamanoVentana >= 768) {
      const refreshInterval = setInterval(() => {
        if (offsetHeight === 0) {
          offsetHeight = this.elementView.nativeElement.offsetHeight;
          this.altoSlider = this.elementView.nativeElement.offsetHeight;
          console.log(this.elementView.nativeElement.offsetHeight);
        } else {
          clearInterval(refreshInterval);
        }
      }, 10);
      this.verMovil = false;
    }else{
      this.verMovil = true;
      this.altoSlider = 1000;
    }
    this.env.esMovil = this.verMovil;
  }

  animaIntroSlider(){
    this.tl_IntroSlider = gsap.timeline({
      delay: 0,
      paused: true,
      onComplete: () => { this.animaIntroTarjetas(); this.muestraNovedades = true; }
    });
    this.tl_IntroSlider.to(
      '#slider',
      {
        duration:2,
        autoAlpha: 1
      }
   ).play();
  }

  animaIntroTarjetas() {
    this.tl_IntroTarjetas.to('.tarjetaHome', {
      duration: 3,
      scale: 1,
      autoAlpha: 1,
      // backgroundColor: '#000000',
      ease: 'elastic.out',
      stagger: {
        each: 0.25,
      },
    });
    this.tl_IntroTarjetas.play();
  }

  onResize(event) {
    console.log('wid', event.target.innerWidth);
    this.tamanoVentana = event.target.innerWidth;
    this.ajusteSlider();
  }

  animaRollTarjeta(elemento) {
    const tl_anima = gsap
      .timeline({
        paused: false,
      })
      .set(elemento, {
        rotationY: 0,
        backgroundColor: 'transparent',
        zIndex: 1,
      })
      .to(elemento, {
        zIndex: 3000,
        duration: 0.7,
        rotationY: 180,
        // translateZ: 200,
        backgroundColor: '#184981',
        ease: 'power2.in',
      })
      .to(elemento, {
        duration: 0.7,
        rotationY: 360,
        // translateZ: 0,
        backgroundColor: 'transparent',
        ease: 'power2.out',
      })
      .set(elemento, {
        rotationY: 0,
        zIndex: 1,
      });
  }
  redir( destino ){
    // window.location.href 
    this.router.navigate([destino]);
  }
  redirCompra(){
    this.analytics.eventEmitter('boton-comprar', 'click', '', '');
    $('#modalComprar').modal('show');
  }
}
