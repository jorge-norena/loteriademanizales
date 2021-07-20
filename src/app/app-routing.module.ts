import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { MantenimientoComponent } from './components/mantenimiento/mantenimiento.component';
import { TransparenciaComponent } from './components/transparencia/transparencia.component';
import { DevolucionesComponent } from './components/devoluciones/devoluciones.component';
import { InstitucionalComponent } from './components/institucional/institucional.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { PqrComponent } from './components/pqr/pqr.component';
import { PlanPremiosComponent } from './components/plan-premios/plan-premios.component';
import { NumerologiaComponent } from './components/numerologia/numerologia.component';
import { ContratacionComponent } from './components/contratacion/contratacion.component';
import { HistorialPremiosComponent } from './components/historial-premios/historial-premios.component';


const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'institucional', component: InstitucionalComponent },
  { path: 'transparencia', component: TransparenciaComponent },
  { path: 'contratacion', component: ContratacionComponent },
  { path: 'devoluciones', component: DevolucionesComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'resultados', component: HistorialPremiosComponent },
  { path: 'numerologia', component: NumerologiaComponent },
  { path: 'pqr', component: PqrComponent },
  { path: 'plan-premios', component: PlanPremiosComponent },
  // { path: 'path3', component: Name3Component },
  // { path: 'path4', component: Name4Component },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {

    enableTracing: false,
    scrollPositionRestoration: 'top',
    useHash: true

})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
