import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-employer-login',
  templateUrl: './employer-login.component.html',
  styleUrls: ['./employer-login.component.css']
})
export class EmployerLoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log("hi")
    this.authService.login({
      email: this.loginForm.get("email").value,
      password:this.loginForm.get("password").value,
    }, "employer")
  }
}
