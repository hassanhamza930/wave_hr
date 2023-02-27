import { atom } from "recoil";
import { CompanyDataInterface } from "../../../standards/interfaces/interfaces";

export const selectedCompanyAtom= atom({
    key:"selectedCompanyAtomJobsDropdown",
    default: {} as CompanyDataInterface
  });