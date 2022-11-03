import { atom } from "recoil";

export const SelectedCompanyLogoAtom = atom({
    key: 'SelectedCompanyLogoAtom', // unique ID (with respect to other atoms/selectors)
    default: "" as string, // default value (aka initial value)
  });

  export const NewPictureUploadedAtom = atom({
    key: 'NewPictureUploadedAtom', // unique ID (with respect to other atoms/selectors)
    default: false as boolean, // default value (aka initial value)
  }); 