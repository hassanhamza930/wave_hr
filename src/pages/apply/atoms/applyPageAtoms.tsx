import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";
import { JobDataInterface } from "../../../standards/interfaces/interfaces";

export interface QuestionResponse {
  question: string;
  answer: string;
}

export interface JobApplication {
  [key: string]: any;
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

export const ApplyPageIndexAtom = atom({
  key: "PageIndex", // unique ID (with respect to other atoms/selectors)
  default: 0 as number, // default value (aka initial value)
});

export const SelectedJobIdAtom = atom({
  key: "selectedJobIdAtom", // unique ID (with respect to other atoms/selectors)
  default: "" as string, // default value (aka initial value)
});

const JobApplicationAtom = atom({
  key: "JobApplicationAtom", // unique ID (with respect to other atoms/selectors)
  default: {} as JobApplication, // default value (aka initial value)
});

export const ResponsesAtom = atom({
  key: "ResponsesAtom",
  default: [] as Array<QuestionResponse>,
});

export const jobDataAtom = atom({
  key: "JobDataAtom",
  default: {} as JobDataInterface,
});

export const selectedProfilePictureAtom = atom({
  key: "selectedProfilePictureAtom",
  default: "" as string,
});

export const selectedResumeAtom = atom({
  key: "selectedResumeAtom",
  default: "" as string,
});

export const ApplyStageInitiatedAtom = atom({
  key: "ApplyStageInitiatedAtom",
  default: false as boolean,
});

export default JobApplicationAtom;
