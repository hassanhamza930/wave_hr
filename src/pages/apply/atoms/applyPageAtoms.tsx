import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";
import { JobPosting } from "../../jobs/components/JobCard";

export interface QuestionResponse {
    question: string,
    answer: string
}

export interface JobApplication {
  id?:string,
  name: string,
  email: string,
  profilePicture: string,
  resume: string,
  responses:Array<QuestionResponse>,
  rating?:number,
  notes?:string
}

export const ApplyPageIndexAtom = atom({
  key: 'PageIndex', // unique ID (with respect to other atoms/selectors)
  default: 0 as number, // default value (aka initial value)
});

export const SelectedJobIdAtom = atom({
  key: 'selectedJobIdAtom', // unique ID (with respect to other atoms/selectors)
  default: "" as string, // default value (aka initial value)
});

const JobApplicationAtom = atom({
  key: 'JobApplicationAtom', // unique ID (with respect to other atoms/selectors)
  default: {} as JobApplication, // default value (aka initial value)
});

export const ResponsesAtom= atom({
  key:"ResponsesAtom",
  default: [] as Array<QuestionResponse>
})



export const jobDataAtom = atom({
  key: "JobDataAtom",
  default: {
    jobDetails: {
      jobDescription: "",
      jobQualifications: "",
      endSalary: "",
      jobTitle: "",
      startSalary: ""
    },
    questions: [] as Array<string>,
    time: Timestamp.now(),
    posedBy: ""
  } as JobPosting
})

export const selectedProfilePictureAtom = atom({
  key: "selectedProfilePictureAtom",
  default: "" as string
})


export const selectedResumeAtom = atom({
  key: "selectedResumeAtom",
  default: "" as string
})

export const ApplyStageInitiatedAtom = atom({
  key: "ApplyStageInitiatedAtom",
  default: false as boolean
})


export default JobApplicationAtom;