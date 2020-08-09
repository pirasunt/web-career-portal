import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-gold',
  templateUrl: './employee-gold.component.html',
  styleUrls: ['./employee-gold.component.css']
})
export class EmployeeGoldComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  user_class = "Employee Gold";

}
