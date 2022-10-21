import JobCard from "../components/JobCard";
import JobDetails from "../components/jobDetails";
import { BsArrowRightShort } from "react-icons/bs";
import { useRecoilState } from "recoil";
import isPostJobModalOpenAtom from "../../newJob/atoms/newJobAtoms";
import { Navigate, useNavigate } from "react-router";
import AllPostedJobs from "../components/AllPostedJobs";
import { moreThanTwoJobsAtom, selectedJobAtom } from "../jobsAtoms";


export default function JobsPage() {

    const navigate = useNavigate();
    const [selectedJob, setSelectedJob] = useRecoilState(selectedJobAtom);
    const [moreThanTwoJobs, setMoreThanTwoJobs] = useRecoilState(moreThanTwoJobsAtom);

    return (
        <>

            <div className="pt-[80px] text-breen bg-tan h-screen w-full flex justify-start items-start p-20 flex-col">
                <div className="text-md mt-10 mb-2 ml-1">Your Job Postings</div>

                <div className="w-full h-full flex flex-row">
                    <div className="pr-[10%] h-full w-2/4 flex flex-col justify-start items-start ">
                        <AllPostedJobs />
                        {
                            moreThanTwoJobs == false &&
                            <button onClick={() => { navigate("/newJob") }} className=" mt-10 text-breen font-bold hover:text-tan flex flex-row gap-5 justify-center items-center px-4 py-2 bg-transparent border-2 border-breen hover:bg-breen rounded-md">
                                Post a new Job
                                <BsArrowRightShort className="" size={30}></BsArrowRightShort>
                            </button>
                        }

                    </div>

                    <div id="no_scroll" className="bg-bray rounded-md h-full w-2/4 overflow-y-scroll">
                        {
                            selectedJob.jobData != null ? <JobDetails /> :
                                <div className="flex justify-center items-center h-full w-full">
                                    <div className="text-tan/80 text-sm">Select a job to see details</div>
                                </div>
                        }
                    </div>

                </div>

            </div>
        </>
    )


}