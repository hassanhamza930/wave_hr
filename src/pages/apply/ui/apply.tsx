import { doc, getDoc, getFirestore, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useRecoilState } from "recoil";
import isLoadingAtom from "../../../atoms/app/isLoadingAtom";
import { JobDataInterface } from "../../../standards/interfaces/interfaces";
import { ButtonOutlinedWhite } from "../../../standards/styles/components/button";
import { ApplyStageInitiatedAtom, jobDataAtom, SelectedJobIdAtom } from "../atoms/applyPageAtoms";
import ApplicationWindow from "../components/applicationWindow";


export interface CompanyData {
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
    const [selectedJobId, setSelectedJobId] = useRecoilState(SelectedJobIdAtom);

    const db = getFirestore();
    const [applyStageInitiated, setApplyStageInitiated] = useRecoilState<boolean>(ApplyStageInitiatedAtom);


    async function syncData(jobId: string) {
        setLoading(true);
        console.log("syncing");
        var docData = await getDoc(doc(db, "jobs", jobId as string));
        var companyData = (await getDoc(doc(db, "users", docData.data()!["postedBy"] as string))).data()!["companyDetails"];
        setJobData(docData.data() as JobDataInterface);
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

            {/* <div className="relative h-screen w-full bg-blue flex justify-center items-center">

                <div id="no_scroll" className="pb-20 text-black w-full md:w-[70%] rounded-md h-full md:h-[90%] overflow-y-scroll flex-col justify-start items-start">
                    <div className="rounded-md h-72 w-full bg-gradient-to-br from-purple-700 to-blue-800 bg-cover bg-center bg-[url('https://assets-global.website-files.com/5c7fdbdd4e3feeee8dd96dd2/62c4ff55b8637de51557f5f0_growth-flat-color.gif')]"></div>

                    <div className="flex flex-col justify-start items-start p-5">
                        <div className="flex flex-wrap justify-between items-center">

                            <div className="flex flex-col justify-start items-start w-full">
                                <div className="text-tan/90 mt-5 font-bold text-4xl md:text-6xl">{jobData.jobDetails.jobTitle}</div>
                                <div className="text-tan/90 mt-5 text-sm">
                                    Posted on {jobData.time.toDate().toLocaleString().toString()}
                                </div>

                            </div>

                            <div className="w-full md:w-min flex flex-col justify-start items-start mt-10 bg-tan/20 rounded-md shadow-xl p-3 md:p-5">

                                <div className="flex flex-row justify-start items-start gap-2 ">

                                    <div style={{ backgroundImage: `url('${companyData.companyLogo}')` }} className="bg-contain bg-no-repeat bg-center h-16 w-16 rounded-sm bg-transparent"></div>
                                    <div className="flex w-full flex-col justify-start items-start p-1">
                                        <div className="text-tan/80 font-bold text-md">{companyData.companyName}</div>
                                        <div className="text-tan/80 w-full md:w-96 text-md">{companyData.companyDescription}</div>
                                    </div>
                                </div>

                                <div className="w-full h-[1px] bg-tan/50 my-3"></div>

                                <div className="flex flex-col font-bold text-tan/80 text-sm">
                                    <div>
                                        {companyData.numberOfTeamMembers} Employees
                                    </div>
                
                                </div>
                            </div>
                        </div>


                        <div className="text-tan/90 mt-10 font-bold text-2xl">Job Description</div>
                        <div dangerouslySetInnerHTML={{ __html: jobData.jobDetails.jobDescription }} className="text-tan/90 mt-2 text-md"></div>

                        <div className="text-tan/90 font-bold text-2xl mt-10">Job Qualifications</div>
                        <div dangerouslySetInnerHTML={{ __html: jobData.jobDetails.jobQualifications }} className="text-tan/90 mt-2 text-md"></div>

                        <div className="text-tan/90 mt-10 flex flex-col justify-start items-start">
                            <div className="text-2xl font-bold">Salary Compensation</div> 
                            <div className="text-md mt-2">{jobData.jobDetails.salaryCompensation}</div>
                        </div>

                        <ButtonOutlinedWhite customStyles="mt-10" text="Apply" onClick={() => { setApplyStageInitiated(true); }} />
                        
                    </div>

                </div>

            </div> */}
        </>
    )
}