import { atom } from "recoil";
import { CompanyInformation } from "../../addNewCompany/logic/addCompany";

export const selectedCompanyAtom= atom({
    key:"selectedCompanyAtomJobsDropdown",
    default: {} as CompanyInformation
  });