import { atom } from "recoil";

 const isLoadingAtom = atom({
    key: 'isLoadingAtom', // unique ID (with respect to other atoms/selectors)
    default: true as boolean, // default value (aka initial value)
  });


export default isLoadingAtom;