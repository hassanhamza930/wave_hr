import { atom } from "recoil";

const selectedCompanyAtom = atom({
    key: 'selectedCompanyAtom', // unique ID (with respect to other atoms/selectors)
    default: "" as string, // default value (aka initial value)
  });
