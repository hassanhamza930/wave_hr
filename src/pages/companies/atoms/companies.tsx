import { atom } from 'recoil';
import { CompanyDataInterface } from '../../../standards/interfaces/interfaces';

export const allUserCompanies = atom({
  key: 'allUserCompanies',
  default: {
    companies: [] as CompanyDataInterface[],
    isDataFetched: false,
  },
});
