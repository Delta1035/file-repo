import { TestBed } from '@angular/core/testing';

import { IpmApiService } from './ipm-api.service';

describe('IpmApiService', () => {
  let service: IpmApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IpmApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
