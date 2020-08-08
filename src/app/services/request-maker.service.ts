import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SiteUser } from 'src/app/models/site-user'
import { Observable } from 'rxjs';

const api = "http://localhost:8080" //server address + port
@Injectable({
  providedIn: 'root'
})
export class RequestMakerService {

  constructor(private http:HttpClient) { }

  createAccount(user:SiteUser):Observable<SiteUser> {
    return this.http.post<SiteUser>(api + "/createUser", user)
  }
}
