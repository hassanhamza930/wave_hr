import { doc, getDoc, getFirestore, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useRecoilState } from "recoil";
import isLoadingAtom from "../../../atoms/app/isLoadingAtom";
import { CompanyDataInterface, JobDataInterface } from "../../../standards/interfaces/interfaces";
import { ButtonOutlinedWhite } from "../../../standards/styles/components/button";
import { SubHeading } from "../../../standards/styles/components/heading";
import { ApplyStageInitiatedAtom, jobDataAtom } from "../atoms/applyPageAtoms";
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
    const [companyData, setCompanyData] = useState({} as CompanyDataInterface);
    const [jobData, setJobData] = useRecoilState(jobDataAtom);
    const navigate=useNavigate();

    const db = getFirestore();
    const [applyStageInitiated, setApplyStageInitiated] = useRecoilState<boolean>(ApplyStageInitiatedAtom);


    async function syncData(jobId: string) {
        setLoading(true);
        console.log("syncing");
        var jobData: JobDataInterface = (await getDoc(doc(db, "jobs", jobId as string))).data() as JobDataInterface;
        var companyData: CompanyDataInterface = (await getDoc(doc(db, "companies", jobData.companyId as string))).data() as CompanyDataInterface;
        jobData.id = jobId;
        companyData.id = jobData.companyId;
        setJobData(jobData);
        setCompanyData(companyData);
        setLoading(false);
    }

    useEffect(() => {
        console.log("the recieved job id is ", jobId);
        console.log("applying");
        syncData(jobId as string);
    }, [])


    return (
        jobData.companyId != null && companyData.companyOwnerId != null ?
            <>
                {applyStageInitiated == true && <ApplicationWindow />}

                <div className="relative h-screen w-full bg-blue flex justify-center items-center">
                    <div id="no_scroll" className="pb-20 text-black w-full md:w-[70%] rounded-md h-full md:h-[90%] overflow-y-scroll flex-col justify-start items-start">


                        <div style={{ backgroundImage: companyData.companyCover == "" ? "url('https://assets-global.website-files.com/5c7fdbdd4e3feeee8dd96dd2/62c4ff55b8637de51557f5f0_growth-flat-color.gif')" : `url('${companyData.companyCover}')` }} className="rounded-md h-72 w-full bg-gradient-to-br from-purple-700 to-blue-800 bg-cover bg-center bg-[]"></div>
                        {/* <div style={{ backgroundImage: `url('${companyData.companyLogo}')` }} className="h-36 w-36 bg-blue rounded-md ml-10 -mt-24 bg-cover bg-center bg-[url('https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/61a77a4a6e46e5363fbbde1d_purple-pink.png')]"></div> */}



                        <div className="flex flex-col justify-start items-start p-5">
                            <div className="flex flex-wrap justify-between items-center">

                                <div className="flex flex-col justify-start items-start w-full">
                                    <div className="text-tan/90 mt-5 font-bold text-4xl md:text-6xl">{jobData.jobTitle}</div>
                                    <div className="text-md font-regular text-tan mt-2">{jobData.workModel} , {jobData.jobType}</div>
                                    <div className="text-md font-regular text-tan mt-1">{jobData.location}</div>
                                    <div className="text-tan/80 mt-5 text-sm">
                                        Posted on {jobData.time.toDate().toLocaleString().toString()}
                                    </div>

                                </div>

                                <button onClick={()=>{navigate("/company/"+jobData.companyId.toString())}} className="w-[500px] flex flex-col justify-start items-start mt-10 hover:bg-tan bg-tan/80 backdrop-blur-md hover:scale-[1.02] rounded-md shadow-xl p-3 md:p-5">

                                    <div className="flex flex-row justify-start items-start gap-2 ">

                                        <div style={{ backgroundImage: `url('${companyData.companyLogo}')` }} className="bg-contain bg-no-repeat bg-center h-16 w-16 rounded-sm bg-transparent"></div>
                                        <div className="flex w-full flex-col justify-start items-start p-1">
                                            <div className="text-black font-bold text-start text-md">{companyData.companyName}</div>
                                            <div className="text-black w-full md:w-96 text-start text-md">{companyData.companyDescription}</div>
                                        </div>
                                    </div>

                                    <div className="w-full h-[1px] bg-black/50 mt-3"></div>

                                    <div className="flex flex-col text-start w-full font-medium mt-5 mb-2 text-black text-sm">
                                        <div>
                                            {companyData.numberOfEmployees} Employees
                                        </div>
                                        {companyData.companyLocation}
                                    </div>
                                    <div className="text-tan text-sm font-regular mt-2 gap-2 w-full flex justify-start items-start">
                                        {companyData.companyTags.map((tag) => {
                                            return <div className="px-4 py-2 rounded-full bg-blue text-tan text-sm">
                                                {tag}
                                            </div>
                                        })}
                                    </div>

                                    
                                </button>
                            </div>


                            <div className="text-tan/90 mt-10 font-bold text-2xl">Job Description</div>
                            <div dangerouslySetInnerHTML={{ __html: jobData.jobDescription }} className="text-tan/90 mt-2 text-md"></div>

                            <div className="text-tan/90 font-bold text-2xl mt-10">Job Qualifications</div>
                            <div dangerouslySetInnerHTML={{ __html: jobData.jobQualifications }} className="text-tan/90 mt-2 text-md"></div>

                            <div className="text-tan/90 mt-10 flex flex-col justify-start items-start">
                                <div className="text-2xl font-bold">Salary Compensation</div>
                                <div className="text-md mt-2">{jobData.salaryCompensation}</div>
                            </div>

                            <ButtonOutlinedWhite customStyles="mt-10" text="Apply" onClick={() => { setApplyStageInitiated(true); }} />

                        </div>

                    </div>

                </div>
            </> : <></>
    )
}