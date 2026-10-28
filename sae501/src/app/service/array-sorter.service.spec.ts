import { TestBed } from '@angular/core/testing';

import { ArraySorterService } from './array-sorter.service';

describe('ArraySorterService', () => {
  let service: ArraySorterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArraySorterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
