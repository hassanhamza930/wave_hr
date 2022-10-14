import { atom } from "recoil";
import { JobData, JobPosting } from "./components/JobCard";

export const selectedJobAtom = atom({
    key: 'selectedJob', // unique ID (with respect to other atoms/selectors)
    default: {} as JobPosting, // default value (aka initial value)
  });
