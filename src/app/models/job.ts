export interface Job {
    jobID:number,
    jobTitle:string,
    jobCategory:string,
    isActive:boolean,
    postedDate?:Date,
    email:string
    fullName:string,
    salary:number
}
