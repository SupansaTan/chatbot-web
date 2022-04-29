import { TestBed } from '@angular/core/testing';

import { RepollGetMessageService } from './repoll-get-message.service';

describe('RepollGetMessageService', () => {
  let service: RepollGetMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepollGetMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
