import { TestBed } from '@angular/core/testing';

import { TimesFromToService } from './times-from-to.service';

describe('TimesFromToService', () => {
  let service: TimesFromToService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimesFromToService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
