import { collection, doc, getFirestore, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import JobCard, { JobData } from "./JobCard";

export default function AllPostedJobs() {

    const [allJobs, setAllJobs] = useState<Array<Object>>([]);
    const db = getFirestore();

    useEffect(() => {

        onSnapshot(
            collection(db, "jobs"),
            (docs) => {
                var tempDocList:Array<Object>=[];
                docs.docs.forEach((e)=>{
                    tempDocList.push(e.data() as Object);
                })
                setAllJobs(tempDocList);
            }
        );

    }, [])

    return (
        <div className="min:h-min max:h-[420px] w-full gap-3 overflow-y-scroll flex flex-col justify-start items-start">
            {
                allJobs.map((e) => {
                    return (
                        <JobCard jobData={e as any}/>
                    )
                })
            }
        </div>
    )
}