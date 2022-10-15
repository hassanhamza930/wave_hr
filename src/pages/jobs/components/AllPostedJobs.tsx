import { collection, doc, getFirestore, onSnapshot, query, setDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { NewJobPosting } from "../../newJob/atoms/newJobAtoms";
import { moreThanTwoJobsAtom, selectedJobAtom } from "../jobsAtoms";
import JobCard, { JobData, JobPosting } from "./JobCard";

export default function AllPostedJobs() {

    const [allJobs, setAllJobs] = useState<Array<Object>>([]);
    const [docsIds,setDocIds]=useState<Array<string>>([]);
    const db = getFirestore();
    const [moreThanTwoJobs,setMoreThanTwoJobs]=useRecoilState(moreThanTwoJobsAtom);

    useEffect(() => {

        onSnapshot(
            query(collection(db, "jobs"),where("postedBy","==",localStorage.getItem("uid"))),
            (docs) => {
                
                var tempDocList: Array<Object> = [];
                var tempDocIds:Array<string>=[];
                docs.docs.forEach((e) => {
                    tempDocList.push(e.data() as Object);
                    tempDocIds.push(e.id);
                })
                setAllJobs(tempDocList);
                setDocIds(tempDocIds);
                if(tempDocIds.length<2){
                    setMoreThanTwoJobs(false);
                }
            
            }
        );

    }, [])

    return (
        <div className="min:h-min max:h-[420px] w-full gap-3 overflow-y-scroll flex flex-col justify-start items-start">
            {
                allJobs.map((e,index) => {
                    return (
                        <JobCard id={docsIds[index]}  jobData={e as JobPosting} />
                    )
                })
            }
        </div>
    )
}