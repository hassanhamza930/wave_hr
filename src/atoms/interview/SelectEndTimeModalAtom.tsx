import { atom } from "recoil";

const SelectEndTimeModalAtom = atom({
  key: "SelectEndTimeModalAtom", // unique ID (with respect to other atoms/selectors)
  default: false as boolean, // default value (aka initial value)
});

export default SelectEndTimeModalAtom;
