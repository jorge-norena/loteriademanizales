import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { Router, NavigationEnd } from '@angular/router';
declare let gtag: (x: any, y: any, z: any) => void;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'loteriademanizales';
  env = environment;
  constructor( public router: Router ) {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'UA-9187837-1', { page_path: event.urlAfterRedirects});
       }
    });
  }
}
