import { addDoc, collection, doc, getDoc, getFirestore, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdDelete, MdHdrPlus, MdPlusOne } from "react-icons/md";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { UserInterface } from "../../../atoms/app/globalUserAtom";
import isLoadingAtom from "../../../atoms/app/isLoadingAtom";
import { ButtonOutlinedWhite, ButtonSolid } from "../../../standards/styles/components/button";
import { Heading, SubHeading } from "../../../standards/styles/components/heading";
import SimpleInput, { TextArea } from "../../../standards/styles/components/inputs";
import FormLayout from "../../../standards/styles/layouts/FormLayout";
import PageLayout from "../../../standards/styles/layouts/pageLayout";
import Page from "../../../standards/styles/layouts/pageLayout";
import { JobPosting } from "../../jobs/components/JobCard";
import NewJobPageIndexAtom, { NewJobPosting, NewJobPostingAtom, questionsAtom } from "../atoms/newJobAtoms";
import PostNewJobForm from "../components/PostNewJob";

export default function NewJob() {

    const [pageIndex, setPageIndex] = useRecoilState(NewJobPageIndexAtom);
    const [newJobPosting, setNewJobPosting] = useRecoilState(NewJobPostingAtom);
    const [loading, setLoading] = useRecoilState(isLoadingAtom);
    const [jobTitle, setjobTitle] = useState("" as string);
    const [jobDescription, setJobDescription] = useState("" as string);
    const [jobQualifications, setjobQualifications] = useState("" as string);
    const [salaryCompensation, setSalaryCompensation] = useState("" as string);
    const [customQuestion, setcustomQuestion] = useState("" as string);
    const [questions, setQuestions] = useRecoilState(questionsAtom);

    const db = getFirestore();
    const navigate = useNavigate();


    async function handleAddNewJob() {


        if (jobTitle.trim() == "" || jobDescription.trim() == "" || jobQualifications.trim() == "" || salaryCompensation == "") {
            toast.error("Kindly enter all mandatory details");
            return 0;
        }

        setLoading(true);
        console.log(questions);

        var doc = await addDoc(collection(db, "jobs"), {
            jobDetails: {
                jobDescription: jobDescription,
                jobQualifications: jobQualifications,
                jobTitle: jobTitle,
                salaryCompensation: salaryCompensation
            } as NewJobPosting,
            questions: questions,
            time: Timestamp.now(),
            postedBy: localStorage.getItem("uid") as string
        } as JobPosting);

        setLoading(false);
        navigate("/jobs");

    }

    function AddQuestion() {
        if (customQuestion.trim() == "") {
            toast.error("Kindly enter a question");
        }
        else {
            setQuestions([...questions, customQuestion]);
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



    useEffect(() => {
    }, [])

    return (
        <PageLayout>
            <FormLayout>

                <Heading text="Post a new job" />
                <SubHeading text="Open a new job posting and start receiving applications" customStyles="mt-2" />

                <SimpleInput value={jobTitle} onChange={setjobTitle} placeholder="Job Title" customStyles="mt-14" />

                <TextArea customStyles="mt-10" placeholder="Please provide a description of the job." value={jobDescription} onChange={setJobDescription} />
                <TextArea customStyles="mt-10" placeholder="Please provide qualifications required for the job." value={jobQualifications} onChange={setjobQualifications} />

                <SimpleInput value={salaryCompensation} onChange={setSalaryCompensation} placeholder="Salary Compensation" customStyles="mt-14" />

                <SubHeading text="Custom Questions" customStyles="mt-14 font-bold mb-5" />

                <div className="flex flex-row justify-start items-end w-full">
                    <SimpleInput value={customQuestion} onChange={setcustomQuestion} placeholder="Add a custom question" customStyles="" />
                    <button onClick={AddQuestion}>
                        <AiFillPlusCircle className="text-purp  h-10 w-10 ml-5" />
                    </button>
                </div>


                <div className="flex-col h-min gap-2 mt-10 w-full flex justify-start items-start">
                    {
                        questions.map((e: any, index: any) => {
                            return (
                                <div key={`${e}${index}`} className="h-min flex flex-row justify-start items-start text-blue text-md border-2 rounded-md border-blue pt-3 px-4 py-2 w-full">
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

                <ButtonSolid text="Post Job" onClick={handleAddNewJob} customStyles="mt-10 mb-48" />




            </FormLayout>
        </PageLayout>

    )
}