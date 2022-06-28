import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppheaderComponent } from './shared/appheader/appheader.component';
import { SharedModule } from './modules/shared/shared.module';
import { UserRegistationComponent } from './pages/user-registation/user-registation.component';
import { AuthGuardService } from './services/auth-guard.service';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { ErrorInterceptorService } from './services/error-interceptor.service';
import { ManageAirlineComponent } from './pages/manage-airline/manage-airline.component';
import { ManageScheduleComponent } from './pages/manage-schedule/manage-schedule.component';
import { ManageDiscountComponent } from './pages/manage-discount/manage-discount.component';
import { ManageBookingComponent } from './pages/manage-booking/manage-booking.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AddAirlineComponent } from './pages/manage-airline/add-airline/add-airline.component';
import { AddDiscountComponent } from './pages/manage-discount/add-discount/add-discount.component';
import { ManageBookingHistoryComponent } from './pages/manage-booking-history/manage-booking-history.component';
import { FlightBookingComponent } from './pages/flight-booking/flight-booking.component';
import { AddScheduleComponent } from './pages/manage-schedule/add-schedule/add-schedule.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { SnackBarComponent } from './shared/snack-bar/snack-bar.component';
import { Helper } from './shared/helper';
import { AddPassengerComponent } from './pages/flight-booking/add-passenger/add-passenger.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppheaderComponent,
    UserRegistationComponent,
    ManageAirlineComponent,
    ManageScheduleComponent,
    ManageDiscountComponent,
    ManageBookingComponent,
    AddAirlineComponent,
    AddDiscountComponent,
    ManageBookingHistoryComponent,
    FlightBookingComponent,
    AddScheduleComponent,
    ConfirmDialogComponent,
    SnackBarComponent,
    AddPassengerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    JwtModule
  ],
  providers: [
    AuthGuardService, Helper,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
