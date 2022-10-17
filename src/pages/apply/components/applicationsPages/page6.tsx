import { addDoc, collection, getFirestore, Timestamp } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillCamera } from "react-icons/ai";
import { useRecoilState } from "recoil";
import isLoadingAtom from "../../../../atoms/app/isLoadingAtom";
import { JobPosting } from "../../../jobs/components/JobCard";
import pageIndexAtom from "../../../newJob/atoms/newJobAtoms";
import JobApplicationAtom, { ApplyStageInitiatedAtom, JobApplication, ResponsesAtom, SelectedJobIdAtom, selectedProfilePictureAtom } from "../../atoms/applyPageAtoms";



async function dataUrlToFile(dataUrl: string, fileName: string): Promise<File> {
    const res: Response = await fetch(dataUrl);
    const blob: Blob = await res.blob();
    return new File([blob], fileName, { type: 'image/png' });
}


const base64toPdfBlob = (data: string) => {
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
    const [selectedJobId, setSelectedJobId] = useRecoilState(SelectedJobIdAtom);
    const [loading, setLoading] = useRecoilState(isLoadingAtom);

    const db = getFirestore();
    const storage = getStorage();




    async function SubmitApplication() {

        setLoading(true);
        var finalJobApplicationData = { ...jobApplication, responses: responses };
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
        var profilePictureFile = await dataUrlToFile(profilePictureData,profilePictureFileName);
        const profilePictureRef = ref(storage, `profilePictures/${finalJobApplicationData.email}/${profilePictureFileName}`);

        await uploadBytes(profilePictureRef, profilePictureFile).then(async (snapshot) => {
            console.log('Uploaded the profilePicture');
            console.log(snapshot.metadata);
            var downloadLink2 = await getDownloadURL(profilePictureRef);
            finalJobApplicationData.profilePicture = downloadLink2;
        });


        console.log(finalJobApplicationData);

        await addDoc(collection(db, "jobs", selectedJobId, "applications"), finalJobApplicationData);
        setApplyStageInitiated(false);
        toast.success("Job Application Successfully submitted");
        setLoading(false);

    }










    useEffect(() => {
        console.log("this is coming from page 6");
        console.log(jobApplication);
        console.log(responses);
    }, [])

    return (
        <div className="text-left h-full  flex justify-center items-start flex-col p-10 w-full md:w-[60%]">
            <div className="text-3xl text-start font-bold text-white">All Done</div>
            <div className="text-xl text-left text-white mt-2">Nice Job 👋</div>


            <button onClick={() => { SubmitApplication() }} className="border-white border-2 hover:bg-white bg-transparent text-white hover:text-breen px-8 py-2 flex flex-row justify-center items-center gap-2 rounded-md mt-20 w-min">
                Submit
            </button>


        </div>
    )
}