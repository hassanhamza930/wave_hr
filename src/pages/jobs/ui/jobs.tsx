import JobCard from "../components/JobCard";
import JobDetails from "../components/jobDetails";
import { BsArrowRightShort } from "react-icons/bs";
import { useRecoilState } from "recoil";
import isPostJobModalOpenAtom from "../../../atoms/newJob/newJobAtom";
import { Navigate, useNavigate } from "react-router";


export default function JobsPage() {

    const navigate=useNavigate();

    return (
        <>

            <div className="pt-[80px] text-breen bg-tan h-screen w-full flex justify-start items-start p-20 flex-col">
                <div className="text-6xl font-bold my-10">Your Job Postings</div>

                <div className="w-full h-full flex flex-row">
                    <div className="pr-[10%] h-full w-2/4 flex flex-col justify-start items-start ">
                        <JobCard />
                        <button onClick={() => { navigate("/newJob") }} className=" mt-10 text-breen font-bold hover:text-tan flex flex-row gap-5 justify-center items-center px-4 py-2 bg-transparent border-2 border-breen hover:bg-breen rounded-md">
                            Post a new Job
                            <BsArrowRightShort className="" size={30}></BsArrowRightShort>
                        </button>

                    </div>

                    <div className="bg-bray rounded-md h-full w-2/4 flex flex-col justify-center items-center">
                        <JobDetails />
                    </div>

                </div>

            </div>
        </>
    )


}