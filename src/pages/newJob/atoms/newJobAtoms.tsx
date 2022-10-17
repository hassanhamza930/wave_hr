import { atom } from "recoil";

interface Question{
  question:string
}

export interface NewJobPosting{
  jobTitle:string,
  jobDescription:string,
  jobQualifications:string,
  startSalary:string,
  endSalary:string,
}

 const pageIndexAtom = atom({
    key: 'pageIndexAtom', // unique ID (with respect to other atoms/selectors)
    default: 0 as number, // default value (aka initial value)
  });

export const questionsAtom = atom({
    key: 'questionsAtom', // unique ID (with respect to other atoms/selectors)
    default: [] as Array<any> , // default value (aka initial value)
  });

export const NewJobPostingAtom= atom({
  key:"NewJobPostingAtom",
  default: {} as NewJobPosting
});


export default pageIndexAtom;