import { Component, OnInit } from '@angular/core';
import { ConsultaPlanService } from 'src/app/services/consulta-plan.service';

@Component({
  selector: 'app-plan-premios',
  templateUrl: './plan-premios.component.html',
  styleUrls: ['./plan-premios.component.sass']
})
export class PlanPremiosComponent implements OnInit {
  arrPp1 = [];
  arrPp2 = [];
  arrPp3 = [];
  arrPp4 = [];
  arrAd = [];
  cargando = true;

  constructor( private servConsultaPlan: ConsultaPlanService) { }

  ngOnInit() {
    this.consultaPlan();
  }

  consultaPlan() {
    this.cargando = true;
    this.servConsultaPlan.connectService().subscribe( (respPlan: any) => {
      this.servConsultaPlan = respPlan;
      this.cargando = false;
      this.arrPp1 = respPlan.pp1;
      this.arrPp2 = respPlan.pp2;
      this.arrPp3 = respPlan.pp3;
      this.arrPp4 = respPlan.pp4;
      this.arrAd = respPlan.adicional;
      console.log(respPlan.pp1);
    });
  }

}
