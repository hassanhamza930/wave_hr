import {useState, useEffect} from "react";
import { addDoc, collection, doc, DocumentData, getDoc, getFirestore, setDoc, Timestamp } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { useRecoilState } from "recoil";
import isLoadingAtom from "../../../atoms/app/isLoadingAtom";
import pageIndexAtom, { NewJobPosting, NewJobPostingAtom, questionsAtom } from "../../newJob/atoms/newJobAtoms";
import ReactQuill from "react-quill";
import { MdDelete } from "react-icons/md";
import { JobPosting } from "../../jobs/components/JobCard";
import SimpleInput, { TextArea } from "../../../standards/styles/components/inputs";
import { Heading, SubHeading } from "../../../standards/styles/components/heading";
import FormLayout from "../../../standards/styles/layouts/FormLayout";
import PageLayout from "../../../standards/styles/layouts/pageLayout";
import { AiFillPlusCircle } from "react-icons/ai";
import { ButtonSolid } from "../../../standards/styles/components/button";

function EditJob() {
    const { jobId } = useParams();
    const db = getFirestore();
    const [loading, setLoading] = useRecoilState(isLoadingAtom);
    const [jobTitle, setjobTitle] = useState("" as string);
    const [jobDescription, setJobDescription] = useState("" as string);
    const [jobQualifications, setjobQualifications] = useState("" as string);
    const [salaryCompensation, setSalaryCompensation] = useState("" as string);
    const [customQuestion, setcustomQuestion] = useState("" as string);
    const [questions, setQuestions] = useRecoilState(questionsAtom);
    const navigate=useNavigate();

    async function UpdateJob() {


        if(jobTitle.trim()=="" || jobDescription.trim()=="" || jobQualifications.trim()=="" || salaryCompensation=="" ){
            toast.error("Kindly enter all mandatory details");
            return 0;
        }

        setLoading(true);
        console.log(questions);
        
        await setDoc(doc(db, "jobs",jobId as string), {
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
        
        if(customQuestion.trim()==""){
            toast.error("Kindly enter a question");
        }
        else{
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

    async function PreFillValues(){
        setLoading(true);
        var jobData:JobPosting= (await getDoc(doc(db,"jobs",jobId as string))).data() as JobPosting;
        setjobTitle(jobData.jobDetails.jobTitle);
        setJobDescription(jobData.jobDetails.jobDescription);
        setjobQualifications(jobData.jobDetails.jobQualifications);
        setSalaryCompensation(jobData.jobDetails.salaryCompensation);
        setQuestions(jobData.questions)
        setLoading(false);

    }

    useEffect(()=>{
        PreFillValues();
    },[])


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

            <ButtonSolid text="Post Job" onClick={UpdateJob} customStyles="mt-10 mb-48" />




        </FormLayout>
    </PageLayout>
     );
}

export default EditJob;