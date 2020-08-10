import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../models/job';
import { Router } from '@angular/router';
import { RequestMakerService } from '../services/request-maker.service';
import { Application } from '../models/application';
import { SiteUser } from '../models/site-user';

@Component({
  selector: 'app-job-thumbnail',
  templateUrl: './job-thumbnail.component.html',
  styleUrls: ['./job-thumbnail.component.css']
})
export class JobThumbnailComponent implements OnInit {

  constructor(private router:Router, private requestMaker: RequestMakerService) { 
    
  }

  @Input() job:Job;
  @Input() siteUser:SiteUser;
  @Input() applications?:Application[]; //current user's applied jobs
  numberOfApplicants?:number= 0;
  currentUserAppliedJobs:Application[]=[];
  currentUserJobIDs:number[]=[]
  applicationDate:Date;
  modalBody:string = `Are you sure you want to delete? <b>(This action can not be undone)</b>`
  deleteButtonVisible:boolean = true


  ngOnInit(): void {
    if(this.siteUser.userType== "EMPLOYEE"){
      this.applications.forEach(val => {
        if(val.email == this.siteUser.email){
        this.currentUserAppliedJobs.push(val)
        this.currentUserJobIDs.push(val.jobID)
        }
      })

      this.getApplicationDate();
    }

    if(this.siteUser.userType== "EMPLOYER") {
      var count = 0;

      this.applications.forEach(val => {
        if(val.jobID == this.job.jobID){
          count++;
        }
      })

      this.numberOfApplicants = count;

    }
  }


  didUserApply():boolean {  
    return this.currentUserJobIDs.includes(this.job.jobID)
  }

  cancelApplication() {
    this.requestMaker.cancelApplication(this.siteUser.email, this.job.jobID).subscribe(resp => {
      alert("Application deleted")
      this.reloadComponent()
    })
  }

  sendApplication() {
    if(this.siteUser.employee.category == "BASIC" || (this.siteUser.employee.category =="PRIME" && this.currentUserAppliedJobs.length >= 5)) {

      if(this.siteUser.employee.category =="BASIC"){
        alert("Your membership does not allow you to apply for jobs ")
      } else {
        alert("You have reached your limit of 5 job applications")
      }
     
    } else
    this.requestMaker.sendApplication(this.siteUser.email, this.job.jobID).subscribe(resp => {
      alert("Application sent to Employer")
      this.reloadComponent()
    })
  }

  getApplicationDate() {
    this.currentUserAppliedJobs.forEach(val => {
      if(val.jobID == this.job.jobID) {
        this.applicationDate = val.applicationDate
      }
    })
  }


  deleteJob(id:number) {

    this.requestMaker.deleteJob(id).subscribe((resp) => {
      this.modalBody = "Job has been deleted"
      this.deleteButtonVisible = false;
    })
  }

  private reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['']);
}

closeModal() {
    this.deleteButtonVisible = true;
    this.reloadComponent()

}

}
