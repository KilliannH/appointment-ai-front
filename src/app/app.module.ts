import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MaterialModule} from './material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import {FormsModule} from '@angular/forms';
import {JwtInterceptor} from './helpers/jwt.interceptor';
import {ErrorInterceptor} from './helpers/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    AppointmentDetailsComponent,
    AddAppointmentComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
