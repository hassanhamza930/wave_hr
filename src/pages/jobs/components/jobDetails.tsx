import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GiWeightLiftingDown } from "react-icons/gi";
import { Navigate, useNavigate, useParams } from "react-router";
import { useRecoilState } from "recoil";
import { selectedJobAtom } from "../jobsAtoms";
import { JobData, JobPosting } from "./JobCard";
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import { Menu } from "@headlessui/react";
import { Transition } from "@headlessui/react";
import ReactQuill from "react-quill";
import { jobDataAtom } from "../../apply/atoms/applyPageAtoms";

export default function JobDetails() {

    const [selectedJob, setSelectedJob] = useRecoilState(selectedJobAtom);
    const navigate = useNavigate();
    const db = getFirestore();

    function copyJobLink(id: string) {
        var jobLink = "https://wavehr.vercel.app" + "/apply/" + id;
        navigator.clipboard.writeText(jobLink);
        toast.success("Job Link Copied to Clipboard");
    }

    function editJob(id: string) {
        navigate("/editJob/"+id);
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

                <div className="relative flex flex-row justify-between items-center w-full">
                    <div className="text-4xl font-bold text-tan">{selectedJob.jobData.jobDetails.jobTitle}</div>
                    <Menu>
                        <Menu.Button className="text-tan hover:scale-105">
                            <BsThreeDots size={30} />
                        </Menu.Button>
                        <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute -mb-24  justify-center right-0 w-36 origin-top-right divide-y rounded-md divide-gray-100 bg-tan shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => { copyJobLink(selectedJob.id) }}
                                                    className={`${active ? 'bg-secondary text-black' : 'text-gray-900'} group flex w-full items-center justify-start outline-none hover:bg-purp hover:text-tan  px-4 py-2 text-sm`}>
                                                    Copy Apply Link
                                                </button>
                                            )}
                                        </Menu.Item>

                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => { editJob(selectedJob.id) }}
                                                    className={`${active ? 'bg-secondary text-black' : 'text-gray-900'} group flex w-full items-center justify-start hover:bg-purp hover:text-tan  px-4 py-2 text-sm`}>
                                                    Edit
                                                </button>
                                            )}
                                        </Menu.Item>

                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => { deleteJob(selectedJob.id) }}
                                                    className={`${active ? 'bg-secondary text-black' : 'text-gray-900'} group flex w-full items-center justify-start hover:bg-purp hover:text-tan  px-4 py-2 text-sm`}>
                                                    Delete
                                                </button>
                                            )}
                                        </Menu.Item>

                                    </div>
                                </Menu.Items>
                            </Transition>

                    </Menu>


                </div>

                <div className="flex mt-5 flex-row w-full justify-between items-center">
                    <div className="text-md text-tan">Posted on {selectedJob.jobData.time.toDate().toLocaleString()}</div>
                </div>

                <div className="flex flex-row justify-center items-start gap-2 mt-5">
                    {/* <button onClick={() => { copyJobLink(selectedJob.id) }} className="text-sm px-4 py-2 rounded-md border-tan border-2 hover:font-bold hover:bg-tan bg-transparent hover:text-black text-tan">Copy Job Link</button>
                    <button onClick={() => { deleteJob(selectedJob.id) }} className="text-sm px-4 py-2 rounded-md border-tan border-2 hover:font-bold hover:bg-tan bg-transparent hover:text-black text-tan">Delete</button> */}
                    <button onClick={() => { seeApplicants(selectedJob.id) }} className="text-sm px-4 py-2 rounded-md border-tan border-2 hover:font-bold hover:bg-tan bg-transparent hover:text-black text-tan">See Applicants</button>
                </div>


                <div className="text-xl font-bold text-tan mt-10">Job Description</div>
                {/* <ReactQuill value={selectedJob.jobData.jobDetails.jobDescription} readOnly={true} theme="bubble" className="" /> */}
                <div dangerouslySetInnerHTML={{ __html: selectedJob.jobData.jobDetails.jobDescription }} className="text-md mt-2 text-tan"></div>
                <div className="text-xl font-bold text-tan mt-10">Job Qualifications</div>
                <div dangerouslySetInnerHTML={{ __html: selectedJob.jobData.jobDetails.jobQualifications }} className="text-md mt-2 text-tan"></div>
                {/* <ReactQuill value={selectedJob.jobData.jobDetails.jobQualifications} readOnly={true} theme="bubble" className="" /> */}
                <div className="text-xl font-bold text-tan mt-10">Salary Compensation</div>
                <div className="text-md mt-2 text-tan">{selectedJob.jobData.jobDetails.salaryCompensation.toString()}</div>
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
