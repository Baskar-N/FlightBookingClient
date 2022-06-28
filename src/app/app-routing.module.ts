import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPassengerComponent } from './pages/flight-booking/add-passenger/add-passenger.component';
import { FlightBookingComponent } from './pages/flight-booking/flight-booking.component';
import { LoginComponent } from './pages/login/login.component';
import { ManageAirlineComponent } from './pages/manage-airline/manage-airline.component';
import { ManageBookingHistoryComponent } from './pages/manage-booking-history/manage-booking-history.component';
import { ManageBookingComponent } from './pages/manage-booking/manage-booking.component';
import { ManageDiscountComponent } from './pages/manage-discount/manage-discount.component';
import { ManageScheduleComponent } from './pages/manage-schedule/manage-schedule.component';
import { UserRegistationComponent } from './pages/user-registation/user-registation.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path:'',
    redirectTo: '/login', pathMatch: 'full'
  },
  {
    path: 'login', 
    component: LoginComponent,
  },
  {
    path: 'register', 
    component: UserRegistationComponent,
  },
  {
    path: 'manage-airline', 
    component: ManageAirlineComponent,
    canActivate:[AuthGuardService],
    data:{
      role: 'Admin'
    }
  },
  {
    path: 'manage-schedule', 
    component: ManageScheduleComponent,
    canActivate:[AuthGuardService],
    data:{
      role: 'Admin'
    }
  },
  {
    path: 'manage-discount', 
    component: ManageDiscountComponent,
    canActivate:[AuthGuardService],
    data:{
      role: 'Admin'
    }
  },
  // User story
  {
    path: 'search-flight', 
    component: FlightBookingComponent,
    canActivate:[AuthGuardService],
    data:{
      role: 'User'
    },
    children: 
    [
      {
        path: 'book-flight',
        component: AddPassengerComponent,
        data:{
          role: 'User'
        },
      }
    ]
  },
  {
    path: 'manage-booking', 
    component: ManageBookingComponent,
    canActivate:[AuthGuardService],
    data:{
      role: 'User'
    }
  },
  {
    path: 'manage-booking-history', 
    component: ManageBookingHistoryComponent,
    canActivate:[AuthGuardService],
    data:{
      role: 'User'
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
