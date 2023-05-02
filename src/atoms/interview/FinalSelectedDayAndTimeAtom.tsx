import { atom } from "recoil";
import { AllSelectedDayAndTimeInterface } from "../../standards/interfaces/interfaces";

export const FinalSelectedDayAndTimeAtom = atom<AllSelectedDayAndTimeInterface>(
  {
    key: "FinalSelectedDayAndTimeAtom",
    default: {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
    },
  }
);
