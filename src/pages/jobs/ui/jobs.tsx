import JobCard from "../components/JobCard";
import JobDetails from "../components/jobDetails";
import { BsArrowRightShort } from "react-icons/bs";
import { useRecoilState } from "recoil";
import isPostJobModalOpenAtom from "../../newJob/atoms/newJobAtoms";
import { Navigate, useNavigate } from "react-router";
import AllPostedJobs from "../components/AllPostedJobs";
import { moreThanTwoJobsAtom, selectedJobAtom } from "../jobsAtoms";
import { useEffect } from "react";
import { collection, getDoc, getDocs, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import PageLayout from "../../../standards/styles/layouts/pageLayout";
import { ButtonOutlinedBlue } from "../../../standards/styles/components/button";

export default function JobsPage() {

    const navigate = useNavigate();
    const [selectedJob, setSelectedJob] = useRecoilState(selectedJobAtom);
    const [moreThanTwoJobs, setMoreThanTwoJobs] = useRecoilState(moreThanTwoJobsAtom);
    const db = getFirestore();

    async function checkMoreThanTwoJobs() {
        onSnapshot(query(collection(db, "jobs"), where("postedBy", "==", localStorage.getItem("uid"))), (docs) => {
            if (docs.docs.length >= 2) {
                setMoreThanTwoJobs(true);
            }
            else {
                setMoreThanTwoJobs(false);
            }
        })
    }

    useEffect(() => {
        checkMoreThanTwoJobs();
    }, [])



    return (

        <PageLayout>
            <div className="text-md mb-2 ml-1">Your Job Postings</div>

            <div className="w-full h-full flex flex-row">
                <div className="pr-20 h-full w-2/4 flex flex-col justify-start items-start ">
                    <AllPostedJobs />
                    {
                        moreThanTwoJobs == false &&
                        <ButtonOutlinedBlue text="Post a New Job" onClick={() => { navigate("/newJob") }} customStyles="mt-10"/>
                        // <button onClick={() => { navigate("/newJob") }} className=" mt-10 text-black font-bold hover:text-tan flex flex-row gap-5 justify-center items-center px-4 py-2 bg-transparent border-2 border-blue hover:bg-blue rounded-md">
                        //     Post a new Job
                        //     <BsArrowRightShort className="" size={30}></BsArrowRightShort>
                        // </button>
                    }

                </div>

                {
                    selectedJob.jobData != null ? <JobDetails /> :
                        <div id="no_scroll" className="flex justify-center items-center h-[500px] rounded-md mb-10 w-2/4 overflow-y-scroll">
                            <div className="text-blue text-md">Select a job to see details</div>
                        </div>
                }

            </div>

        </PageLayout>
    )


}