import { TestBed } from '@angular/core/testing';

import { OpenaiService } from './openai.service';

describe('OpenaiServiceService', () => {
  let service: OpenaiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenaiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
