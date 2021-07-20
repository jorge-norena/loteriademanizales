import { TestBed } from '@angular/core/testing';

import { RadicarPqrService } from './radicar-pqr.service';

describe('RadicarPqrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RadicarPqrService = TestBed.get(RadicarPqrService);
    expect(service).toBeTruthy();
  });
});
