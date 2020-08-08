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


  initializeUser(type:string, data:any){

  if(type == "employee") {
    this.currentUser = {
      email: data.email,
      accPassword : data.password,
      userType: type,
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

  console.log(this.currentUser)

  }

  //Returns a DEEP COPY of SiteUser
  getSiteUser():SiteUser{
    return JSON.parse(JSON.stringify(this.currentUser))
  }



}
