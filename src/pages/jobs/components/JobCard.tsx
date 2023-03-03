import { collection, getDoc, getDocs, getFirestore, onSnapshot, query, Timestamp, where } from "firebase/firestore"
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import CalculateTimeDiff from "../../../standards/functions/calculateTimeDiff";
import { JobDataInterface } from "../../../standards/interfaces/interfaces";
import { jobDataAtom } from "../../apply/atoms/applyPageAtoms";
import { NewJobPosting } from "../../newJob/atoms/newJobAtoms"
import { selectedJobAtom } from "../jobsAtoms";



export default function JobCard(props:JobDataInterface) {

    const [applicants,setApplicants]=useState(0);
    const [selectedJob, setSelectedJob] = useRecoilState(selectedJobAtom);
    const db=getFirestore();

  
    useEffect(()=>{
        onSnapshot(query(collection(db,"jobs",props.id!,"applications"),where("applicationStatus","!=","rejected")),(docs)=>{
            setApplicants(docs.docs.length);    
        })
    },[])
    

    return (
        <button key={Timestamp.now().toMillis().toString()} onClick={()=>{setSelectedJob(props)}} className="text-black text-left w-full border-2 rounded-xl hover:bg-blue hover:text-tan border-black flex flex-col justify-start items-start p-4">            
            <div className="text-3xl font-bold">{props.jobTitle}</div>
            <div className="text-sm mt-1 font-regular">{CalculateTimeDiff(props.time.toDate())}</div>
            <div className="mt-3 w-full flex flex-row justify-end items-end text-md font-regular">{applicants} Applicant{applicants>1?"s":""}</div>
        </button>
    )
}
