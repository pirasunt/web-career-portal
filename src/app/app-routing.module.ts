import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeLoginComponent } from './login/employee-login/employee-login.component';
import { EmployerLoginComponent } from './login/employer-login/employer-login.component';
import { AdminLoginComponent } from './login/admin-login/admin-login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import {AuthGuard} from 'src/app/auth.guard';
import { HomeComponent } from './home/home.component';
import { AccountChangeComponent } from './account-change/account-change.component';

const routes: Routes = [
  { path: 'login', component: EmployeeLoginComponent },
  { path: 'emp-login', component:EmployerLoginComponent},
  { path: 'admin-login', component: AdminLoginComponent},
  {path : 'create-account', component: CreateAccountComponent},
  {path : 'account-change', component: AccountChangeComponent, canActivate:[AuthGuard]},
  {path : '', component:HomeComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
