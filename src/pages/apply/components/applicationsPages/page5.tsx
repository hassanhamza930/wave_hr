import { useEffect } from "react"
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillFile } from "react-icons/ai";
import { useRecoilState } from "recoil";
import pageIndexAtom from "../../../newJob/atoms/newJobAtoms";
import JobApplicationAtom, { JobApplication, selectedResumeAtom } from "../../atoms/applyPageAtoms";

export default function Page5() {

    const { watch, handleSubmit, register } = useForm<JobApplication>();
    const [jobApplication, setJobApplication] = useRecoilState(JobApplicationAtom);
    const [pageIndex, setPageIndex] = useRecoilState(pageIndexAtom);

    useEffect(() => {
        console.log("this is coming from page 5");
        console.log(jobApplication);
    }, []);

    return (
        <div className="text-left h-full rounded-md overflow-y-scroll flex justify-center items-start flex-col p-10 w-full md:w-[60%]">
            <div className="text-3xl font-bold text-white">Custom Questions</div>
            <div className="text-xl text-white mt-2">Please provide information for the required fields</div>

            

            <button onClick={()=>{}} type="button" className="border-white border-2 hover:bg-white bg-transparent text-white hover:text-breen px-8 py-2 flex flex-row justify-center items-center gap-2 rounded-md mt-10 w-min">
                Next
            </button>

        </div>
    )
}