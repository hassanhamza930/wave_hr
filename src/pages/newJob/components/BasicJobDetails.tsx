import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import NewJobPageIndexAtom, { NewJobPosting, NewJobPostingAtom } from "../atoms/newJobAtoms";
import useSubmitOnboardingDataToFirebase from "../../home/logic/useSubmitOnboardingDataToFirebase";
import pageIndexAtom from "../atoms/newJobAtoms";
import { questionsAtom } from "../atoms/newJobAtoms";
import { MdDelete } from "react-icons/md";
import { Navigate, useNavigate } from "react-router";
import { addDoc, collection, doc, getFirestore, setDoc, Timestamp } from "firebase/firestore";
import { useState } from "react";
import isLoadingAtom from "../../../atoms/app/isLoadingAtom";


export default function PostNewJobForm() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [pageIndex, setPageIndex] = useRecoilState(pageIndexAtom);
    const [newJobPosting, setNewJobPosting] = useRecoilState(NewJobPostingAtom);
    const [questions, setQuestions] = useRecoilState(questionsAtom);
    const navigate = useNavigate();
    const db = getFirestore();
    const [loading, setLoading] = useRecoilState(isLoadingAtom);

    async function handleAddNewJob(data: any) {
        setLoading(true);
        console.log(data);
        console.log(questions);
        delete data["question"];
        var doc= await addDoc(collection(db, "jobs"), {
            jobDetails: data,
            questions: questions,
            postedBy: localStorage.getItem("uid"),
            time:Timestamp.now()
        });
    
        setLoading(false);
        navigate("/jobs");

    }

    function AddQuestion() {
        setQuestions([...questions, watch("question")]);
    }

    function DeleteQuestion(i: number) {
        var temp: any = [];
        questions.forEach((e) => {
            temp.push(e);
        });
        temp.splice(i, 1);
        setQuestions(temp);
    }




    return (
        <div className="h-full w-full bg-tan justify-center items-center flex flex-col text-left">

            <div className="w-[700px] flex flex-col h-[90%] bg-bray rounded-md overflow-y-scroll p-10">
                <form onSubmit={handleSubmit(handleAddNewJob)}>
                    <div className="text-white/90 text-6xl font-bold">Post a New Job</div>
                    <div className="text-white/90 text-xl mt-5">Make a new job post to start receiving applications</div>


                    <div className="text-white/90 text-md mt-10 font-bold w-3/4">Job Title</div>
                    <input {...register("jobTitle")} placeholder="Senior Software Engineer" className=" w-96 border-b-[1px] border-white/90 text-white/90 bg-transparent outline-0 px-2 py-1 mt-3 flex justify-center items-center">
                    </input>

                    <div className="text-white/90 text-md mt-10 font-bold w-3/4">Job Description</div>
                    <textarea {...register("jobDescription")} placeholder="Describe the job title and responsibilities" className="h-28 w-96 border-b-[1px] border-white/90 text-white/90 bg-transparent outline-0 px-2 py-1 mt-3 flex justify-center items-center">
                    </textarea>

                    <div className="text-white/90 text-md mt-10 font-bold w-3/4">Job Qualifications</div>
                    <textarea {...register("jobQualifications")} placeholder="Describe the qualifications required for this job" className="h-28 w-96 border-b-[1px] text-white/90 border-white/90 bg-transparent outline-0 px-2 py-1 mt-3 flex justify-center items-center">
                    </textarea>

                    <div className="text-white/90 text-md mt-10 font-bold w-3/4">Annual Salary Range</div>

                    <div className="flex flex-row justify-start item-start gap-10">

                        <input type={"number"} min={0} {...register("startSalary")} placeholder="Lower Limit $" className="w-36 border-b-[1px] border-white/90 text-white/90 bg-transparent outline-0 px-2 py-1 mt-3 flex justify-center items-center">
                        </input>

                        <input {...register("endSalary")} type={"number"} min={watch("startSalary")} placeholder="Upper Limit $" className="w-36 border-b-[1px] border-white/90 text-white/90 bg-transparent outline-0 px-2 py-1 mt-3 flex justify-center items-center">
                        </input>

                    </div>



                    <div className="text-white/90 w-full text-6xl font-bold mt-20">Custom Questions</div>
                    <div className="text-white/90 text-xl mt-5 mb-10">Filter candidates based on answers</div>


                    <div className="flex-col h-min gap-2 mt-10 w-full flex justify-start items-start">
                        {
                            questions.map((e: any, index: any) => {
                                return (
                                    <div key={`${e}${index}`} className="h-min flex flex-row justify-start items-center text-white text-md border-2 rounded-md border-white px-4 py-2 w-full">
                                        <div className="w-[10%] mr-3 h-full  font-bold">Q.{index + 1}</div>
                                        <div className="w-[80%] h-full ">{e}</div>
                                        <button onClick={() => { DeleteQuestion(index) }} type="button" className="w-[10%] h-full flex justify-center items-end">
                                            <MdDelete color="white" size={30} />
                                        </button>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <input {...register("question")} placeholder="How many years of experience do you have with React.js?" className="mt-10 w-96 border-b-[1px] border-white/90 text-white/90 bg-transparent outline-0 px-2 py-1 flex justify-center items-center">
                    </input>

                    <button onClick={() => { AddQuestion() }} type="button" className=" mt-5 hover:text-breen text-white font-bold flex flex-row gap-5 justify-center items-center px-4 py-2 bg-transparent border-2 border-white/90 hover:bg-white/90 rounded-md">
                        +
                    </button>



                    <button type="submit" className=" mt-20 hover:text-breen text-white font-bold flex flex-row gap-5 justify-center items-center px-8 py-2 bg-transparent border-2 border-white/90 hover:bg-white/90 rounded-md">
                        Post Job
                    </button>


                </form>
            </div>



        </div>
    )
}