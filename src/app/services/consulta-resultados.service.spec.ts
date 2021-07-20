import { TestBed } from '@angular/core/testing';

import { ConsultaResultadosService } from './consulta-resultados.service';

describe('ConsultaResultadosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsultaResultadosService = TestBed.get(ConsultaResultadosService);
    expect(service).toBeTruthy();
  });
});
