import { doc, getDoc, getFirestore, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { BsPerson, BsPin } from "react-icons/bs";
import { GiOppression } from "react-icons/gi";
import { useNavigate, useParams } from "react-router";
import { useRecoilState } from "recoil";
import isLoadingAtom from "../../../atoms/app/isLoadingAtom";
import { CompanyDataInterface, JobDataInterface } from "../../../standards/interfaces/interfaces";
import { ButtonOutlinedWhite, ButtonSolid, StandardBlueButton, StandardWhiteButton } from "../../../standards/styles/components/button";
import { Heading, SubHeading, Text } from "../../../standards/styles/components/heading";
import { ApplyStageInitiatedAtom, jobDataAtom } from "../atoms/applyPageAtoms";
import ApplicationWindow from "../components/applicationWindow";
import PublicFacingLayout from "../../../standards/styles/layouts/PublicFacingLayout";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { BiBriefcase, BiCurrentLocation, BiLocationPlus, BiPlus } from "react-icons/bi";
import { MdDone } from "react-icons/md";
import ReactQuill from "react-quill";

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
    const navigate = useNavigate();

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

                <PublicFacingLayout>
                    <motion.div
                        id="no_scroll"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        style={{
                            backgroundImage: `url('${!companyData.companyCover
                                ? 'https://assets-global.website-files.com/5c7fdbdd4e3feeee8dd96dd2/62c4ff55b8637de51557f5f0_growth-flat-color.gif'
                                : companyData.companyCover
                                }')`,
                        }}
                        className={`relative z-10 w-full h-36 md:h-64 bg-blue bg-cover shadow-md bg-center rounded-xl md:rounded-3xl flex justify-end items-end p-10`}
                    />

                    <div className='text-black flex justify-start items-start py-5 flex-col mt-0 md:mt-5'>
                        <div className="flex flex-row justify-between items-start md:items-center w-full">
                            <div className='font-bold text-3xl md:text-4xl'>
                                {jobData.jobTitle} at {companyData.companyName}
                            </div>
                            <div className="md:flex hidden">
                                <StandardBlueButton text="Apply" onClick={() => { setApplyStageInitiated(true); }} />
                            </div>
                        </div>

                        <div className='text-dark-gray text-sm mt-2 flex flex-row justify-center items-center gap-1'>
                            <BiCurrentLocation />
                            {jobData.location}
                        </div>
                        <div className='flex flex-row justify-center items-center gap-1 text-dark-gray text-sm mt-1'>
                            <BiBriefcase />
                            <div>{jobData.jobType}, {jobData.workModel}</div>
                        </div>

                        <div className='text-dark-gray text-sm mt-1 md:mt-5'>
                            {dayjs(jobData.time.toDate()).format('DD/MM/YY')}
                        </div>



                        <div className='font-semibold text-2xl mt-10'>Job Description</div>
                        {/* <div className='text-black mt-2 text-md' dangerouslySetInnerHTML={{__html: jobData.jobDescription}} /> */}
                        <ReactQuill readOnly={true} theme='bubble' value={jobData.jobDescription} className='mt-2 -ml-3'/>


                        <div className='font-semibold text-2xl'>Job Qualifications</div>
                        {/* <div className='text-black mt-2 text-md' dangerouslySetInnerHTML={{__html: jobData.jobQualifications}} /> */}
                        <ReactQuill readOnly={true} theme='bubble' value={jobData.jobQualifications} className='mt-2 -ml-3'/>


                        <div className='font-semibold text-2xl'>
                            Salary Compensation
                        </div>
                        <SubHeading
                            customStyles='mt-2 mb-16'
                            text={jobData.salaryCompensation}
                        />

                        <div className="md:hidden flex">
                            <StandardBlueButton text="Apply" onClick={() => { setApplyStageInitiated(true); }} />
                        </div>



                    </div>




                </PublicFacingLayout>
            </> : <></>
    )
}