import JobCard from "../components/JobCard";
import JobDetails from "../components/jobDetails";
import { BsArrowRightShort } from "react-icons/bs";
import { useRecoilState } from "recoil";
import isPostJobModalOpenAtom from "../../../atoms/jobs/jobs";
import PostNewJobModal from "../components/postNewJobModal";


export default function JobsPage() {

    const [isPostJobModalOpen, setIsPostJobModalOpen] = useRecoilState(isPostJobModalOpenAtom);

    return (
        <>
            {isPostJobModalOpen==true&&<PostNewJobModal/>}
            <div className="pt-[80px] text-breen bg-tan h-screen w-full flex justify-start items-start p-20 flex-col">
                <div className="text-6xl font-bold my-10">Your Job Postings</div>

                <div className="w-full h-full flex flex-row">
                    <div className="pr-[10%] h-full w-2/4 flex flex-col justify-start items-start ">
                        <JobCard />
                        <button onClick={() => { setIsPostJobModalOpen(true); }} className=" mt-10 text-breen font-bold hover:text-tan flex flex-row gap-5 justify-center items-center px-6 py-3 bg-transparent border-2 border-breen hover:bg-breen rounded-md">
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