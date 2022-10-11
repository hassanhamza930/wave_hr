import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import NewJobPageIndexAtom, { NewJobPosting, NewJobPostingAtom } from "../../../atoms/newJob/newJobAtom";
import useSubmitOnboardingDataToFirebase from "../../home/logic/useSubmitOnboardingDataToFirebase";
import useSubmitNewJob from "../logic/newJobLogic";


export default function CustomQuestionsPage() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<NewJobPosting>();
    const { syncBasicNewJobDetailsValue } = useSubmitNewJob();
    const [newJobPosting,setNewJobPosting]=useRecoilState(NewJobPostingAtom);


    return (
        <div className="h-full w-full bg-tan justify-center items-center flex flex-col text-left">

            <div className="w-[600px] h-[90%] bg-bray rounded-md overflow-y-scroll p-10">
                <div className="text-white/90 text-6xl font-bold">Post a New Job</div>
                <div className="text-white/90 text-xl mt-5">Make a new job post to start receiving applications</div>

                <div className="text-white ">
                {newJobPosting.endSalary.toString()}
                {newJobPosting.startSalary.toString()}
                {newJobPosting.jobTitle.toString()}
                </div>
            
            </div>



        </div>
    )
}