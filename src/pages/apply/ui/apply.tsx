import { doc, getDoc, getFirestore, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { BsPerson, BsPin } from "react-icons/bs";
import { GiOppression } from "react-icons/gi";
import { useNavigate, useParams } from "react-router";
import { useRecoilState } from "recoil";
import isLoadingAtom from "../../../atoms/app/isLoadingAtom";
import { CompanyDataInterface, JobDataInterface } from "../../../standards/interfaces/interfaces";
import { ButtonOutlinedWhite, ButtonSolid } from "../../../standards/styles/components/button";
import { Heading, SubHeading } from "../../../standards/styles/components/heading";
import { ApplyStageInitiatedAtom, jobDataAtom } from "../atoms/applyPageAtoms";
import ApplicationWindow from "../components/applicationWindow";
import PublicFacingLayout from "../../../standards/styles/layouts/PublicFacingLayout";
import {motion} from "framer-motion";

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
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, delay: 0.2 }}
                        style={{
                            backgroundImage: `url('${!companyData.companyCover
                                ? 'https://assets-global.website-files.com/5c7fdbdd4e3feeee8dd96dd2/62c4ff55b8637de51557f5f0_growth-flat-color.gif'
                                : companyData.companyCover
                                }')`,
                        }}
                        className={`relative z-10 w-full h-36 md:h-64 bg-blue bg-cover shadow-md bg-center rounded-3xl flex justify-end items-end p-10`}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className='relative z-30 flex items-center justify-center'>
                        <div className='border-2 border-white bg-tan shadow-md h-24 w-24 md:w-36 md:h-36 rounded-md overflow-hidden -mt-12 md:-mt-24'>
                            <img
                                src={companyData.companyLogo}
                                alt={companyData.companyName}
                                className='w-full h-full rounded-md object-contain'
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.8 }}
                        className='flex flex-col justify-center items-center mt-3'>
                        <Heading text={companyData.companyName} />
                        <div className='text-black text-sm mt-1 md:mt-2'>
                            {companyData.companyLocation}
                        </div>
                    </motion.div>

                    
                </PublicFacingLayout>
            </> : <></>
    )
}