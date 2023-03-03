import { collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UserDataInterface } from "../../../standards/interfaces/interfaces";
import { Heading } from "../../../standards/styles/components/heading";




function GettingStarted() {

    const db = getFirestore();
    const [companySetup, setcompanySetup] = useState(false);
    const [jobSetup, setJobSetup] = useState(false);
    const [interviewSetup, setInterviewSetup] = useState(false);
    const [localLoading, setLocalLoading] = useState(false);
    const navigate=useNavigate();

    async function checkWhetherFieldsSetup() {
        var companiesDocs = (await getDocs(query(collection(db, "companies"), where("companyOwnerId", "==", localStorage.getItem("uid") as string)))).docs;
        var jobsDocs = (await getDocs(query(collection(db, "jobs"), where("postedBy", "==", localStorage.getItem("uid") as string)))).docs;
        var userDoc: UserDataInterface = (await getDoc(doc(db, 'users', localStorage.getItem("uid") as string))).data() as UserDataInterface;

        if (companiesDocs.length > 0) {
            setcompanySetup(true);
        }
        if (jobsDocs.length > 0) {
            setJobSetup(true);
        }
        if (userDoc!.interviewsSetup == true) {
            setInterviewSetup(true);
        }

    }


    useEffect(() => {
        checkWhetherFieldsSetup();
    }, []);

    return (
        <>
            <div className="flex flex-col justify-start items-start">
                {
                    companySetup == true && jobSetup == true && interviewSetup == true ?
                        <Heading customStyles="mb-10" text="You are all set,"></Heading> :
                        <Heading customStyles="mb-10" text="Let's get you started,"></Heading>
                }
                <div className="flex flex-row justify-end items-center gap-4">
                    <div className="h-4 w-4 rounded-full bg-purp"></div>
                    {
                        companySetup == true ?
                            <div className="text-md font-medium line-through text-blue">Setup a company profile</div> :
                            <button onClick={()=>{navigate("/companies")}} className="text-md font-medium hover:text-purp text-black">Setup a company profile</button>
                    }
                </div>
                <div className="h-20 w-1 ml-[6px] -mt-2 -mb-2 bg-purp">
                </div>
                <div className="flex flex-row justify-end items-center gap-4">
                    <div className="h-4 w-4 rounded-full bg-purp"></div>
                    {
                        jobSetup == true ?
                            <div className="text-md font-medium line-through text-blue">Post a job</div> :
                            <button onClick={()=>{navigate("/jobs")}} className="text-md font-medium text-black hover:text-purp">Post a job</button>
                    }
                </div>
                <div className="h-20 w-1 ml-[6px] -mt-2 -mb-2 bg-purp">
                </div>
                <div className="flex flex-row justify-end items-center gap-4">
                    <div className="h-4 w-4 rounded-full bg-purp"></div>
                    {
                        interviewSetup == true ?
                            <div className="text-md font-medium line-through text-blue">Setup Interview</div> :
                            <button onClick={()=>{navigate("/interviews")}} className="text-md font-medium hover:text-purp text-black">Setup Interview</button>
                    }
                </div>


            </div>


        </>
    );
}

export default GettingStarted;