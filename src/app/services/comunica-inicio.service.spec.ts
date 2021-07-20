import { TestBed } from '@angular/core/testing';

import { ComunicaInicioService } from './comunica-inicio.service';

describe('ComunicaInicioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComunicaInicioService = TestBed.get(ComunicaInicioService);
    expect(service).toBeTruthy();
  });
});
