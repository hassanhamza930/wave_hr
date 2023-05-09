import { addDoc, collection, getFirestore, Timestamp, getDoc, doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillCamera } from "react-icons/ai";
import { useRecoilState } from "recoil";
import isLoadingAtom from "../../../../atoms/app/isLoadingAtom";
import JobApplicationAtom, { ApplyPageIndexAtom, ApplyStageInitiatedAtom, jobDataAtom, ResponsesAtom, selectedProfilePictureAtom } from "../../atoms/applyPageAtoms";
import { motion } from "framer-motion";
import { useParams } from 'react-router';
import { CompanyData } from '../../ui/apply';
import sendEmail from '../../../../standards/functions/sendEmail';
import { ApplicationStatusEnum, ApplicationDataInterface, JobDataInterface, CompanyDataInterface, UserDataInterface } from '../../../../standards/interfaces/interfaces';
import ApplicantsFilterAtom from '../../../applicants/atoms/applicantsFilterAtom';
import globalUserAtom from '../../../../atoms/app/globalUserAtom';
import axios from 'axios';


async function dataUrlToFile(dataUrl: string, fileName: string): Promise<File> {
    const res: Response = await fetch(dataUrl);
    const blob: Blob = await res.blob();
    return new File([blob], fileName, { type: 'image/png' });
}


export const base64toPdfBlob = (data: string) => {
    // Cut the prefix `data:application/pdf;base64` from the raw base 64
    const base64WithoutPrefix = data.substr('data:application/pdf;base64,'.length);

    const bytes = atob(base64WithoutPrefix);
    let length = bytes.length;
    let out = new Uint8Array(length);

    while (length--) {
        out[length] = bytes.charCodeAt(length);
    }

    return new Blob([out], { type: 'application/pdf' });
};



export default function Page6() {

    const [selectedProfilePicture, setSelectedProfilePicture] = useRecoilState(selectedProfilePictureAtom);
    const [jobApplication, setJobApplication] = useRecoilState(JobApplicationAtom);
    const [responses, setResponses] = useRecoilState(ResponsesAtom);
    const [applyStageInitiated, setApplyStageInitiated] = useRecoilState<boolean>(ApplyStageInitiatedAtom);
    const [loading, setLoading] = useRecoilState(isLoadingAtom);
    const [jobData, setJobData] = useRecoilState(jobDataAtom);
    const { jobId } = useParams();
    const [pageIndex, setPageIndex] = useRecoilState(ApplyPageIndexAtom);

    const db = getFirestore();
    const storage = getStorage();




    async function SubmitApplication() {

        setLoading(true);
        var finalJobApplicationData:ApplicationDataInterface = { ...jobApplication, responses: responses } as ApplicationDataInterface;
        console.log(finalJobApplicationData);

        // Uploading Resume to Firebase
        var resumeData = jobApplication.resume;
        var resumeFileName = `resume${Timestamp.now().nanoseconds}.pdf`;
        var resumeFile = base64toPdfBlob(resumeData);
        const resumeRef = ref(storage, `resumes/${finalJobApplicationData.email}/${resumeFileName}`);

        await uploadBytes(resumeRef, resumeFile).then(async (snapshot) => {
            console.log('Uploaded the resume');
            console.log(snapshot.metadata);
            var downloadLink = await getDownloadURL(resumeRef);
            finalJobApplicationData.resume = downloadLink;
        });


        // Uploading Profile Pic to Firebase
        var profilePictureData = jobApplication.profilePicture;
        var profilePictureFileName = `profilePicture${Timestamp.now().nanoseconds}.png`;
        var profilePictureFile = await dataUrlToFile(profilePictureData, profilePictureFileName);
        const profilePictureRef = ref(storage, `profilePictures/${finalJobApplicationData.email}/${profilePictureFileName}`);

        await uploadBytes(profilePictureRef, profilePictureFile).then(async (snapshot) => {
            console.log('Uploaded the profilePicture');
            console.log(snapshot.metadata);
            var downloadLink2 = await getDownloadURL(profilePictureRef);
            finalJobApplicationData.profilePicture = downloadLink2;
        });


        console.log(finalJobApplicationData);

        await addDoc(collection(db, "jobs", jobData.id! as string, "applications"), { ...finalJobApplicationData, rating: 0, applicationStatus: ApplicationStatusEnum.pendingReview, applicationTime: Timestamp.now(),interviewInviteSent:false } as ApplicationDataInterface);
        var companyData:CompanyDataInterface=(await getDoc(doc(db, "companies", jobData.companyId! as string))).data() as CompanyDataInterface;
        var userRef=doc(db,"users",companyData.companyOwnerId! as string);
        await getDoc(userRef).then(async (doc)=>{
            var userData:UserDataInterface=doc.data() as UserDataInterface;
            var totalApplicantsForJobsPostedByThisUser:number=userData.totalApplicantsForJobsPostedByThisUser!=undefined?userData.totalApplicantsForJobsPostedByThisUser:0;
            await setDoc(userRef,{totalApplicantsForJobsPostedByThisUser:totalApplicantsForJobsPostedByThisUser+1} as UserDataInterface,{merge:true});
        });

        const resp=await axios.post("https://wavehrback.onrender.com/sendApplyNotification",{
            to:finalJobApplicationData.email,
            jobId:jobId,
            companyId:jobData.companyId
        });
        console.log(resp);

        setPageIndex(6);
        setLoading(false);
        toast.success("Job Application Successfully submitted");

    }










    useEffect(() => {
        console.log("this is coming from page 6");
        console.log(jobApplication);
        console.log(responses);
    }, [])



    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 50 }
            }}
            className="text-left h-full  flex justify-center items-start flex-col p-10 w-full md:w-[60%]">
            <div className="text-3xl text-start font-bold text-tan">All Done</div>
            <div className="text-xl text-left text-tan mt-2">Nice Job 👋</div>


            <button onClick={() => { SubmitApplication() }} className="border-white border-2 hover:bg-white bg-transparent text-tan hover:text-black px-8 py-2 flex flex-row justify-center items-center gap-2 rounded-full mt-20 w-min">
                Submit
            </button>
        </motion.div>
    )
}