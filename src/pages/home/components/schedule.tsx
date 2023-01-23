import dayjs from "dayjs";
import { collection, getDocs, getFirestore, query, QueryDocumentSnapshot, Timestamp, where } from "firebase/firestore";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import { JobPosting } from "../../jobs/components/JobCard";



function JobPostingCard({ jobDetails, questions, time, postedBy }: JobPosting, id: string) {

    const [diff, setDiff] = useState<any>("");
    const navigate=useNavigate();

    useEffect(() => {
        var date1 = time.toDate();
        var date2 = Timestamp.now().toDate();
        var timeInMs=date2.getTime() - date1.getTime();
        let TotalDays = Math.ceil(timeInMs / (1000 * 3600 * 24));
        setDiff(TotalDays);
    }, []);

    return (
        <button onClick={()=>{navigate("/jobs")}} className="hover:bg-blue hover:text-white text-black hover:border-blue border-blue border-2 w-full bg-transparent rounded-xl flex justify-between items-center flex-row py-4 px-5 gap-3">


            <div className="flex text-left flex-row justify-center items-center gap-5">
                <div className=" text-xl">{jobDetails.jobTitle}</div>
            </div>

            <div className="text-sm text-left">Posted {diff} days ago</div>


        </button>

    )
}






export default function Schedule() {

    const [newApps, setNewApps] = useState(0);
    const [jobsPostedByUser, setJobsPostedByUser] = useState<Array<QueryDocumentSnapshot>>();
    const db = getFirestore();

    async function syncNewApps() {
        var docs = await getDocs(query(collection(db, "jobs"), where('postedBy', "==", localStorage.getItem("uid"))));
        var docsData = docs.docs;
        setJobsPostedByUser([...docsData]);
        setNewApps(docsData.length);
    }

    useEffect(() => {
        syncNewApps();
    }, [])

    return (
        <div className="w-2/4 h-full flex justify-center items-center">

            <div className="flex flex-col h-full w-full justify-start items-start p-20 border-black">



                <div className="text-xl text-black">You have {newApps} active jobs.</div>

                <div className="flex flex-col justify-start items-start w-full h-full gap-2 pt-10">
                    {
                        jobsPostedByUser?.map((job) => {
                            var jobData = job.data() as JobPosting;

                            return (
                                <JobPostingCard id={job.id}  {...jobData} />
                            )
                        })
                    }
                </div>

            </div>

        </div>
    )
}