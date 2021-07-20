import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineaResultadosComponent } from './linea-resultados.component';

describe('LineaResultadosComponent', () => {
  let component: LineaResultadosComponent;
  let fixture: ComponentFixture<LineaResultadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineaResultadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineaResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
