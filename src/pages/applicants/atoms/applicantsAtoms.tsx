import { atom } from 'recoil';
import { JobApplication } from '../../apply/atoms/applyPageAtoms';

 export const selectedApplicantAtom = atom({
    key: 'selectedApplicant', // unique ID (with respect to other atoms/selectors)
    default: {} as JobApplication, // default value (aka initial value)
  });
