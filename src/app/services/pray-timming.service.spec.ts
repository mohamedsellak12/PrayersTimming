import { TestBed } from '@angular/core/testing';

import { PrayTimmingService } from './pray-timming.service';

describe('PrayTimmingService', () => {
  let service: PrayTimmingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrayTimmingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
