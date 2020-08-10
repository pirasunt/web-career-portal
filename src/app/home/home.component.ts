import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { SiteUser } from '../models/site-user';
import { Observable } from 'rxjs';
import { Job } from '../models/job';
import { RequestMakerService } from '../services/request-maker.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Application } from '../models/application';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService, private requestMaker: RequestMakerService, private router: Router) { }

  jobs$: Observable<Job[]>;
  applications$: Observable<Application[]>
  applications: Application[] = []
  siteUser: SiteUser;
  jobForm = new FormGroup({
    jobTitle: new FormControl(),
    jobCategory: new FormControl(),
    salary: new FormControl()
  })
  isSubmitted: boolean = false;

  ngOnInit(): void {
    this.siteUser = this.userService.getSiteUser();
    this.jobs$ = this.requestMaker.getJobs();
    this.applications$ = this.requestMaker.getApplications();
    this.applications$.subscribe(val => {
      val.forEach(val => {

        this.applications.push(val);


      })


    })

  }


  onSubmit() {

    this.requestMaker.createJob({
      jobTitle: this.jobForm.get("jobTitle").value,
      jobCategory: this.jobForm.get("jobCategory").value,
      salary: this.jobForm.get("salary").value,
      email: this.userService.getSiteUser().email,
    }).subscribe(a => {
      console.log(a)
      this.isSubmitted = true;
    })

  }

  resetSubmit() {
    setTimeout(() => {
      this.jobForm.reset();
      this.isSubmitted = false;
    }, 500)
    this.reloadComponent()

  }

  private reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['']);
  }

}
