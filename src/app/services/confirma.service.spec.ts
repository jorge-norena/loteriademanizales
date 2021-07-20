import { TestBed } from '@angular/core/testing';

import { ConfirmaService } from './confirma.service';

describe('ConfirmaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfirmaService = TestBed.get(ConfirmaService);
    expect(service).toBeTruthy();
  });
});
