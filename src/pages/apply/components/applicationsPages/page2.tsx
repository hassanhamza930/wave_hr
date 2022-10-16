import { useEffect } from "react"
import { useRecoilState } from "recoil";
import JobApplicationAtom from "../../atoms/applyPageAtoms";

export default function Page2(){

    const [jobApplication,setJobApplication]=useRecoilState(JobApplicationAtom);


    useEffect(()=>{
        console.log("this is coming from page 2");
        console.log(jobApplication);
    },[]);

    return(
        <div className="h-full w-full flex flex-col justify-start items-start p-10">
            <div className="text-3xl font-bold text-white">Upload your Resume</div>
            <div className="text-xl text-white mt-2">Tell us a bit more about yourself</div>
        </div>
    )
}