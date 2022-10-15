import { useEffect, useState } from "react";
import { GiWeightLiftingDown } from "react-icons/gi";
import { useRecoilState } from "recoil";
import { selectedJobAtom } from "../jobsAtoms";
import { JobData, JobPosting } from "./JobCard";

export default function JobDetails() {

    const [selectedJob, setSelectedJob] = useRecoilState(selectedJobAtom);

    function copyJobLink(id:string){
        var jobLink=window.location.host+"/apply/"+id;
        navigator.clipboard.writeText(jobLink);
        // window.open(jobLink,"_blank");
    }

    return (
        <div className="mb-20 text-md text-white/80 font-regular flex flex-col justify-start items-start">
            <div className="h-36 w-full bg-gradient-to-br from-red-700 to-yellow-800 bg-cover bg-center bg-[url('https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/61a77a4a6e46e5363fbbde1d_purple-pink.png')]"></div>

            <div className="flex flex-col justify-start items-start p-10 w-full">
                <div className="text-4xl font-bold text-white">{selectedJob.jobData.jobDetails.jobTitle}</div>

                <div className="flex mt-5 flex-row w-full justify-between items-center">
                    <div className="text-md text-white">Posted on {selectedJob.jobData.time.toDate().toLocaleString()}</div>
                    <div className="flex flex-row justify-center items-center gap-5">
                        <button onClick={()=>{copyJobLink(selectedJob.id)}} className="text-sm px-4 py-2 rounded-md border-white border-2 hover:font-bold hover:bg-white bg-transparent hover:text-breen text-white">Copy Job Link </button>
                        <button className="text-sm px-4 py-2 rounded-md border-white border-2 hover:font-bold hover:bg-white bg-transparent hover:text-breen text-white">Delete</button>
                    </div>
                </div>


                <div className="text-xl font-bold text-white mt-10">Job Description</div>
                <div className="text-md mt-2 text-white">{selectedJob.jobData.jobDetails.jobDescription}</div>
                <div className="text-xl font-bold text-white mt-10">Job Qualifications</div>
                <div className="text-md mt-2 text-white">{selectedJob.jobData.jobDetails.jobQualifications}</div>
                <div className="text-xl font-bold text-white mt-10">Salary Range</div>
                <div className="text-md mt-2 text-white">${selectedJob.jobData.jobDetails.startSalary.toString()} - ${selectedJob.jobData.jobDetails.endSalary}</div>
                <div className="text-xl font-bold text-white mt-10 mb-2">Questions</div>
                {
                    selectedJob.jobData.questions.map((e, index) => {
                        return (
                            <div className="text-md text-white mt-2   ">
                                <b>Q{index + 1})</b> {e}
                            </div>
                        )
                    })
                }
            </div>


        </div>
    )
}
