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
    location: string,
    typeOfJob: string, //full time / part time
    jobSite: string, //remote/ hybrid/ on site
}


export interface CompanyDataInterface {
    id?: string,
    companyOwnerId?: string,
    companyLogo: string,
    companyCover: string,
    companyName: string,
    companyDescription: string,
    companyTags: Array<string>,
    numberOfEmployees: string,
    companyLocation: string
}


export interface ApplicationDataInterface {
    id?: string;
    name: string;
    email: string;
    profilePicture: string;
    resume: string;
    responses: Array<QuestionResponse>;
    rating?: number;
    notes?: string;
    applicationStatus?: string;
    interviewInviteSent: boolean;
    applicationTime: Timestamp;
}


export interface QuestionResponse {
    question: string;
    answer: string;
}