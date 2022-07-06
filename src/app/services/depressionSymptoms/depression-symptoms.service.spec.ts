import { TestBed } from '@angular/core/testing';

import { DepressionSymptomsService } from './depression-symptoms.service';

describe('DepressionSymptomsService', () => {
  let service: DepressionSymptomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepressionSymptomsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
