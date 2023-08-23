import { Component, OnInit } from '@angular/core';
import { OtpService } from '../services/otp.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  protected userId: number = 0;
  protected remainingSeconds: number = 0;
  protected currentPinCode: string = '';
  protected validationPinCode: string = '';
  protected isPinCodeValid: boolean = false;
  protected verifyPinCodeSubmitted: boolean = false;

  private startGeneratePinCode: boolean = false;
  private lastSecond: number = 1;

  constructor(public otpService: OtpService) {
  }

  ngOnInit(): void {
    this.setPinCodeGenerateProcess();
  }

  protected verifyPinCode = () => {
    this.otpService.verifyPinCode(this.userId, this.validationPinCode).subscribe({
      next: data => {
        this.isPinCodeValid = data.isCodeValid
        this.verifyPinCodeSubmitted = true;
      }
    });
  }

  protected generatePinCode = () => {
    this.startGeneratePinCode = false;
    this.getPinCode();
    this.startGeneratePinCode = true;
  }

  private setPinCodeGenerateProcess() {
    setInterval(() => {
      if (!this.startGeneratePinCode) {
        return;
      }
      if (this.remainingSeconds == this.lastSecond) {
        this.getPinCode();
      }
      this.remainingSeconds--;
    }, 1000);
  }

  private getPinCode = () => {
    this.otpService.generatePinCode(this.userId)
    .subscribe({
      next: data => {
        this.currentPinCode = data.pinCode;
        this.remainingSeconds = data.remainingSeconds
      },
      error: _ => {
        this.startGeneratePinCode = false;
      }
    });
  }
}
