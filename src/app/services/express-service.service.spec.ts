import { TestBed } from '@angular/core/testing';

import { ExpressServiceService } from './express-service.service';

describe('ExpressServiceService', () => {
  let service: ExpressServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpressServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
