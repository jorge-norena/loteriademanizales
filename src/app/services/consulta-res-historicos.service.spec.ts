import { TestBed } from '@angular/core/testing';

import { ConsultaResHistoricosService } from './consulta-res-historicos.service';

describe('ConsultaResHistoricosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsultaResHistoricosService = TestBed.get(ConsultaResHistoricosService);
    expect(service).toBeTruthy();
  });
});
