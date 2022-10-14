import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { selectedJobAtom } from "../jobsAtoms";
import { JobData, JobPosting } from "./JobCard";

export default function JobDetails() {

    const [selectedJob, setSelectedJob] = useRecoilState(selectedJobAtom);


    return (
        <div className="mb-20 p-8 text-md text-white/80 font-regular flex flex-col justify-start items-start">
            <div className="h-36 w-full bg-gradient-to-br from-red-700 to-yellow-800 mb-5 rounded-md bg-cover bg-center bg-[url('https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/61a77a4a6e46e5363fbbde1d_purple-pink.png')]"></div>
            <div className="text-4xl font-bold text-white">{selectedJob.jobDetails.jobTitle}</div>
            <div className="text-md mt-5 text-white">Posted on {selectedJob.time.toDate().toLocaleString()}</div>
            <div className="text-xl font-bold text-white mt-10">Job Description</div>
            <div className="text-md mt-2 text-white">{selectedJob.jobDetails.jobDescription}</div>
            <div className="text-xl font-bold text-white mt-10">Job Qualifications</div>
            <div className="text-md mt-2 text-white">{selectedJob.jobDetails.jobQualifications}</div>
            <div className="text-xl font-bold text-white mt-10">Salary Range</div>
            <div className="text-md mt-2 text-white">${selectedJob.jobDetails.startSalary.toString()} - ${selectedJob.jobDetails.endSalary}</div>
            <div className="text-xl font-bold text-white mt-10 mb-2">Questions</div>
            {
                selectedJob.questions.map((e,index) => {
                    return (
                        <div className="text-md text-white mt-2   ">
                            <b>Q{index+1})</b> {e}
                        </div>
                    )
                })
            }


        </div>
    )
}
