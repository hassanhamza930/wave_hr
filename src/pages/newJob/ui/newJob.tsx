import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { UserInterface } from "../../../atoms/app/globalUserAtom";
import NewJobPageIndexAtom, { NewJobPostingAtom } from "../atoms/newJobAtoms";
import PostNewJobForm from "../components/PostNewJob";

export default function NewJob() {

    const [pageIndex, setPageIndex] = useRecoilState(NewJobPageIndexAtom);
    const [newJobPosting, setNewJobPosting] = useRecoilState(NewJobPostingAtom);
    const db=getFirestore();
    const navigate=useNavigate();


    useEffect(()=>{
    })

    return (
        <div className="pt-[50px] h-screen w-full flex justify-center items-center overflow-y-scroll ">
            <PostNewJobForm />
        </div>
    )
}