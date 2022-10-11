import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import NewJobPageIndexAtom, { NewJobPosting } from "../../../atoms/newJob/newJobAtom";
import useSubmitOnboardingDataToFirebase from "../../home/logic/useSubmitOnboardingDataToFirebase";
import useSubmitNewJob from "../logic/newJobLogic";


export default function BasicJobDetails() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<NewJobPosting>();
    const { syncBasicNewJobDetailsValue } = useSubmitNewJob();

    return (
        <div className="h-full w-full bg-tan justify-center items-center flex flex-col text-left">

            <div className="w-[600px] h-[90%] bg-bray rounded-md overflow-y-scroll p-10">
                <div className="text-white/90 text-6xl font-bold">Post a New Job</div>
                <div className="text-white/90 text-xl mt-5">Make a new job post to start receiving applications</div>


                <form onSubmit={handleSubmit(syncBasicNewJobDetailsValue)}>
                    <div className="text-white/90 text-md mt-10 font-bold w-3/4">Job Title</div>
                    <input {...register("jobTitle")} placeholder="Senior Software Engineer" className=" w-96 border-b-[1px] border-white/90 text-white/90 bg-transparent outline-0 px-2 py-1 mt-3 flex justify-center items-center">
                    </input>

                    <div className="text-white/90 text-md mt-10 font-bold w-3/4">Job Description</div>
                    <textarea {...register("jobDescription")} placeholder="Describe the job title and responsibilities" className="h-28 w-96 border-b-[1px] border-white/90 text-white/90 bg-transparent outline-0 px-2 py-1 mt-3 flex justify-center items-center">
                    </textarea>

                    <div className="text-white/90 text-md mt-10 font-bold w-3/4">Job Qualifications</div>
                    <textarea {...register("jobQualifications")} placeholder="Describe the qualifications required for this job" className="h-28 w-96 border-b-[1px] text-white/90 border-white/90 bg-transparent outline-0 px-2 py-1 mt-3 flex justify-center items-center">
                    </textarea>

                    <div className="text-white/90 text-md mt-10 font-bold w-3/4">Salary Range</div>

                    <div className="flex flex-row justify-start item-start gap-10">
                        <input type={"number"} min={0} {...register("startSalary")} placeholder="Lower Limit" className="w-36 border-b-[1px] border-white/90 text-white/90 bg-transparent outline-0 px-2 py-1 mt-3 flex justify-center items-center">
                        </input>
                        <input {...register("endSalary")} type={"number"} min={watch("startSalary")} placeholder="Upper Limit" className="w-36 border-b-[1px] border-white/90 text-white/90 bg-transparent outline-0 px-2 py-1 mt-3 flex justify-center items-center">
                        </input>

                    </div>

                    <div className="text-md font-bold my-20 w-full flex flex-row justify-start items-end">
                        <button type="submit" className="bg-transparent hover:bg-white hover:scale-105 rounded-md px-8 py-2 border-2 border-white/90 hover:text-breen text-white">Next</button>
                    </div>

                </form>
            </div>



        </div>
    )
}