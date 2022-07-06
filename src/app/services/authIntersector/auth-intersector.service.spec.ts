import { TestBed } from '@angular/core/testing';

import { AuthIntersectorService } from './auth-intersector.service';

describe('AuthIntersectorService', () => {
  let service: AuthIntersectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthIntersectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
