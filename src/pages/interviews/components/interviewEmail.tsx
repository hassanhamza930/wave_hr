import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router"
import { UserInterface } from "../../../atoms/app/globalUserAtom";

export default function InterviewEmail() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const db = getFirestore();

    async function fetchInterviewEmail(){
        var userData:UserInterface= await (await getDoc(doc(db,"users",localStorage.getItem("uid") as string))).data() as UserInterface
        setEmail(userData.interviewEmail);
    }

    async function setInterviewEmail() {
        await setDoc(doc(db, "users", localStorage.getItem("uid") as string), {
            interviewEmail: email
        } as UserInterface, { merge: true })
        toast.success("Successfully Updated")
    }

    useEffect(()=>{
        fetchInterviewEmail()
    },[])

    return (
        <div id="no_scroll" className="h-[95%] w-2/4 rounded-md p-5 flex flex-col justify-start items-start overflow-y-scroll">
            <div className="text-4xl font-bold">Interview Email</div>
            <div className="text-sm text-black/90 mt-5 w-[80%]">This email will be used to send interview invites to candidates. Make sure you have all the meeting scheduling details on this email for example a Calendly Link.</div>
            <textarea value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Email Invitation" className="h-72 w-[90%] outline-none p-3 rounded-md bg-transparent border-2 border-black/50 text-sm mt-5"></textarea>
            <button onClick={setInterviewEmail} className=" mt-8 text-black font-bold hover:text-tan text-sm flex flex-row gap-5 justify-center items-center px-4 py-2 bg-transparent border-2 border-blue hover:bg-blue rounded-md">
                Update
            </button>
        </div>
    )
}