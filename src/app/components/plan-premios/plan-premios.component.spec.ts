import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanPremiosComponent } from './plan-premios.component';

describe('PlanPremiosComponent', () => {
  let component: PlanPremiosComponent;
  let fixture: ComponentFixture<PlanPremiosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanPremiosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanPremiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
