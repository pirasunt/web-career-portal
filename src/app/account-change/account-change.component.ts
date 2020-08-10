import { Component, OnInit } from '@angular/core';
import { SiteUser } from '../models/site-user';
import { UserService } from '../services/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { RequestMakerService } from '../services/request-maker.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-account-change',
  templateUrl: './account-change.component.html',
  styleUrls: ['./account-change.component.css']
})
export class AccountChangeComponent implements OnInit {

  constructor(private userService: UserService, private requestMaker: RequestMakerService, private router: Router, private authService: AuthService) {

  }

  siteUser: SiteUser
  editProfile: FormGroup
  name: FormControl
  email: FormControl
  password: FormControl
  phone: FormControl
  qualifications: FormControl
  industry: FormControl
  isSubmitted: boolean = false;
  logoutRequired: boolean = false;

  ngOnInit(): void {

    this.siteUser = this.userService.getSiteUser()

    if (this.siteUser.userType == "EMPLOYEE") {
      this.editProfile = new FormGroup({
        name: new FormControl(this.siteUser.fullName),
        email: new FormControl(this.siteUser.email),
        password: new FormControl(this.siteUser.accPassword),
        phone: new FormControl(this.siteUser.telephoneNum),
        qualifications: new FormControl(this.siteUser.employee.qualifications),
        industry: new FormControl('')
      })
    }

    if (this.siteUser.userType == "EMPLOYER") {
      this.editProfile = new FormGroup({
        name: new FormControl(this.siteUser.fullName),
        email: new FormControl(this.siteUser.email),
        password: new FormControl(this.siteUser.accPassword),
        phone: new FormControl(this.siteUser.telephoneNum),
        qualifications: new FormControl(''),
        industry: new FormControl(this.siteUser.employer.industry)
      })
    }
  }

  onSubmit() {

    var deepCopyUser: SiteUser = JSON.parse(JSON.stringify(this.siteUser))

    deepCopyUser.fullName = this.editProfile.get("name").value
    deepCopyUser.email = this.editProfile.get("email").value
    deepCopyUser.accPassword = this.editProfile.get("password").value
    deepCopyUser.telephoneNum = this.editProfile.get("phone").value
    if (this.siteUser.userType == "EMPLOYEE")
      deepCopyUser.employee.qualifications = this.editProfile.get("qualifications").value

    if (this.siteUser.userType == "EMPLOYER")
      deepCopyUser.employer.industry = this.editProfile.get("industry").value

    this.requestMaker.updateUser(this.siteUser.email, deepCopyUser).subscribe(resp => {
      this.isSubmitted = true
      this.authService.refresh(deepCopyUser);
    })
  }

  closePrompt() {
    setTimeout(() => {
      this.editProfile.reset()
      this.isSubmitted = false;
      location.reload();
    }, 1000)
  }


  private reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['']);
  }

  goTo(arg:string){
    this.router.navigate(["/" + arg])
  }

}
