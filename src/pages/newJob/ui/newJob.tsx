import { ItemType } from "antd/es/menu/hooks/useItems";
import { addDoc, collection, doc, getDoc, getFirestore, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdArrowDropDown, MdDelete, MdHdrPlus, MdPlusOne } from "react-icons/md";
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
import NewJobPageIndexAtom, { NewJobPosting, NewJobPostingAtom, questionsAtom } from "../atoms/newJobAtoms";
import PostNewJobForm from "../components/PostNewJob";
import { Dropdown } from "react-bootstrap";
import { Menu } from "@headlessui/react";
import { JobDataInterface } from "../../../standards/interfaces/interfaces";
import { selectedCompanyAtom } from "../../jobs/atoms/selectedCompanyAtom";

export default function NewJob() {

    const [pageIndex, setPageIndex] = useRecoilState(NewJobPageIndexAtom);
    const [newJobPosting, setNewJobPosting] = useRecoilState(NewJobPostingAtom);
    const [loading, setLoading] = useRecoilState(isLoadingAtom);
    const [selectedCompany, setSelectedCompany] = useRecoilState(selectedCompanyAtom);
    const [jobTitle, setjobTitle] = useState("" as string);
    const [jobDescription, setJobDescription] = useState("" as string);
    const [jobQualifications, setjobQualifications] = useState("" as string);
    const [salaryCompensation, setSalaryCompensation] = useState("" as string);
    const [customQuestion, setcustomQuestion] = useState("" as string);
    const [location, setLocation] = useState("" as string);
    const [jobType, setjobType] = useState("" as string);
    const [workModel, setWorkModel] = useState("" as string);
    const [questions, setQuestions] = useRecoilState(questionsAtom);
    const workModels = ["Remote", "Onsite", "Hybrid"];
    const jobTypes = ["Full-time", "Part-Time"];




    const db = getFirestore();
    const navigate = useNavigate();


    async function handleAddNewJob() {
        if (jobTitle.trim() == "" || jobDescription.trim() == "" || jobQualifications.trim() == "" || salaryCompensation == "" || location=="" || jobType=="" || workModel=="") {
            toast.error("Kindly enter all mandatory details");
            return 0;
        }

        setLoading(true);
        console.log(questions);

        var doc = await addDoc(collection(db, "jobs"), {
            companyId:selectedCompany.id,
            jobDescription:jobDescription,
            jobQualifications:jobQualifications,
            jobTitle:jobTitle,
            jobType:jobType,
            location:location,
            questions:questions,
            salaryCompensation:salaryCompensation,
            time:Timestamp.now(),
            workModel:workModel,
            postedBy: localStorage.getItem("uid") as string
        } as JobDataInterface);

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

                <SimpleInput value={jobTitle} onChange={setjobTitle} placeholder="Job Title*" customStyles="mt-14" />

                <TextArea customStyles="mt-10" placeholder="Please provide a description of the job*" value={jobDescription} onChange={setJobDescription} />
                <TextArea customStyles="mt-10" placeholder="Please provide qualifications required for the job*" value={jobQualifications} onChange={setjobQualifications} />

                <SimpleInput value={salaryCompensation} onChange={setSalaryCompensation} placeholder="Salary Compensation*" customStyles="mt-14" />
                <SimpleInput value={location} onChange={setLocation} placeholder="Location*" customStyles="mt-14" />

                <SubHeading text="Work Model*" customStyles="mt-10  mb-2 text-sm" />
                <div className="relative">
                    <Menu>
                        <Menu.Button className="border-[1px] border-black px-6 flex flex-row gap-2 justify-start items-center py-2 rounded-md text-sm">
                            {workModel == "" ? "Select a work model" : workModel}
                            <MdArrowDropDown className="text-blue h-4 w-4" />
                        </Menu.Button>
                        <Menu.Items className={"absolute z-50 mt-1 rounded-md bg-white flex flex-col justify-start items-start"}>
                            {
                                workModels.map((workModel) => {
                                    return (
                                        <Menu.Item>
                                            <button onClick={() => { setWorkModel(workModel) }} className="text-sm flex justify-start items-start px-4 py-2 w-36">
                                                {workModel}
                                            </button>
                                        </Menu.Item>
                                    )
                                })
                            }
                        </Menu.Items>
                    </Menu>
                </div>


                <SubHeading text="Job Type*" customStyles="mt-10  mb-2 text-sm" />

                <div className="relative">
                    <Menu>
                        <Menu.Button className="border-[1px] border-black px-6 flex flex-row gap-2 justify-start items-center py-2 rounded-md text-sm">
                            {jobType == "" ? "Select a job type" : jobType}
                            <MdArrowDropDown className="text-blue h-4 w-4" />
                        </Menu.Button>
                        <Menu.Items className={"absolute z-50 mt-1 rounded-md bg-white flex flex-col justify-start items-start"}>
                            {
                                jobTypes.map((jobType) => {
                                    return (
                                        <Menu.Item>
                                            <button onClick={() => { setjobType(jobType) }} className="text-sm flex justify-start items-start px-4 py-2 w-36">
                                                {jobType}
                                            </button>
                                        </Menu.Item>
                                    )
                                })
                            }
                        </Menu.Items>
                    </Menu>
                </div>


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