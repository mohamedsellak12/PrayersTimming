import { TestBed } from '@angular/core/testing';

import { QiblaService } from './qibla.service';

describe('QiblaService', () => {
  let service: QiblaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QiblaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
