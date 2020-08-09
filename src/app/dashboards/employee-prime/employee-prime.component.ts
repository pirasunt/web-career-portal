import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-prime',
  templateUrl: './employee-prime.component.html',
  styleUrls: ['./employee-prime.component.css']
})
export class EmployeePrimeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  user_class = "Employee Prime";

}
