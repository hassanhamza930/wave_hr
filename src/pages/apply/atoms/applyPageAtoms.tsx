import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";
import { ApplicationDataInterface, JobDataInterface } from "../../../standards/interfaces/interfaces";

export interface QuestionResponse {
  question: string;
  answer: string;
}



export const ApplyPageIndexAtom = atom({
  key: "PageIndex", // unique ID (with respect to other atoms/selectors)
  default: 0 as number, // default value (aka initial value)
});


const JobApplicationAtom = atom({
  key: "JobApplicationAtom", // unique ID (with respect to other atoms/selectors)
  default: {} as ApplicationDataInterface, // default value (aka initial value)
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
