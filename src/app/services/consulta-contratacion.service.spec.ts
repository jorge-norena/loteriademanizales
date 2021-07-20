import { TestBed } from '@angular/core/testing';

import { ConsultaContratacionService } from './consulta-contratacion.service';

describe('ConsultaContratacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsultaContratacionService = TestBed.get(ConsultaContratacionService);
    expect(service).toBeTruthy();
  });
});
