import { atom } from "recoil";
import { AllSelectedDayAndTimeInterface } from "../../standards/interfaces/interfaces";

export const AllSelectedDayAndTimeAtom = atom<AllSelectedDayAndTimeInterface>({
  key: "AllSelectedDayAndTimeAtom",
  default: {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  },
});
