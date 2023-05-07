import { Timestamp } from "firebase/firestore";
import { DailyTimeslotsInterface } from "../../pages/interviews/components/manageAvailability";

export interface JobDataInterface {
  id?: string;
  companyId: string;
  questions: Array<string>;
  time: Timestamp;
  postedBy?: string;
  jobTitle: string;
  jobDescription: string;
  jobQualifications: string;
  salaryCompensation: string;
  location: string;
  jobType: string; //full time / part time
  workModel: string; //remote/ hybrid/ on site
}

export interface CompanyDataInterface {
  id?: string;
  companyOwnerId?: string; // this will be the person who has created the company
  companyLogo: string; //this will be the firebase storage url for the company logo  image
  companyCover: string; //this will be the firebase storage url for the company cover image
  companyName: string;
  companyDescription: string; //description of what company does and quick history introduction.
  companyTags: Array<string>; //this will be an array of strings for example software services, SaaS, hiring software etc.
  numberOfEmployees: string; //number of employees in free text format
  companyLocation: string; // this will be location of the company in free text format
  companyWebsite?: string;
}

export enum ApplicationStatusEnum{
  pendingReview="Pending Review",
  Accepted="Accepted",
  Rejected="Rejected",
  InterviewInviteSent="Interview Invite Sent",
  DidnTShowUp="Didn't show up for interview"
}

export interface ApplicationDataInterface {
  id?: string;
  name: string;
  email: string;
  profilePicture: string;
  resume: string;
  responses: Array<QuestionResponse>;
  rating: number;
  notes?: string;
  applicationStatus?: ApplicationStatusEnum;
  interviewInviteSent: boolean;
  applicationTime: Timestamp;
}

export interface UserDataInterface {
  id?: string;
  name: string | null;
  photoUrl: string | null;
  email: string | null;
  availability?:Array<DailyTimeslotsInterface>, // in sorted order from monday to sunday
  interviewSlotTime?:string, // 15min, 30min, etc.
  timezone?:string // timezone of the user

}

export interface QuestionResponse {
  question: string;
  answer: string;
}



