import { TestBed } from '@angular/core/testing';

import { QoranService } from './qoran.service';

describe('QoranService', () => {
  let service: QoranService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QoranService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
