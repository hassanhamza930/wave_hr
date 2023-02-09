import { atom } from "recoil";
import { CompanyInformation } from "../../addNewCompany/logic/addCompany";

export const selectedCompanyAtom = atom({
    key: 'selectedCompanyAtom', // unique ID (with respect to other atoms/selectors)
    default: {} as CompanyInformation, // default value (aka initial value)
  });
