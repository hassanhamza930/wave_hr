import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GiWeightLiftingDown } from "react-icons/gi";
import { Navigate, useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { selectedJobAtom } from "../jobsAtoms";
import { JobData, JobPosting } from "./JobCard";

export default function JobDetails() {

    const [selectedJob, setSelectedJob] = useRecoilState(selectedJobAtom);
    const navigate=useNavigate();
    const db = getFirestore();

    function copyJobLink(id: string) {
        var jobLink = window.location.host + "/apply/" + id;
        navigator.clipboard.writeText(jobLink);
        toast.success("Job Link Copied to Clipboard");
    }

    async function deleteJob(id: string) {
        setSelectedJob({} as JobData);
        await deleteDoc(doc(db, "jobs", id));
        toast.success("Deleted job posting");
    }


    async function seeApplicants(id: string) {
        navigate(`/applicants/${selectedJob.id}`);
    }


    return (
        <div id="no_scroll" className="mb-20 text-md text-tan/80 font-regular flex flex-col justify-start items-start">
            <div className="h-48 w-full bg-gradient-to-br from-red-700 to-yellow-800 bg-cover bg-center bg-[url('https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/61a77a4a6e46e5363fbbde1d_purple-pink.png')]"></div>

            <div className="flex flex-col justify-start items-start p-10 w-full">
                <div className="text-4xl font-bold text-tan">{selectedJob.jobData.jobDetails.jobTitle}</div>

                <div className="flex mt-5 flex-row w-full justify-between items-center">
                    <div className="text-md text-tan">Posted on {selectedJob.jobData.time.toDate().toLocaleString()}</div>
                </div>

                <div className="flex flex-row justify-center items-start gap-2 mt-5">
                    <button onClick={() => { copyJobLink(selectedJob.id) }} className="text-sm px-4 py-2 rounded-md border-tan border-2 hover:font-bold hover:bg-tan bg-transparent hover:text-breen text-tan">Copy Job Link </button>
                    <button onClick={() => { deleteJob(selectedJob.id) }} className="text-sm px-4 py-2 rounded-md border-tan border-2 hover:font-bold hover:bg-tan bg-transparent hover:text-breen text-tan">Delete</button>
                    <button onClick={() => { seeApplicants(selectedJob.id) }} className="text-sm px-4 py-2 rounded-md border-tan border-2 hover:font-bold hover:bg-tan bg-transparent hover:text-breen text-tan">See Applicants</button>
                </div>


                <div className="text-xl font-bold text-tan mt-10">Job Description</div>
                <div dangerouslySetInnerHTML={{ __html: selectedJob.jobData.jobDetails.jobDescription }} className="text-md mt-2 text-tan"></div>
                <div className="text-xl font-bold text-tan mt-10">Job Qualifications</div>
                <div dangerouslySetInnerHTML={{ __html: selectedJob.jobData.jobDetails.jobQualifications }} className="text-md mt-2 text-tan"></div>
                <div className="text-xl font-bold text-tan mt-10">Salary Range</div>
                <div className="text-md mt-2 text-tan">${selectedJob.jobData.jobDetails.startSalary.toString()} - ${selectedJob.jobData.jobDetails.endSalary}</div>
                <div className="text-xl font-bold text-tan mt-10 mb-2">Questions</div>
                {
                    selectedJob.jobData.questions.map((e, index) => {
                        return (
                            <div className="text-md text-tan mt-2   ">
                                <b>Q{index + 1})</b> {e}
                            </div>
                        )
                    })
                }
            </div>


        </div>
    )
}
