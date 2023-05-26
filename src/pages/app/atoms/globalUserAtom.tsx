import { atom } from "recoil";
import { UserDataInterface } from "@interfaces/";


 const globalUserAtom = atom({
    key: 'globalUserAtom', // unique ID (with respect to other atoms/selectors)
    default: {} as UserDataInterface, // default value (aka initial value)
  });


export default globalUserAtom;