import { atom } from "recoil";

const SelectStartTimeModalAtom = atom({
  key: "SelectStartTimeModalAtom", // unique ID (with respect to other atoms/selectors)
  default: false as boolean, // default value (aka initial value)
});

export default SelectStartTimeModalAtom;
