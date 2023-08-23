import { TestBed } from '@angular/core/testing';

import { DateHelperService } from './date-helper.service';

describe('DateHelperService', () => {
  let service: DateHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateHelperService]
    });
    service = TestBed.inject(DateHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get current time in UTC format', () => {
    const now = new Date('2023-08-08T10:10:10Z');
    spyOn<any>(service, "getNowUTC").and.returnValue(now);

    const formattedDate = service.getFormattedNowUTC();
    expect(formattedDate).toContain('08/08/2023');
  });
});
