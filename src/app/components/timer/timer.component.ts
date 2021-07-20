import { Component, Input, OnInit } from '@angular/core';
import { Subscription, Observable, timer } from 'rxjs';
// import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.sass']
})
export class TimerComponent implements OnInit {
  @Input() tiempo: number; // debe llegar en segundos
  ticks = 0;


  minutesDisplay = 0;
  hoursDisplay = 0;
  secondsDisplay = 0;
  daysDisplay = 0;
  expiro = false;

  sub: Subscription;

  ngOnInit() {
      this.startTimer();
  }

  private startTimer() {

      // const timer:any = Observable.timer(1, 1000);
      const tim = timer(1, 1000);
      this.sub = tim.subscribe(
          t => {
            // console.log('t:', t);
            this.ticks = this.tiempo - t;
            // console.log('tiks:', this.ticks);
            if (this.ticks >= 0) {
                this.secondsDisplay = this.getSeconds(this.ticks);
                this.minutesDisplay = this.getMinutes(this.ticks);
                this.hoursDisplay = this.getHours(this.ticks);
                this.daysDisplay = this.getDays( this.ticks);
            } else {
                this.expiro = true;
            }
          }
      );
  }

  private getSeconds(ticks: number) {
      return this.pad(ticks % 60);
  }

  private getMinutes(ticks: number) {
       return this.pad((Math.floor(ticks / 60)) % 60);
  }

  private getHours(ticks: number) {
      return Math.floor(ticks % (3600 * 24) / 3600);
  }

  private getDays(ticks: number) {
    return Math.floor((ticks / (3600 * 24)));
}

  private pad(digit: any) {
      return digit <= 9 ? '0' + digit : digit;
  }
}
