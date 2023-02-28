import { collection, doc, getDocs, getFirestore, onSnapshot, query, setDoc, Timestamp, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { JobDataInterface } from "../../../standards/interfaces/interfaces";
import { NewJobPosting } from "../../newJob/atoms/newJobAtoms";
import { selectedCompanyAtom } from "../atoms/selectedCompanyAtom";
import { moreThanTwoJobsAtom, selectedJobAtom } from "../jobsAtoms";
import JobCard from "./JobCard";

export default function AllPostedJobs() {

    const [allJobs, setAllJobs] = useState<Array<JobDataInterface>>([]);
    const [docsIds,setDocIds]=useState<Array<string>>([]);
    const db = getFirestore();
    const [moreThanTwoJobs,setMoreThanTwoJobs]=useRecoilState(moreThanTwoJobsAtom);
    const [selectedCompany, setSelectedCompany] = useRecoilState(selectedCompanyAtom);



    async function fetchAllPostedJobsUnderCompany(){
        var docs=await getDocs(query(collection(db, "jobs"),where("companyId","==",selectedCompany.id==undefined?"":selectedCompany.id ),where("postedBy","==",localStorage.getItem("uid") )))
        var tempDocList: Array<JobDataInterface> = [];
        docs.docs.forEach((e) => {
            var tempData:JobDataInterface=e.data() as JobDataInterface;
            tempData.id=e.id;
            tempDocList.push(tempData);
        })
        setAllJobs(tempDocList);
    }


    useEffect(() => {
        console.log("Company Id is",selectedCompany.id);
       fetchAllPostedJobsUnderCompany();
       console.log("fetching");
    
    }, [selectedCompany.companyName])

    return (
        <div id="no_scroll" className="min:h-min max:h-[420px] pr-20 w-full gap-3 overflow-y-scroll flex flex-col justify-start items-start">
            {
                allJobs.map((e,index) => {
                    return (
                        <JobCard key={index} {...e} />
                    )
                })
            }
        </div>
    )
}