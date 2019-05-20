import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AddAppointmentComponent} from './add-appointment/add-appointment.component';
import {AppointmentDetailsComponent} from './appointment-details/appointment-details.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from './guards/auth.gard';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'appointments/:id', component: AppointmentDetailsComponent, canActivate: [AuthGuard]},
  {path: 'add', component: AddAppointmentComponent, canActivate: [AuthGuard]},

  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
