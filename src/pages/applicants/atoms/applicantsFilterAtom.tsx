import { atom } from "recoil";
import { ApplicationStatusEnum } from "../../../standards/interfaces/interfaces";




const ApplicantsFilterAtom=atom({
    key: 'ApplicantsFilterAtom', // unique ID (with respect to other atoms/selectors)
    default: "All" as ApplicationStatusEnum,
});



export default ApplicantsFilterAtom;