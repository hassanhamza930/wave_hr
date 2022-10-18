import { doc, getDoc, getFirestore, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useRecoilState } from "recoil";
import isLoadingAtom from "../../../atoms/app/isLoadingAtom";
import { JobPosting } from "../../jobs/components/JobCard";
import { ApplyStageInitiatedAtom, jobDataAtom, SelectedJobIdAtom } from "../atoms/applyPageAtoms";
import ApplicationWindow from "../components/applicationWindow";


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
    const [jobData, setJobData] = useRecoilState(jobDataAtom);
    const [selectedJobId,setSelectedJobId]=useRecoilState(SelectedJobIdAtom);

    const db = getFirestore();
    const [applyStageInitiated, setApplyStageInitiated] = useRecoilState<boolean>(ApplyStageInitiatedAtom);


    async function syncData(jobId:string) {
        setLoading(true);
        console.log("syncing");
        var docData = await getDoc(doc(db, "jobs", jobId as string));
        var companyData = (await getDoc(doc(db, "users", docData.data()!["postedBy"] as string))).data()!["companyDetails"];
        setJobData(docData.data() as JobPosting);
        setCompanyData(companyData);
        setLoading(false);
    }

    useEffect(() => {
        console.log("the recieved job id is ", jobId);
        console.log("applying");
        setSelectedJobId(jobId as string);
        syncData(jobId as string);
    }, [])


    return (
        <>
            {applyStageInitiated == true && <ApplicationWindow />}

            <div className="h-screen w-full bg-breen flex justify-center items-center">

                <div id="no_scroll" className="pb-20 text-breen w-full md:w-[70%] rounded-md h-full md:h-[90%] overflow-y-scroll flex-col justify-start items-start">
                    <div className="rounded-md h-72 w-full bg-gradient-to-br from-purple-700 to-blue-800 bg-cover bg-center bg-[url('https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/61a77a4a6e46e5363fbbde1d_purple-pink.png')]"></div>

                    <div className="flex flex-col justify-start items-start p-5">
                        <div className="flex flex-wrap justify-between items-center">

                            <div className="flex flex-col justify-start items-start w-full">
                                <div className="text-white/90 mt-5 font-bold text-4xl md:text-6xl">{jobData.jobDetails.jobTitle}</div>
                                <div className="text-white/90 mt-5 text-sm">
                                    Posted on {jobData.time.toDate().toLocaleString().toString()}
                                </div>

                            </div>

                            <div className="w-full flex flex-col justify-start items-start">
                                <div className="flex flex-row justify-start items-start gap-2 mt-10">

                                    <div style={{ backgroundImage: `url('${companyData.companyLogo}')` }} className="bg-cover bg-center h-16 w-16 rounded-sm bg-white/90"></div>
                                    <div className="flex w-full flex-col justify-start items-start">
                                        <div className="text-white/80 font-bold text-md">{companyData.companyName}</div>
                                        <div className="text-white/80 w-full md:w-96 text-md">{companyData.companyDescription}</div>
                                    </div>
                                </div>

                                <div className="flex flex-col text-white/80 text-sm mt-5">
                                    <div>
                                        {companyData.numberOfTeamMembers} Employees
                                    </div>
                                    <div>
                                        Annual Salary Range: ${jobData.jobDetails.startSalary} - ${jobData.jobDetails.endSalary}
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="text-white/90 mt-10 font-bold text-2xl">Job Description</div>
                        <div dangerouslySetInnerHTML={{__html: jobData.jobDetails.jobDescription}} className="text-white/90 mt-2 text-md"></div>

                        <div className="text-white/90 font-bold text-2xl mt-10">Job Qualifications</div>
                        <div dangerouslySetInnerHTML={{__html: jobData.jobDetails.jobQualifications}} className="text-white/90 mt-2 text-md"></div>

                        <button onClick={() => { setApplyStageInitiated(true); }} className="border-white border-2 hover:bg-white bg-transparent text-white hover:text-breen px-8 py-2 rounded-md mt-10 w-min">
                            Apply
                        </button>
                    </div>

                </div>

            </div>
        </>
    )
}