import { collection, doc, getFirestore, onSnapshot, query, setDoc, Timestamp, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { NewJobPosting } from "../../newJob/atoms/newJobAtoms";
import { selectedCompanyAtom } from "../atoms/selectedCompanyAtom";
import { moreThanTwoJobsAtom, selectedJobAtom } from "../jobsAtoms";
import JobCard, { JobData, JobPosting } from "./JobCard";

export default function AllPostedJobs() {

    const [allJobs, setAllJobs] = useState<Array<Object>>([]);
    const [docsIds,setDocIds]=useState<Array<string>>([]);
    const db = getFirestore();
    const [moreThanTwoJobs,setMoreThanTwoJobs]=useRecoilState(moreThanTwoJobsAtom);
    const [selectedCompany, setSelectedCompany] = useRecoilState(selectedCompanyAtom);


    async function fetchAllJobsPostingsUnderCompany(){
        
    }



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
        <div id="no_scroll" className="min:h-min max:h-[420px] w-full gap-3 overflow-y-scroll flex flex-col justify-start items-start">
            {
                allJobs.map((e,index) => {
                    return (
                        <JobCard key={`${Timestamp.now()}${index}`} id={docsIds[index]}  jobData={e as JobPosting} />
                    )
                })
            }
        </div>
    )
}