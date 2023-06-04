import { atom } from "recoil";

 const selectedImageAtom = atom({
    key: 'selectedImageAtom', // unique ID (with respect to other atoms/selectors)
    default: "" as string, // default value (aka initial value)
  });


export default selectedImageAtom;