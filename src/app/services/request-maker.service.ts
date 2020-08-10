import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SiteUser } from '../models/site-user';
import {Job} from '../models/job'
import {Application} from '../models/application'
import { CreditCard } from '../models/credit-card';
import { ChequingAccount } from '../models/chequing-account';

const api = "http://localhost:8080" //server address + port
@Injectable({
  providedIn: 'root'
})
export class RequestMakerService {

  private loggedIn = false;
  private token: string;
  constructor(private http:HttpClient) { }

  createAccount(user:SiteUser) {
    return this.http.post<SiteUser>(api + "/createUser", user, { observe: 'response' }).pipe(
      catchError(this.regErr));
  }

  getJobs():Observable<Job[]> {
    return this.http.get<Job[]>(api + "/getJobs")
  }

  createJob(data:any){
    return this.http.post(api + "/createJob", data).pipe(
      catchError(this.createJobErr));
  }

  deleteJob(jobID:number) {
    return this.http.post(api + "/deleteJob", {id:jobID}).pipe(
      catchError(this.delJobErr));
  }

  getApplications():Observable<Application[]>{
    return this.http.get<Application[]>(api + "/getApplications")
  }

  cancelApplication(userEmail:string, id:number){
    return this.http.post(api + "/cancelApplication", {email:userEmail, jobID:id})
  }

  sendApplication(userEmail:string, id:number){
    return this.http.post(api + "/sendApplication", {email:userEmail, jobID:id})
  }

  updateUser(email:string, newUser:SiteUser){
    return this.http.post(api + "/updateUser", {oldEmail:email, newUserInfo:newUser})
  }
  
  getCreditCardInfo(userEmail:string):Observable<CreditCard[]> {
    return this.http.post<CreditCard[]>(api + "/getCC", {email:userEmail})
  }

  getChequingInfo(userEmail:string):Observable<ChequingAccount[]> {
    return this.http.post<ChequingAccount[]>(api + "/getChequing", {email:userEmail})
  }

  submitCredit(data:any) {
    return this.http.post(api + "/submitCredit", data)
  }


  private delJobErr(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    alert("Unknown Error Occured while deleting")
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }


  private createJobErr(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    alert("You have reached your limit of 5 job postings. Please upgrade your account to post more jobs.")
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }


  setLoggedIn(loggedIn: boolean, token?: string) {
    this.loggedIn = loggedIn;
    this.token = token;
  }

  request(method: string, route: string, data?: any) {

    const header = (this.loggedIn) ? { Authorization: `Bearer ${this.token}` } : undefined;

    return this.http.request(method, api + route, {
      body: data,
      responseType: 'json',
      observe: 'body',
      headers: header
    }).pipe(
      catchError(this.loginErr));
  }

  private loginErr(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    alert("Invalid Credentials")
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  private regErr(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    alert("Error Occured during registration")
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
