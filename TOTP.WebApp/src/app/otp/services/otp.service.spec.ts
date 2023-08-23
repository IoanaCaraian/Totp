import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { OtpService } from './otp.service';
import { DateHelperService } from 'src/app/core/services/date-helper.service';
import { CurrentOtp } from '../models/current-otp.model';
import { ValidationOtp } from '../models/validation-otp.model';

describe('OtpService', () => {
  let service: OtpService;
  let client: HttpClient;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DateHelperService]
    });

    service = TestBed.inject(OtpService);
    client = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate pin code', () => {
    const userId = 1;
    const mockResponse: CurrentOtp = {
      pinCode: "123456",
      remainingSeconds: 20
    };

    service.generatePinCode(userId).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const httpRequest = controller.expectOne(`api/Totp?userId=${userId}`);
    expect(httpRequest.request.method).toBe('GET');
    httpRequest.flush(mockResponse);
  });

  it('should verify pin code', () => {
    const userId = 123;
    const pinCode = '123456';
    const mockResponse: ValidationOtp = {
      isCodeValid: true
    };

    service.verifyPinCode(userId, pinCode).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = controller.expectOne('api/Totp');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      userId: userId,
      pinCode: pinCode,
      utcDateTime: jasmine.any(String) 
    });
    req.flush(mockResponse);
  });
});
