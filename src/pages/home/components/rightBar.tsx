import { useEffect, useState } from "react";
import { JobDataInterface } from "../../../standards/interfaces/interfaces";
import { collection, getDocs, getFirestore, query, where,orderBy } from "firebase/firestore";
import ReactQuill from "react-quill";
import { BiBriefcase, BiCurrentLocation } from "react-icons/bi";
import { useRecoilState } from "recoil";
import isLoadingAtom from "../../../atoms/app/isLoadingAtom";
import { motion } from "framer-motion";

export function JobPreviewCard(props: JobDataInterface) {
    return (
        <div className="w-full h-72 bg-blue/10 hover:bg-lightblue/10 rounded-3xl py-5 pb-20 px-10 hover:shadow-md shadow-sm transition-all duration-300 hover:scale-[1.01]">
            <div className="flex h-full flex-col overflow-y-hidden overflow-x-hidden justify-start items-start w-full">
                <div className="flex flex-row w-full justify-between items-center">
                    <div className="text-2xl font-semibold text-black w-[70%] overflow-x-hidden">
                        {props.jobTitle}
                    </div>
                    <div className='flex flex-col justify-start items-start'>
                        <div className='text-dark-gray text-[12px] mt-2 flex flex-row justify-center items-center gap-1'>
                            <BiCurrentLocation />
                            {props.location}
                        </div>
                        <div className='flex flex-row text-[12px] justify-center items-center gap-1 text-dark-gray mt-1'>
                            <BiBriefcase />
                            <div>{props.jobType}, {props.workModel}</div>
                        </div>
                    </div>

                </div>
                {/* <div className="text-sm font-regular text-black">{props.jobDescription}</div> */}
                <ReactQuill className="-ml-3 w-full text-sm" value={props.jobDescription} readOnly={true} theme="bubble" />
            </div>
        </div>
    );
}



function RightBar() {
    const [allJobsPostedByUser, setallJobsPostedByUser] = useState([] as Array<JobDataInterface>);
    const db = getFirestore();
    const [loading, setLoading] = useRecoilState(isLoadingAtom);

    function fetchAllJobsPostedByUser() {
        getDocs(query( collection(db, "jobs"), where("postedBy", "==", localStorage.getItem('uid') as string,))).then((querySnapshot) => {
            let allJobs: Array<JobDataInterface> = [];

            querySnapshot.forEach((doc) => {
                allJobs.push(doc.data() as JobDataInterface);
            });

            setallJobsPostedByUser(allJobs);
        });
    }

    useEffect(() => {
        fetchAllJobsPostedByUser();
    }, []);


    return (
        <div id="no_scroll" className="flex bg-white h-full w-full flex-col justify-start overflow-y-scroll items-start gap-3 p-10">
            {
                allJobsPostedByUser.map((job,index) => {
                    return (
                        <motion.div 
                        initial={{opacity:0}}
                        animate={{opacity:1}}
                        transition={{duration:0.5,delay:(index+1)*0.2}}
                        key={job.companyId+index}>
                            <JobPreviewCard {...job} />
                        </motion.div>
                    );
                })
            }
        </div>
    );
}

export default RightBar;