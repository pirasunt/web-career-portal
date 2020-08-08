import { EmployeeLoginComponent } from '../login/employee-login/employee-login.component';
import { Employee } from './employee';
import { Employer} from './employer';

export interface SiteUser {
    email:string,
    accPassword:string,
    userType:string,
    fullName:string,
    telephoneNum:number,
    accountBalance?:number
    employee?:Employee,
    employer?: Employer
}
