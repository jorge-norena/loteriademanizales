import { TestBed } from '@angular/core/testing';

import { ConsultaSorteosService } from './consulta-sorteos.service';

describe('ConsultaSorteosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsultaSorteosService = TestBed.get(ConsultaSorteosService);
    expect(service).toBeTruthy();
  });
});
