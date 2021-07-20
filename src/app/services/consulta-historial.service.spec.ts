import { TestBed } from '@angular/core/testing';

import { ConsultaHistorialService } from './consulta-historial.service';

describe('ConsultaHistorialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsultaHistorialService = TestBed.get(ConsultaHistorialService);
    expect(service).toBeTruthy();
  });
});
