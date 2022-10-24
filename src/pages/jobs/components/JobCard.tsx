import { collection, getDoc, getDocs, getFirestore, onSnapshot, query, Timestamp } from "firebase/firestore"
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { jobDataAtom } from "../../apply/atoms/applyPageAtoms";
import { NewJobPosting } from "../../newJob/atoms/newJobAtoms"
import { selectedJobAtom } from "../jobsAtoms";

export interface JobPosting{
    jobDetails:NewJobPosting,
    questions:Array<string>,
    time:Timestamp
    postedBy?:string
}

export interface JobData{
    jobData:JobPosting,
    id:string
}

export default function JobCard(props:JobData) {

    const [applicants,setApplicants]=useState(0);
    const [selectedJob, setSelectedJob] = useRecoilState(selectedJobAtom);
    const db=getFirestore();

  
    useEffect(()=>{
        onSnapshot(collection(db,"jobs",props.id,"applications"),(docs)=>{
            setApplicants(docs.docs.length);
        })
    },[])
    

    return (
        <button onClick={()=>{setSelectedJob(props)}} className="w-full border-2 rounded-xl hover:bg-breen hover:text-white border-breen flex flex-col justify-start items-start p-4">            
            <div className="text-3xl font-bold">{props.jobData.jobDetails.jobTitle}</div>
            <div className="text-sm mt-3 font-regular">Posted on {props.jobData.time.toDate().toLocaleString().toString()}</div>
            <div className="mt-5 w-full flex flex-row justify-end items-end text-md font-regular">{applicants} Applicants</div>
        </button>
    )
}
