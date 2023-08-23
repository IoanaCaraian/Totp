import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateHelperService {

  constructor() { }

  public getFormattedNowUTC(): string | null {
    const datePipe = new DatePipe('en-US');
    const utcNow = this.getNowUTC();
    const date = datePipe.transform(utcNow, 'MM/dd/yyyy hh:mm:ss a');
    return date;
  }

  private getNowUTC(): Date {
    const now = new Date();
    return new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
  }
}
