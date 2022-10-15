import { Timestamp } from "firebase/firestore"
import { useRecoilState } from "recoil";
import { NewJobPosting } from "../../newJob/atoms/newJobAtoms"
import { selectedJobAtom } from "../jobsAtoms";

export interface JobPosting{
    jobDetails:NewJobPosting,
    questions:Array<string>,
    time:Timestamp
    posedBy?:string
}

export interface JobData{
    jobData:JobPosting,
    id:string
}

export default function JobCard(props:JobData) {

    const [selectedJob, setSelectedJob] = useRecoilState(selectedJobAtom);

    
    return (
        <button onClick={()=>{setSelectedJob(props)}} className="w-full border-2 rounded-xl hover:bg-breen hover:text-white border-breen flex flex-col justify-start items-start p-4">            
            <div className="text-3xl font-bold">{props.jobData.jobDetails.jobTitle}</div>
            <div className="text-sm mt-3 font-regular">Posted on {props.jobData.time.toDate().toLocaleString().toString()}</div>
            <div className="mt-5 w-full flex flex-row justify-end items-end text-md font-regular">27 Applicants</div>
        </button>
    )
}