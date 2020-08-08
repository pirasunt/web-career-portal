import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-toolbar',
  templateUrl: './login-toolbar.component.html',
  styleUrls: ['./login-toolbar.component.css']
})
export class LoginToolbarComponent implements OnInit {


  @Input() loginType?:string;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  navigateTo(arg:string){
    this.router.navigate(["/" + arg]);


  }

}
