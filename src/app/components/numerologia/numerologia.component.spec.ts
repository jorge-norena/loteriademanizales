import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumerologiaComponent } from './numerologia.component';

describe('NumerologiaComponent', () => {
  let component: NumerologiaComponent;
  let fixture: ComponentFixture<NumerologiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumerologiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumerologiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
