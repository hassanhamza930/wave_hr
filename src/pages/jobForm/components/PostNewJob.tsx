import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import NewJobPageIndexAtom, { NewJobPosting, NewJobPostingAtom } from "../atoms/newJobAtoms";
import pageIndexAtom from "../atoms/newJobAtoms";
import { questionsAtom } from "../atoms/newJobAtoms";
import { MdDelete } from "react-icons/md";
import { Navigate, useNavigate } from "react-router";
import { addDoc, collection, doc, getFirestore, setDoc, Timestamp } from "firebase/firestore";
import { useState } from "react";
import isLoadingAtom from "../../../atoms/app/isLoadingAtom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from "react-hot-toast";
import { ButtonOutlinedWhite, ButtonSolid } from "../../../standards/components/button";


export default function PostNewJobForm() {

    const { register, handleSubmit, watch, formState: { errors }, } = useForm();
    const [pageIndex, setPageIndex] = useRecoilState(pageIndexAtom);
    const [newJobPosting, setNewJobPosting] = useRecoilState(NewJobPostingAtom);
    const [questions, setQuestions] = useRecoilState(questionsAtom);
    const navigate = useNavigate();
    const db = getFirestore();
    const [loading, setLoading] = useRecoilState(isLoadingAtom);
    const [jobDescription,setJobDescription]=useState("");
    const [jobQualifications,setJobQualifications]=useState("");

    async function handleAddNewJob(data: any) {


        if(watch("jobTitle").trim()=="" || jobDescription.trim()=="" || jobQualifications.trim()=="" || watch("salaryCompensation")=="" ){
            toast.error("Kindly enter all mandatory details");
            return 0;
        }

        setLoading(true);
        console.log(data);
        console.log(questions);
        delete data["question"];
        data["jobDescription"]=jobDescription;
        data["jobQualifications"]=jobQualifications;

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
        var question:string=watch("question") as string;
        if(question.trim()==""){
            toast.error("Kindly enter a question");
        }
        else{
            setQuestions([...questions, watch("question")]);
        }
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

            <div id="no_scroll" className="w-[80%] flex-1  justify-start items-center px-20 flex-col h-[90%] bg-transparent rounded-md overflow-y-scroll p-10">
                <form onSubmit={handleSubmit(handleAddNewJob)}>
                    <div className="text-blue text-4xl font-bold">Post a New Job</div>
                    <div className="text-blue text-md mt-2">Make a new job post to start receiving applications</div>


                    <div className="text-blue text-md mt-10 font-bold w-3/4">Job Title</div>
                    <input {...register("jobTitle")} placeholder="Senior Software Engineer" className=" w-96 border-b-[1px] border-blue text-blue bg-transparent outline-0 px-2 py-1 mt-3 flex justify-center items-center">
                    </input>

                    <div className="text-blue text-md mt-10 font-bold w-3/4">Job Description</div>
               
                    <ReactQuill className="h-48 w-2/4 pb-12 text-blue border-[1px] border-blue mt-4" theme={"snow"} value={jobDescription} onChange={setJobDescription} />

                    <div className="text-blue text-md mt-10 font-bold w-3/4">Job Qualifications</div>
              
                    <ReactQuill className="h-48 w-2/4 pb-12 text-blue mb-10 border-[1px] border-blue mt-4" theme={"snow"} value={jobQualifications} onChange={setJobQualifications} />


                    <div className="text-blue text-md mt-20 font-bold w-3/4">Salary Compensation</div>

                    <div className="flex flex-row justify-start item-start gap-10">

                        <input {...register("salaryCompensation")} placeholder="Salary Compensation" className="w-48 border-b-[1px] border-blue text-blue bg-transparent outline-0 px-2 py-1 mt-3 flex justify-center items-center">
                        </input>

                    </div>



                    <div className="text-blue w-full text-4xl font-bold mt-20">Custom Questions</div>
                    <div className="text-blue text-md mt-2 mb-10">Filter candidates based on answers</div>


                    <div className="flex-col h-min gap-2 mt-10 w-full flex justify-start items-start">
                        {
                            questions.map((e: any, index: any) => {
                                return (
                                    <div key={`${e}${index}`} className="h-min flex flex-row justify-start items-start text-blue text-md border-2 rounded-md border-blue pt-3 px-4 py-2 w-2/4">
                                        <div className="w-10 mr-3 h-full  font-bold">Q.{index + 1}</div>
                                        <div className="w-full h-full ">{e}</div>
                                        <button onClick={() => { DeleteQuestion(index) }} type="button" className="w-[10%] h-full flex justify-center items-end">
                                            <MdDelete className="hover:scale-105" size={30} />
                                        </button>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <input {...register("question")} placeholder="How many years of experience do you have with React.js?" className="mt-10 w-96 border-b-[1px] text-sm border-blue text-blue bg-transparent outline-0 px-2 py-1 flex justify-center items-center">
                    </input>

                    <button onClick={() => { AddQuestion() }} type="button" className=" mt-6 hover:text-tan text-blue font-bold flex flex-row gap-5 justify-center items-center px-4 py-2 bg-transparent border-2 border-blue hover:bg-blue/90 rounded-md">
                        Add Question
                    </button>
                    
                    <ButtonSolid onClick={()=>{}} text={"Post Job"}/>
                    <ButtonOutlinedWhite onClick={()=>{}} text={"Post Job"}/>

                </form>
            </div>



        </div>
    )
}