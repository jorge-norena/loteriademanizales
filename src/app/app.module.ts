import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MantenimientoComponent } from './components/mantenimiento/mantenimiento.component';
import { ResultadosComponent } from './components/resultados/resultados.component';
import { TimerComponent } from './components/timer/timer.component';
import { LineaResultadosComponent } from './components/linea-resultados/linea-resultados.component';
import { LineaNovedadComponent } from './components/linea-novedad/linea-novedad.component';
import { BotonComprarComponent } from './components/boton-comprar/boton-comprar.component';
import { MenuGeneralComponent } from './components/menu-general/menu-general.component';
import { PieComponent } from './components/pie/pie.component';
import { PrecargaComponent } from './components/precarga/precarga.component';
import { TransparenciaComponent } from './components/transparencia/transparencia.component';
import { DevolucionesComponent } from './components/devoluciones/devoluciones.component';
import { InstitucionalComponent } from './components/institucional/institucional.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { PqrComponent } from './components/pqr/pqr.component';
import { PlanPremiosComponent } from './components/plan-premios/plan-premios.component';
import { NumerologiaComponent } from './components/numerologia/numerologia.component';
import { ContratacionComponent } from './components/contratacion/contratacion.component';
import { ParticlesModule } from 'angular-particle';
import { HistorialPremiosComponent } from './components/historial-premios/historial-premios.component';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    MantenimientoComponent,
    ResultadosComponent,
    TimerComponent,
    LineaResultadosComponent,
    LineaNovedadComponent,
    BotonComprarComponent,
    MenuGeneralComponent,
    PieComponent,
    PrecargaComponent,
    TransparenciaComponent,
    DevolucionesComponent,
    InstitucionalComponent,
    ContactoComponent,
    PqrComponent,
    PlanPremiosComponent,
    NumerologiaComponent,
    ContratacionComponent,
    HistorialPremiosComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    ParticlesModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
