import { Injectable } from '@angular/core';
import { SiteUser } from '../models/site-user';
import { Employee } from '../models/employee';
import { Employer } from '../models/employer';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUser:SiteUser;//Will be used to store admin, since admin itself does not have any attributes of itself



  constructor() { }


  initializeUser(data:any){

  if(data.userType == "EMPLOYEE") {
    this.currentUser = {
      email: data.email,
      accPassword : data.password,
      userType: data.userType,
      fullName: data.fullName,
      telephoneNum:data.telephoneNum,
      accountBalance:data.accountBalance,
      employee:{
        category:data.employeeCategory,
        qualifications:data.qualifications,
        isActive:(!!data.isActive)
      }
    }
  }

  if(data.userType == "EMPLOYER") {
    this.currentUser = {
      email: data.email,
      accPassword : data.password,
      userType: data.userType,
      fullName: data.fullName,
      telephoneNum:data.telephoneNum,
      accountBalance:data.accountBalance,
      employer:{
        category:data.employeeCategory,
        industry:data.employerIndustry,

      }
    }
  }

  console.log(this.currentUser)

  }

  //Returns a DEEP COPY of SiteUser
  getSiteUser():SiteUser{
    return JSON.parse(JSON.stringify(this.currentUser))
  }



}
