import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DateHelperService } from 'src/app/core/services/date-helper.service';
import { CurrentOtp } from '../models/current-otp.model';
import { ValidationOtp } from '../models/validation-otp.model';

@Injectable({
  providedIn: 'root'
})
export class OtpService {
  private url: string = 'api/Totp';

  constructor(
    public httpClient: HttpClient,
    public dateHelperService: DateHelperService
  ) { }
  
  public generatePinCode(userId: number): Observable<CurrentOtp> {
    const params = new HttpParams().append('userId', userId);

    return this.httpClient.get<CurrentOtp>(
      this.url,
      { responseType: 'json', params }
    );
  }

  public verifyPinCode(userId: number, pinCode: string): Observable<ValidationOtp> {
    const body = {
      userId: userId,
      pinCode: pinCode,
      utcDateTime: this.dateHelperService.getFormattedNowUTC()
    }

    return this.httpClient.post<ValidationOtp>(this.url, body);
  }
}
