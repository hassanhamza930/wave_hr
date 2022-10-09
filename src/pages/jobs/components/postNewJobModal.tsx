import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import isPostJobModalOpenAtom from "../../../atoms/jobs/jobs";

export default function PostNewJobModal() {

    const [isPostJobModalOpen, setIsPostJobModalOpen] = useRecoilState(isPostJobModalOpenAtom);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();


    return (
        <div className="fixed z-50 bg-bray/90 h-screen w-full flex justify-center items-center">
            <div className="overflow-y-scroll h-[80%] w-[600px] bg-white/90 rounded-xl flex justify-start items-start p-10 flex-col gap-3">
                <div className="flex flex-row w-full justify-end items-center">
                    <button onClick={() => { setIsPostJobModalOpen(false) }} className="bg-breen rounded-md h-12 w-12 flex justify-center items-center text-white text-3xl font-bold">X</button>
                </div>
                
                <div className="text-breen text-6xl font-bold mt-10">Post a New Job</div>
                <div className="text-breen text-xl w-full">Make a new job post to start receiving applications</div>


                <form>
                    <div className="text-breen text-md mt-10 font-bold w-3/4">Job Title</div>
                    <input {...register("jobTitle")} placeholder="Senior Software Engineer" className=" w-96 border-b-2 border-breen bg-transparent outline-0 px-2 py-1 mt-3 flex justify-center items-center">
                    </input>

                    <div className="text-breen text-md mt-10 font-bold w-3/4">Job Description</div>
                    <textarea {...register("jobDescription")} placeholder="Describe the job title and responsibilities" className="h-28 w-96 border-b-2 border-breen bg-transparent outline-0 px-2 py-1 mt-3 flex justify-center items-center">
                    </textarea>

                    <div className="text-breen text-md mt-10 font-bold w-3/4">Job Qualifications</div>
                    <textarea {...register("jobQualifications")} placeholder="Describe the qualifications required for this job" className="h-28 w-96 border-b-2 border-breen bg-transparent outline-0 px-2 py-1 mt-3 flex justify-center items-center">
                    </textarea>

                    <div className="text-breen text-md mt-10 font-bold w-3/4">Salary Range</div>

                    <div className="flex flex-row justify-start item-start gap-10">
                        <input type={"number"} min={0} {...register("startSalary")} placeholder="Lower Limit" className="w-36 border-b-2 border-breen bg-transparent outline-0 px-2 py-1 mt-3 flex justify-center items-center">
                        </input>
                        <input {...register("endSalary")} type={"number"} min={watch("startSalary")} placeholder="Upper Limit" className="w-36 border-b-2 border-breen bg-transparent outline-0 px-2 py-1 mt-3 flex justify-center items-center">
                        </input>

                    </div>

                    <div className="text-md font-regular mt-10 w-full flex flex-row justify-start items-end">
                        <button type="submit" className="bg-breen hover:bg-bray hover:scale-105 rounded-md px-8 py-2 text-white">Next</button>
                    </div>

                </form>


            </div>
        </div>
    )
}