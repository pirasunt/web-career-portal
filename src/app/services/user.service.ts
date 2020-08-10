import { Injectable, OnInit } from '@angular/core';
import { SiteUser } from '../models/site-user';
import { CreditCard } from '../models/credit-card';
import { ChequingAccount } from '../models/chequing-account';
import { RequestMakerService } from './request-maker.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit{

  private currentUser:SiteUser;
  creditCards$:Observable<CreditCard[]>;
  chequingAccounts$:Observable<ChequingAccount[]>;


  constructor(private requestMaker:RequestMakerService) { 
    
  }
  
  ngOnInit():void {

  }

    getPaymentInfo() {
    this.creditCards$ = this.requestMaker.getCreditCardInfo(this.currentUser.email)
    this.chequingAccounts$ = this.requestMaker.getChequingInfo(this.currentUser.email)

  }


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
        category:data.employerCategory,
        industry:data.employerIndustry,

      }
    }
  }

  console.log(this.currentUser)

  }

  //update with Deep copy
  updateUser(newUser:SiteUser){
    this.currentUser = JSON.parse(JSON.stringify(newUser))
  }

  //Returns a DEEP COPY of SiteUser
  getSiteUser():SiteUser{
    return JSON.parse(JSON.stringify(this.currentUser))
  }



}
