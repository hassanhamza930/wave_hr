import { atom } from "recoil";

const selectDayModalAtom = atom({
  key: "selectDayModalAtom", // unique ID (with respect to other atoms/selectors)
  default: false as boolean, // default value (aka initial value)
});

export default selectDayModalAtom;
