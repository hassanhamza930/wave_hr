import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { UserInterface } from "../../../atoms/app/globalUserAtom";
import NewJobPageIndexAtom, { NewJobPostingAtom } from "../atoms/newJobAtoms";
import PostNewJobForm from "../components/BasicJobDetails";

export default function NewJob() {

    const [pageIndex, setPageIndex] = useRecoilState(NewJobPageIndexAtom);
    const [newJobPosting, setNewJobPosting] = useRecoilState(NewJobPostingAtom);
    const [interviewSetup,setInterviewsSetup]=useState(false);
    const db=getFirestore();
    const navigate=useNavigate();

    async function checkIsInterviewSetup(){
        var data:UserInterface=await (await getDoc(doc(db,"users",localStorage.getItem('uid') as string))).data() as UserInterface;
        if(data.interviewEmail==null || data.interviewEmail==""){    
            toast("Kindly setup an interview email first.");
            navigate("/interviews");
            setInterviewsSetup(false)
        }else{
            setInterviewsSetup(true)
        }
    }

    useEffect(()=>{
        checkIsInterviewSetup()
    })

    return (
        <div className="pt-[50px] h-screen w-full flex justify-center items-center overflow-y-scroll ">
            {interviewSetup==true&&<PostNewJobForm />}
        </div>
    )
}