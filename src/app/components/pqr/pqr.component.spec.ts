import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PqrComponent } from './pqr.component';

describe('PqrComponent', () => {
  let component: PqrComponent;
  let fixture: ComponentFixture<PqrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PqrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
