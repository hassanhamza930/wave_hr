import { atom } from "recoil";
import { CompanyData } from '../../pages/apply/ui/apply';

export interface UserInterface{
    name:string|null,
    photoUrl:string|null,
    email:string|null,
    companyOnboarded:boolean|null,
    companyDetails:CompanyData
}


 const globalUserAtom = atom({
    key: 'globalUserAtom', // unique ID (with respect to other atoms/selectors)
    default: {} as UserInterface, // default value (aka initial value)
  });


export default globalUserAtom;