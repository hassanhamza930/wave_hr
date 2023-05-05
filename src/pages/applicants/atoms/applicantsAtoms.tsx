import { atom } from 'recoil';
import { JobApplication } from '../../apply/atoms/applyPageAtoms';
import { ApplicationDataInterface } from '../../../standards/interfaces/interfaces';

 export const selectedApplicantDataAtom = atom({
    key: 'selectedApplicantDataAtom', // unique ID (with respect to other atoms/selectors)
    default: {} as ApplicationDataInterface, // default value (aka initial value)
  });

  export const selectedApplicantIdAtom=atom({
    key: 'selectedApplicantIdAtom', // unique ID (with respect to other atoms/selectors)
    default: "" as string, 
  })