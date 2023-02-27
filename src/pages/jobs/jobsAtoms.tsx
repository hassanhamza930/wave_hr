import { atom } from "recoil";
import { JobDataInterface } from "../../standards/interfaces/interfaces";

export const selectedJobAtom = atom({
    key: 'selectedJob', // unique ID (with respect to other atoms/selectors)
    default: {} as JobDataInterface, // default value (aka initial value)
  });


  export const moreThanTwoJobsAtom = atom({
    key: 'moreThanTwoJobsAtom', // unique ID (with respect to other atoms/selectors)
    default: true as boolean, // default value (aka initial value)
  });
