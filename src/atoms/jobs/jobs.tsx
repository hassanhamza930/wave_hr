import { atom } from "recoil";

 const isPostJobModalOpenAtom = atom({
    key: 'isPostJobModalOpenAtom', // unique ID (with respect to other atoms/selectors)
    default: false as boolean, // default value (aka initial value)
  });


export default isPostJobModalOpenAtom;