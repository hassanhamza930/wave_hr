import { atom } from 'recoil';
import { JobDataInterface } from '../../../standards/interfaces/interfaces';

export const selectedJobAtom = atom({
  key: 'selectedJobAtom',
  default: {} as JobDataInterface,
});
