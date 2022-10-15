import { doc, getDoc, getFirestore, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useRecoilState } from "recoil";
import isLoadingAtom from "../../../atoms/app/isLoadingAtom";
import { JobPosting } from "../../jobs/components/JobCard";


export interface CompanyData {
    averageSalaryOfEmployees: string,
    companyDescription: string,
    companyLogo: string,
    companyName: string,
    numberOfTeamMembers: string
}

export default function Apply() {

    const { jobId } = useParams();
    const [loading, setLoading] = useRecoilState(isLoadingAtom);
    const [companyData, setCompanyData] = useState({} as CompanyData);
    const [jobData, setJobData] = useState<JobPosting>({
        jobDetails: {
            jobDescription: "",
            jobQualifications: "",
            endSalary: "",
            jobTitle: "",
            startSalary: ""
        },
        questions: [] as Array<string>,
        time: Timestamp.now(),
        posedBy: ""
    } as JobPosting);

    const db = getFirestore();


    async function syncData(jobId: string) {
        // setLoading(true);
        var docData = await getDoc(doc(db, "jobs", jobId as string));
        var companyData = (await getDoc(doc(db, "users", localStorage.getItem("uid") as string))).data()!["companyDetails"];
        setJobData(docData.data() as JobPosting);
        setCompanyData(companyData);
        setLoading(false);
    }

    useEffect(() => {
        console.log("the recieved job id is ", jobId);
        syncData(jobId as string);
    }, [])




    return (
        <>  
            <div className="h-screen w-full bg-breen flex justify-center items-center">

                <div className="text-breen w-[70%] rounded-md h-[90%] overflow-y-scroll flex flex-col justify-start items-start">
                    <div className="rounded-md h-72 w-full bg-gradient-to-br from-red-700 to-yellow-800 bg-cover bg-center bg-[url('https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/61a77a4a6e46e5363fbbde1d_purple-pink.png')]"></div>
                    <div className="text-white/90 mt-5 font-bold text-5xl">{jobData.jobDetails.jobTitle}</div>
                    <div className="flex flex-row justify-center items-center gap-2 mt-10">

                        <div style={{ backgroundImage: `url('${companyData.companyLogo}')` }} className="bg-cover bg-center h-16 w-16 rounded-sm bg-white/90"></div>
                        <div className="flex flex-col justify-center items-start">
                            <div className="text-white/80 font-bold text-md">{companyData.companyName}</div>
                            <div className="text-white/80 text-md">{companyData.companyDescription}</div>
                        </div>
                    </div>

                    <div className="flex flex-col text-white/80 text-sm mt-5">
                        <div>
                            {companyData.numberOfTeamMembers} Employees
                        </div>
                        <div>
                            Average Yearly Salary: ${companyData.averageSalaryOfEmployees}
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}