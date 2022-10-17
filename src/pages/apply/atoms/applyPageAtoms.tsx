import { atom } from "recoil";


export interface JobApplication{
    name:string,
    email:string,
    profilePicture:string,
    questions:Array<string>,
    resume:string
}

const PageIndex = atom({
    key: 'PageIndex', // unique ID (with respect to other atoms/selectors)
    default: 0 as number, // default value (aka initial value)
  });


 const JobApplicationAtom = atom({
    key: 'JobApplicationAtom', // unique ID (with respect to other atoms/selectors)
    default: {} as JobApplication, // default value (aka initial value)
  });


export const selectedProfilePictureAtom=atom({
    key:"selectedProfilePictureAtom",
    default: "" as string
  })


export const selectedResumeAtom=atom({
    key:"selectedResumeAtom",
    default: "" as string
  })


export default JobApplicationAtom;