import { TestBed } from '@angular/core/testing';

import { SondageStatsService } from './sondage-stats.service';

describe('SondageStatsService', () => {
  let service: SondageStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SondageStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
