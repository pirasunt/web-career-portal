import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RequestMakerService } from 'src/app/services/request-maker.service'
import { SiteUser } from '../models/site-user';
import { Employee } from '../models/employee';
import { error } from '@angular/compiler/src/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  AccountForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    phone: new FormControl(''),
    qualifications: new FormControl('')
  })

  gotResponse: boolean;
  success: boolean;

  constructor(private requestMaker: RequestMakerService, private router: Router) {
    this.gotResponse = false
    this.success = false
  }

  ngOnInit(): void {
  }

  onSubmit() {

    var user: SiteUser = {

      email: this.AccountForm.get("email").value,
      accPassword: this.AccountForm.get("password").value,
      userType: "EMPLOYEE",
      fullName: this.AccountForm.get("name").value,
      telephoneNum: this.AccountForm.get("phone").value,
      employee: {
      category: "BASIC",
      isActive: true,
      qualifications: this.AccountForm.get("qualifications").value
      }

    }

    this.requestMaker.createAccount(user).subscribe(resp => {
      this.gotResponse = true
      if (resp.status == 200) {
        this.success = true;
        setTimeout(() => {
          this.router.navigate([""]);
        }, 3000)

      }
    })

  }

}
