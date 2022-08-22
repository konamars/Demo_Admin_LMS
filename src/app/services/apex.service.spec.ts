import { TestBed } from '@angular/core/testing';

import { ApexService } from './apex.service';

describe('ApexService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApexService = TestBed.get(ApexService);
    expect(service).toBeTruthy();
  });
});
