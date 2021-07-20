import { TestBed } from '@angular/core/testing';

import { DevolService } from './devol.service';

describe('DevolService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DevolService = TestBed.get(DevolService);
    expect(service).toBeTruthy();
  });
});
