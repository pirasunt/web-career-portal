import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeLoginComponent } from './login/employee-login/employee-login.component';
import { EmployerLoginComponent } from './login/employer-login/employer-login.component';
import { AdminLoginComponent } from './login/admin-login/admin-login.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeLoginComponent,
    EmployerLoginComponent,
    AdminLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
