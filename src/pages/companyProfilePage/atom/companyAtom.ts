import { atom } from 'recoil';
import {
  CompanyDataInterface,
  JobDataInterface,
} from '../../../standards/interfaces/interfaces';

export const companyAtom = atom({
  key: 'companyAtom',
  default: {
    company: {} as CompanyDataInterface,
    companyJobs: [] as JobDataInterface[],
    filteredCompanyJobs: [] as JobDataInterface[],
  },
});
