import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeLoginComponent } from './login/employee-login/employee-login.component';
import { EmployerLoginComponent } from './login/employer-login/employer-login.component';
import { AdminLoginComponent } from './login/admin-login/admin-login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import {AuthGuard} from 'src/app/auth.guard';
import { HomeComponent } from './home/home.component';
import { EmployerPrimeComponent } from './dashboards/employer-prime/employer-prime.component';
import { EmployerGoldComponent } from './dashboards/employer-gold/employer-gold.component';
import { EmployeeBasicComponent } from './dashboards/employee-basic/employee-basic.component';
import { EmployeePrimeComponent } from './dashboards/employee-prime/employee-prime.component';
import { EmployeeGoldComponent } from './dashboards/employee-gold/employee-gold.component';
import { AdminDashboardComponent } from './dashboards/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: 'login', component: EmployeeLoginComponent },
  { path: 'emp-login', component:EmployerLoginComponent},
  { path: 'admin-login', component: AdminLoginComponent},
  {path : 'create-account', component: CreateAccountComponent},

  {path : 'admin-dashboard', component: AdminDashboardComponent},
  {path : 'employee-basic', component: EmployeeBasicComponent},
  {path : 'employee-gold', component: EmployeeGoldComponent},
  {path : 'employee-prime', component: EmployeePrimeComponent},
  {path : 'employer-gold', component: EmployerGoldComponent},
  {path : 'employer-prime', component: EmployerPrimeComponent},

  {path : '', component:HomeComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
