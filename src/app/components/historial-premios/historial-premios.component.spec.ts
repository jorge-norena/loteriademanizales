import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialPremiosComponent } from './historial-premios.component';

describe('HistorialPremiosComponent', () => {
  let component: HistorialPremiosComponent;
  let fixture: ComponentFixture<HistorialPremiosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialPremiosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialPremiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
