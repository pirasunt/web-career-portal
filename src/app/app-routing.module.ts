import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeLoginComponent } from './login/employee-login/employee-login.component';
import { EmployerLoginComponent } from './login/employer-login/employer-login.component';
import { AdminLoginComponent } from './login/admin-login/admin-login.component';
import { CreateAccountComponent } from './create-account/create-account.component';

const routes: Routes = [
  { path: 'login', component: EmployeeLoginComponent },
  { path: 'emp-login', component:EmployerLoginComponent},
  { path: 'admin-login', component: AdminLoginComponent},
  {path : 'create-account', component: CreateAccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
