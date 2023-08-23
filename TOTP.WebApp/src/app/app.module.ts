import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OtpComponent } from './otp/components/otp.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { HttpErrorHandlerInterceptor } from './core/interceptors/http-error-handler.interceptor';


const matModules = [
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  MatInputModule,
  MatSlideToggleModule,
  MatFormFieldModule,
];

@NgModule({
  declarations: [
    AppComponent,
    OtpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ...matModules
  ],
  exports: [
    ...matModules
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorHandlerInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
