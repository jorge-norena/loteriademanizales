import { TestBed } from '@angular/core/testing';

import { ConsultaContactosService } from './consulta-contactos.service';

describe('ConsultaContactosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsultaContactosService = TestBed.get(ConsultaContactosService);
    expect(service).toBeTruthy();
  });
});
