import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineaNovedadComponent } from './linea-novedad.component';

describe('LineaNovedadComponent', () => {
  let component: LineaNovedadComponent;
  let fixture: ComponentFixture<LineaNovedadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineaNovedadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineaNovedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
