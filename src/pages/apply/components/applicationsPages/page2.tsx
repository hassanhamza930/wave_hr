import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillCamera } from "react-icons/ai";
import { useRecoilState } from "recoil";
import JobApplicationAtom, { ApplyPageIndexAtom, JobApplication, selectedProfilePictureAtom } from "../../atoms/applyPageAtoms";
import { motion } from "framer-motion";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { useParams } from "react-router";
import { ApplicationDataInterface } from "../../../../standards/interfaces/interfaces";


export default function Page2() {

    const [selectedProfilePicture, setSelectedProfilePicture] = useRecoilState(selectedProfilePictureAtom);
    const { watch, handleSubmit, register } = useForm<ApplicationDataInterface>();
    const [jobApplication, setJobApplication] = useRecoilState(JobApplicationAtom);
    const [pageIndex, setPageIndex] = useRecoilState(ApplyPageIndexAtom);
    const {jobId}=useParams();
    const db=getFirestore();



    async function handlePage2DataSubmit(data: ApplicationDataInterface) {

        if (watch("email") == "" || watch("email").includes("@") != true) {
            toast.error("Please enter your email properly")
        }
        else {

            var docs= await getDocs(query(collection(db,"jobs",jobId as string,"applications"),where("email","==",watch("email"))));    
            if(docs.docs.length>0){
                toast.error("Job application already exists");
            }
            else{
                setJobApplication({
                    ...jobApplication,
                    email: data.email
                });
                setPageIndex(2);
            }
        }
    }


    useEffect(() => {
        console.log(jobApplication);
    }, [])

    return (
        <motion.form
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 50 }
            }}
            onSubmit={handleSubmit(handlePage2DataSubmit)} className="text-left h-full rounded-md  flex justify-center items-start flex-col p-10 w-full md:w-[60%]">
            <div className="text-3xl text-start font-bold text-tan">Please enter your email</div>
            <div className="text-xl text-left text-tan mt-2">This will be used for further communication</div>

            <input {...register("email")} placeholder="Email" className="mt-10 w-48 md:w-96 border-b-[1px] border-tan/90 text-tan/90 bg-transparent outline-0 px-2 py-1 flex justify-center items-center">
            </input>

            <button type="submit" className="border-tan border-2 hover:bg-tan bg-transparent text-tan hover:text-black px-8 rounded-full py-2 flex flex-row justify-center items-center gap-2 mt-20 w-min">
                Next
            </button>


        </motion.form>
    )
}