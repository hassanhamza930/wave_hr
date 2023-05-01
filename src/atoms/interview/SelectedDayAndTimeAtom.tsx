import { atom } from "recoil";

const SelectedDayAndTimeAtom = atom({
  key: "SelectedDayAndTimeAtom", // unique ID (with respect to other atoms/selectors)
  default: {
    day: "",
    startTime: "",
    endTime: "",
  }, // default value (aka initial value)
});

export default SelectedDayAndTimeAtom;
