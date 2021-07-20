import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { gsap } from 'gsap';
import { GoogleAnalyticsService } from '../../services/google-analytics.service';

@Component({
  selector: 'app-menu-general',
  templateUrl: './menu-general.component.html',
  styleUrls: ['./menu-general.component.sass']
})
export class MenuGeneralComponent implements OnInit, AfterViewInit {
  mostrarMenu = false;
  tl_IntroMenu;

  constructor( private router: Router, private analytics: GoogleAnalyticsService) { }

  ngOnInit() {
    this.tl_IntroMenu = gsap.timeline({
      paused: true
    });
  }
  ngAfterViewInit() {
    this.animaMenu();
  }

  toggleMenuGeneral() {
    this.mostrarMenu = !this.mostrarMenu;
    if (this.mostrarMenu) {
    this.tl_IntroMenu.timeScale(1).play();
    this.analytics.eventEmitter('menu-principal', 'despliega', '', '');
    } else {
      this.tl_IntroMenu.timeScale(1).reverse(2);
    }
  }


  animaMenu() {
    this.tl_IntroMenu.to(
      '#fondoMenu',
      {
        duration: 1.5,
        y: '100%',
        ease: 'bounce.out'
      }).
      to(
        '.itemMenuGeral', {
        autoAlpha: 1,
        duration: 2,
        scale: 1,
        ease: 'elastic.out',
          stagger: {
            each: 0.2
        }
        }, 0.5
      );
  }

  redir( destino ) {
    // window.location.href
    this.mostrarMenu = false;
    this.tl_IntroMenu.timeScale(1).reverse(2);
    this.router.navigate([destino]);
  }

}
