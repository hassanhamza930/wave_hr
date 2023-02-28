import { addDoc, collection, getFirestore, Timestamp, getDoc, doc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillCamera } from "react-icons/ai";
import { useRecoilState } from "recoil";
import isLoadingAtom from "../../../../atoms/app/isLoadingAtom";
import pageIndexAtom from "../../../newJob/atoms/newJobAtoms";
import JobApplicationAtom, { ApplyStageInitiatedAtom, JobApplication, jobDataAtom, ResponsesAtom, selectedProfilePictureAtom } from "../../atoms/applyPageAtoms";
import { motion } from "framer-motion";
import { useParams } from 'react-router';
import { UserInterface } from '../../../../atoms/app/globalUserAtom';
import { CompanyData } from '../../ui/apply';
import sendEmail from '../../../../standards/functions/sendEmail';
import { ApplicationDataInterface, JobDataInterface } from '../../../../standards/interfaces/interfaces';


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
    const { watch, handleSubmit, register } = useForm<JobApplication>();
    const [jobApplication, setJobApplication] = useRecoilState(JobApplicationAtom);
    const [pageIndex, setPageIndex] = useRecoilState(pageIndexAtom);
    const [responses, setResponses] = useRecoilState(ResponsesAtom);
    const [applyStageInitiated, setApplyStageInitiated] = useRecoilState<boolean>(ApplyStageInitiatedAtom);
    const [loading, setLoading] = useRecoilState(isLoadingAtom);
    const [jobData, setJobData] = useRecoilState(jobDataAtom);
    const { jobId } = useParams();

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

        await addDoc(collection(db, "jobs", jobData.id! as string, "applications"), { ...finalJobApplicationData, rating: 0, applicationStatus: "Pending Review", applicationTime: Timestamp.now() } as ApplicationDataInterface);
        setApplyStageInitiated(false);
        console.log("reached 1");
        // var userDetails: UserInterface = (await getDoc(doc(db, "users", jobData.postedBy as string))).data() as UserInterface;
        // console.log("reached 2");
        // console.log(finalJobApplicationData.email);
        // console.log(userDetails.companyDetails.companyName);

        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ title: 'React Hooks POST Request Example' })
        // };

        // var subject = `You applied for ${jobData.jobDetails.jobTitle} at ${userDetails.companyDetails.companyName}`;
        // var emailBody = `You will recieve a confirmation email from the employer upon further selection or rejection.-----${userDetails.companyDetails.companyName}---${Timestamp.now().toDate().toLocaleString()}`;
       
        // var email = finalJobApplicationData.email;
        // // var respons= await fetch(`https://wavefunc.vercel.app/sendEmail?sendTo=${finalJobApplicationData.email}&emailBody=${emailBody}&subject=${subject}`, requestOptions);
        // sendEmail(email, subject, emailBody);

        toast.success("Job Application Successfully submitted");
        setLoading(false);
        setTimeout(() => { window.location.reload(); }, 1500);

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


            <button onClick={() => { SubmitApplication() }} className="border-white border-2 hover:bg-white bg-transparent text-tan hover:text-black px-8 py-2 flex flex-row justify-center items-center gap-2 rounded-md mt-20 w-min">
                Submit
            </button>
        </motion.div>
    )
}