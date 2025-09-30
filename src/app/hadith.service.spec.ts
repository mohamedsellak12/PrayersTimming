import { TestBed } from '@angular/core/testing';

import { HadithService } from './hadith.service';

describe('HadithService', () => {
  let service: HadithService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HadithService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
