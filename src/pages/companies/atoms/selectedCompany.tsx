import { atom } from 'recoil';
import { CompanyDataInterface } from '../../../standards/interfaces/interfaces';

export const selectedCompanyAtom = atom({
  key: 'selectedCompanyAtom', // unique ID (with respect to other atoms/selectors)
  default: {} as CompanyDataInterface, // default value (aka initial value)
});
