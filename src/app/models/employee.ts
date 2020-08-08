import {SiteUser} from './site-user';


export interface Employee {
    siteUser:SiteUser,
    category:string,
    isActive:boolean,
    qualifications:string
}
