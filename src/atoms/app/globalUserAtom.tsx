import { atom } from "recoil";

export interface UserInterface{
    name:string|null,
    photoUrl:string|null,
    email:string|null,
    companyOnboarded:boolean|null
}


 const globalUserAtom = atom({
    key: 'globalUserAtom', // unique ID (with respect to other atoms/selectors)
    default: {} as UserInterface, // default value (aka initial value)
  });


export default globalUserAtom;