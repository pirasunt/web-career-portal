import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { SiteUser } from '../models/site-user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService:UserService) { }

  siteUser:SiteUser
  ngOnInit(): void {
    this.siteUser = this.userService.getSiteUser()
  }

}
