import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeLoginComponent } from './login/employee-login/employee-login.component';
import { EmployerLoginComponent } from './login/employer-login/employer-login.component';
import { AdminLoginComponent } from './login/admin-login/admin-login.component';
import { LoginToolbarComponent } from './login/login-toolbar/login-toolbar.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import {HttpClientModule} from '@angular/common/http'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeLoginComponent,
    EmployerLoginComponent,
    AdminLoginComponent,
    LoginToolbarComponent,
    CreateAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
