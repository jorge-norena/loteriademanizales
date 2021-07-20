import { TestBed } from '@angular/core/testing';

import { ConsultarPqrService } from './consultar-pqr.service';

describe('ConsultarPqrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsultarPqrService = TestBed.get(ConsultarPqrService);
    expect(service).toBeTruthy();
  });
});
