import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { UserInterface } from "../../../atoms/app/globalUserAtom";
import {Heading,SubHeading } from "../../../standards/styles/components/heading";
import SimpleInput, { RichTextarea } from "../../../standards/styles/components/inputs";
import FormLayout from "../../../standards/styles/layouts/FormLayout";
import PageLayout from "../../../standards/styles/layouts/pageLayout";
import Page from "../../../standards/styles/layouts/pageLayout";
import NewJobPageIndexAtom, { NewJobPostingAtom } from "../atoms/newJobAtoms";
import PostNewJobForm from "../components/PostNewJob";

export default function NewJob() {

    const [pageIndex, setPageIndex] = useRecoilState(NewJobPageIndexAtom);
    const [newJobPosting, setNewJobPosting] = useRecoilState(NewJobPostingAtom);
    const [jobTitle, setjobTitle] = useState("" as string);
    const [jobDescription, setJobDescription] = useState("" as string);
    const db=getFirestore();
    const navigate=useNavigate();


    interface handleValueChangeProps{
        newValue:any,
        updateValue:any
    }

    


    useEffect(()=>{
    },[jobTitle])

    return (
        <PageLayout>
            <FormLayout>

                <Heading text="Post a new job" />
                <SubHeading text="Open a new job posting and start receiving applications" customStyles="mt-2" />
                
                <SimpleInput value={jobTitle} onChange={setjobTitle} placeholder="Job Title" customStyles="mt-14"/>

                <RichTextarea placeholder="Please provide a description of the job." value={jobDescription} onChange={setJobDescription}/>



            </FormLayout>
        </PageLayout>
        
    )
}