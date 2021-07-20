import { TestBed } from '@angular/core/testing';

import { ConsultaPlanService } from './consulta-plan.service';

describe('ConsultaPlanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsultaPlanService = TestBed.get(ConsultaPlanService);
    expect(service).toBeTruthy();
  });
});
