import { useEffect, useState } from "react";
import { JobDataInterface } from "../../../standards/interfaces/interfaces";
import { collection, getDocs, getFirestore, query, where,orderBy } from "firebase/firestore";
import ReactQuill from "react-quill";
import { BiBriefcase, BiCurrentLocation, BiPlus } from "react-icons/bi";
import { useRecoilState } from "recoil";
import isLoadingAtom from "../../../atoms/app/isLoadingAtom";
import { motion } from "framer-motion";
import { StandardBlueButton } from "../../../standards/components/button";
import { useNavigate } from "react-router";



export function JobPreviewCard(props: JobDataInterface) {
    return (
        <div onClick={()=>{window.open(`/apply/${props.id}`)}} className="cursor-pointer w-full h-72 bg-blue/10 hover:bg-blue text-black hover:text-tan rounded-3xl py-5 pb-10 px-10 hover:shadow-md shadow-sm transition-all duration-100 hover:scale-[1.02]">
            <div className="flex h-full flex-col overflow-y-hidden overflow-x-hidden justify-start items-start w-full">
                <div className="flex flex-row w-full justify-between items-center">
                    <div className="text-2xl font-semibold w-[70%] overflow-x-hidden">
                        {props.jobTitle}
                    </div>
                    <div className='flex flex-col justify-start items-start'>
                        <div className='text-[12px] mt-2 flex flex-row justify-center items-center opacity-80 gap-1'>
                            <BiCurrentLocation />
                            {props.location}
                        </div>
                        <div className='flex flex-row text-[12px] justify-center items-center gap-1 opacity-80 mt-1'>
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
    const navigate=useNavigate();

    function fetchAllJobsPostedByUser() {
        getDocs(query( collection(db, "jobs"), where("postedBy", "==", localStorage.getItem('uid') as string,))).then((querySnapshot) => {
            let allJobs: Array<JobDataInterface> = [];

            querySnapshot.forEach((doc) => {
                allJobs.push({...doc.data(),id:doc.id} as JobDataInterface);
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
                allJobsPostedByUser?.map((job,index) => {
                    return (
                        <motion.div 
                        initial={{opacity:0}}
                        animate={{opacity:1}}
                        transition={{duration:0.5,delay:(index+1)*0.2}}
                        className="w-full flex justify-center items-center"
                        key={job.companyId+index}>
                            <JobPreviewCard {...job} />
                        </motion.div>
                    );
                })
            }
            {
                allJobsPostedByUser.length==0&&
                <motion.div 
                initial={{opacity:0}}
                animate={{opacity:1}}
                transition={{duration:1,delay:0.2}}
                className='flex flex-col justify-center items-center w-full h-full'>
                    <div className='text-2xl font-semibold text-black'>No Jobs Posted Yet</div>
                    <div className='text-sm font-regular text-black'>Click on the button below to post your first job</div>
                    <StandardBlueButton text="Post a new job" customStyles="mt-10" icon={<BiPlus/>} onClick={()=>{navigate("/jobs")}} />
                </motion.div>
            }
        </div>
    );
}

export default RightBar;