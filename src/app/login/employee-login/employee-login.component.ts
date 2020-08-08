import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css']
})
export class EmployeeLoginComponent implements OnInit {


  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private router:Router, private authService:AuthService) { }

  ngOnInit(): void {

    if(this.authService.isAuthenticated()) {
      this.router.navigate(["/"])
    }
  }

  goTo(arg:string){
    this.router.navigate(["/" + arg])

  }

  onSubmit() {
    this.authService.login({
      email: this.loginForm.get("email").value,
      password:this.loginForm.get("password").value,
    }, "employee")
  }

}
