import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { RequestMakerService } from './request-maker.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/services/user.service'
import { SiteUser } from '../models/site-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  private token: string;

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router, private server: RequestMakerService, public jwtHelper: JwtHelperService, private userService:UserService) {
    const userData = localStorage.getItem('user');
    if (userData) {
      console.log('Logged in from memory');
      const user = JSON.parse(userData);
      this.token = user.token;
      this.server.setLoggedIn(true, this.token);
      this.loggedIn.next(true);
      this.userService.initializeUser(user.userData);

    }
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  login(user, type:string) {
    if (user.email !== '' && user.password !== '' ) {
      return this.server.request('POST', '/login', {
        email: user.email,
        password: user.password,
        type:type

      }).subscribe((response: any) => {
        if (response.auth === true && response.token !== undefined) {
          if((type == "employee" && !!response.u.isActive) || type == "employer" || type=="admin"){
            console.log("in login")
          this.userService.initializeUser(response.u)
          this.token = response.token;
          this.server.setLoggedIn(true, this.token);
          this.loggedIn.next(true);
          const tokenStorage = {
            token: this.token,
          };
          const userData = {
            userData:response.u
          }
          console.log(userData)
          localStorage.setItem('token', JSON.stringify(tokenStorage)); //save the login token in user's local storage. Valid for 24hours
          localStorage.setItem('user', JSON.stringify(userData)); //saves login info to local storage
          this.router.navigateByUrl('/');
        }
        else {
          alert("Your account has been disabled")
        }
        }
      });
    }
  }

  refresh(user:SiteUser) {

    if(user.userType =="EMPLOYER") {
      localStorage.setItem('user', JSON.stringify({
        userData:{
          accountBalance:user.accountBalance,
          email: user.email,
          employerCategory: user.employer.category,
          employerIndustry: user.employer.industry,
          fullName: user.fullName,
          password: user.accPassword,
          telephoneNum: user.telephoneNum,
          userType: user.userType,
        }
      }));
    }

    if(user.userType =="EMPLOYEE") {

      localStorage.setItem('user', JSON.stringify({
        userData:{
          accountBalance:user.accountBalance,
          email: user.email,
          employeeCategory: user.employee.category,
          fullName: user.fullName,
          isActive:user.employee.isActive,
          password: user.accPassword,
          qualifications: user.employee.qualifications,
          telephoneNum: user.telephoneNum,
          userType: user.userType,
        }
      }));

    }
  }

  logout() {
    this.server.setLoggedIn(false);
    delete this.token;
  
    this.loggedIn.next(false);
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
