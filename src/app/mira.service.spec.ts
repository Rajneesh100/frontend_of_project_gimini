import { TestBed } from '@angular/core/testing';

import { MiraService } from './mira.service';

describe('MiraService', () => {
  let service: MiraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
