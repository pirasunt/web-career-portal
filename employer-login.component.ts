import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private router:Router, private authService:AuthService) { }

  ngOnInit(): void {
  }

  goTo(arg:string){
    this.router.navigate(["/" + arg])

  }

  onSubmit() {
    console.log("hi")
    this.authService.login({
      email: this.loginForm.get("email").value,
      password:this.loginForm.get("password").value,
    }, "employer")
  }
}
