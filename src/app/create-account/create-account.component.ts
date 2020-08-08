import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RequestMakerService } from 'src/app/services/request-maker.service'
import { SiteUser } from '../models/site-user';

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
    phone: new FormControl('')
  })

  constructor(private requestMaker: RequestMakerService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {

    var user: SiteUser = {
      email: this.AccountForm.get("email").value,
      accPassword: this.AccountForm.get("password").value,
      userType: "EMPLOYEE",
      fullName: this.AccountForm.get("name").value,
      telephoneNum: this.AccountForm.get("phone").value
    }

    this.requestMaker.createAccount(user).subscribe(resp => {
      console.log(resp)
    })

  }

}
