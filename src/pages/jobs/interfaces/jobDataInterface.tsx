import { Timestamp } from "firebase/firestore"

export interface JobDataInterface {
    id?: string,
    companyId: string,
    questions: Array<string>,
    time: Timestamp,
    postedBy?: string,
    jobTitle: string,
    jobDescription: string,
    jobQualifications: string,
    salaryCompensation: string,
    location:string,
    typeOfJob:string,
}