import { atom } from "recoil";

export const SelectedCompanyLogoAtom = atom({
    key: 'SelectedCompanyLogoAtom', // unique ID (with respect to other atoms/selectors)
    default: "" as string, // default value (aka initial value)
  });