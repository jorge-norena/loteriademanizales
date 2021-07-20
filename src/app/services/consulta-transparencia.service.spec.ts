import { TestBed } from '@angular/core/testing';

import { ConsultaTransparenciaService } from './consulta-transparencia.service';

describe('ConsultaTransparenciaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsultaTransparenciaService = TestBed.get(ConsultaTransparenciaService);
    expect(service).toBeTruthy();
  });
});
