import { TestBed } from '@angular/core/testing';

import { AobeService } from './aobe.service';

describe('AobeService', () => {
  let service: AobeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AobeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
