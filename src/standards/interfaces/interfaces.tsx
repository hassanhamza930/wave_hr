import { Timestamp } from "firebase/firestore";
import { DateLocalizer } from "react-big-calendar";

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

export interface UserDataInterface {
  id?: string;
  name: string | null;
  photoUrl: string | null;
  email: string | null;
  interviewsSetup?: boolean; //this will be used to check if the user has setup their interviews settings later down the road
  calendlyLink?: string; //this will be the link to the users calendly account, the functionality of this is still vague so you can ignore it for now.
}

export interface QuestionResponse {
  question: string;
  answer: string;
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
}

export interface AllSelectedDayAndTimeInterface {
  Monday: TimeSlot[];
  Tuesday: TimeSlot[];
  Wednesday: TimeSlot[];
  Thursday: TimeSlot[];
  Friday: TimeSlot[];
  Saturday: TimeSlot[];
  Sunday: TimeSlot[];
}
export interface Event {
  id: number;
  start: Date;
  end: Date;
  title: string;
  description?: string;
  color?: string;
}

export interface CalenderComponentInterface {
  events: Event[];
  localizer: DateLocalizer;
}
