import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-basic',
  templateUrl: './employee-basic.component.html',
  styleUrls: ['./employee-basic.component.css']
})
export class EmployeeBasicComponent implements OnInit {

  constructor() { }
  

  ngOnInit(): void {
  }

  user_class = "Employee Basic";

}
