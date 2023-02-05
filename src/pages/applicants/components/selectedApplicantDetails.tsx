import { useRecoilState } from 'recoil';
import { JobApplication } from '../../apply/atoms/applyPageAtoms';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { doc, setDoc, getFirestore, getDoc, onSnapshot, Timestamp } from 'firebase/firestore';
import { useParams } from 'react-router';
import { selectedJobAtom } from '../../jobs/jobsAtoms';
import sendEmail from '../../../standards/functions/sendEmail';
import { JobPosting } from '../../jobs/components/JobCard';
import { UserInterface } from '../../../atoms/app/globalUserAtom';
import { selectedApplicantDataAtom, selectedApplicantIdAtom } from '../atoms/applicantsAtoms';
import { IoMdArrowDropdown, IoMdArrowDropdownCircle } from 'react-icons/io';
import { Listbox, Menu } from '@headlessui/react';


export default function SelectedApplicantDetails() {
    const [selectedApplicantData, setSelectedApplicantData] = useRecoilState<JobApplication>(selectedApplicantDataAtom);
    const [selectedApplicantId, setSelectedApplicantId] = useRecoilState<string>(selectedApplicantIdAtom);
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
    const db = getFirestore();
    const { jobId } = useParams();
    const options = ["Interview Invite Sent", "Interview Done", "Didn't show up for interview", "Accepted"];

    const [selectedOption, setSelectedOption] = useState(options[0]);





    useEffect(() => {

        if (selectedApplicantId != "") {
            onSnapshot(doc(db, "jobs", jobId as string, "applications", selectedApplicantId), (doc) => {
                setSelectedApplicantData(doc.data() as JobApplication);
                setSelectedOption(doc.data()!["applicationStatus"]);
                setValue("rank", doc.data()!["rating"]);
                setValue("notes", doc.data()!["notes"]);
            })
        }


        console.log("just ran");
    }, [selectedApplicantId]);


    async function SetRanking() {

        if (watch("rank") == "") {
            toast.error("Kindly enter a value for rank");
        }
        else {
            await setDoc(doc(db, "jobs", jobId as string, "applications", selectedApplicantId as string), { rating: watch("rank") }, { merge: true });
            toast.success("Rank Updated");
        }

    }


    async function RejectApplicant() {
        setSelectedApplicantId("");
        await setDoc(doc(db, "jobs", jobId as string, "applications", selectedApplicantId as string), { "rejected": true }, { merge: true });
        var jobData: JobPosting = (await getDoc(doc(db, "jobs", jobId as string))).data() as JobPosting;
        var posterData: UserInterface = (await getDoc(doc(db, "users", jobData.postedBy! as string))).data() as UserInterface;
        sendEmail(selectedApplicantData.email, `Your application for ${jobData.jobDetails.jobTitle} at ${posterData.companyDetails.companyName} was rejected.`, `Thank you for the taking the time to apply but unfortunately we will not be moving forward with your application at this time.------${posterData.companyDetails.companyName}-----${Timestamp.now().toDate().toLocaleString()}`);
        console.log(selectedApplicantId);
    }


    async function UpdateNotes(data: any) {
        await setDoc(doc(db, "jobs", jobId as string, "applications", selectedApplicantId as string), { "notes": data.notes }, { merge: true });
        toast.success("Notes Updated");
    }

    async function handleApplicationStatusChange(newValue: string) {
        setSelectedOption(newValue);
        setDoc(doc(db, "jobs", jobId as string, "applications", selectedApplicantId as string), {
            "applicationStatus": newValue
        }, { merge: true });
    }

    async function InterviewCandidate() {
        await setDoc(doc(db, "jobs", jobId as string, "applications", selectedApplicantId as string), {applicationStatus: "Interview Invite Sent",interviewInviteSent:true} as JobApplication, { merge: true });
        toast.success("Interview invite sent");
    }







    return (

        selectedApplicantId != "" ?
            <div id="no_scroll" className="h-full w-[60%] bg-blue rounded-md flex-col justify-start items-start overflow-y-scroll p-10">

                <div className='flex w-full flex-row justify-start items-start '>

                    <div className='flex flex-col justify-start items-start'>
                        <div style={{ backgroundImage: `url('${selectedApplicantData.profilePicture}')` }} className='bg-cover bg-center h-48 w-48 bg-white rounded-md'></div>
                        <div className='bg-cover bg-center rounded-md text-tan font-bold text-4xl mt-5'>{selectedApplicantData.name}</div>
                        <div className='bg-cover bg-center rounded-md text-tan font-regular text-xl mt-2'>{selectedApplicantData.email}</div>
                    </div>



                    <div className='flex flex-col w-full justify-between items-end h-full mt-10'>
                        <form onSubmit={handleSubmit(SetRanking)} className='flex flex-row gap-4'>
                            <input min={1} max={10} {...register("rank")} type="number" placeholder='Rating' className='text-tan w-20 bg-transparent border-b-2 px-2 border-tan outline-none'></input>
                            <button type="submit" className='py-2 px-4 rounded-md border-tan border-2 hover:bg-tan  text-sm hover:text-black text-tan'>Set</button>
                        </form>

                    </div>

                </div>

                <div className='relative flex flex-row justify-start items-start mt-5 gap-2  '>

                    {
                        selectedApplicantData.interviewInviteSent == true ?
                            <Listbox value={selectedOption} onChange={handleApplicationStatusChange}>
                                <Listbox.Button className="px-6 py-2 bg-transparent border-2 text-sm text-tan border-tan rounded-md hover:bg-tan hover:text-black flex flex-row justify-start items-start">
                                    {selectedOption}
                                    <IoMdArrowDropdown size={15} className="mt-1 ml-2" />
                                </Listbox.Button>
                                <Listbox.Options className={"absolute top-0 left-0 mt-10 bg-tan rounded-md"}>
                                    {options.map((option) => (
                                        <Listbox.Option
                                            className="px-4 text-sm py-2 text-black hover:text-tan hover:bg-blue"
                                            key={option}
                                            value={option}
                                            disabled={false}>
                                            {option}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Listbox>:
                            <button onClick={() => { InterviewCandidate() }} className='bg-cover hover:scale-[1.05] hover:bg- bg-center rounded-md font-regular text-sm px-6 py-2 hover:bg-tan bg-transparent hover:text-black text-tan/90 border-2 border-tan w-36'>Interview</button>

                    }


                    <button onClick={() => { RejectApplicant() }} className='bg-cover hover:scale-[1.05] hover:bg- bg-center rounded-md font-regular text-sm px-6 py-2 hover:bg-tan bg-transparent hover:text-black text-tan/90 border-2 border-tan w-36'>Reject</button>


                </div>
                <form onSubmit={handleSubmit(UpdateNotes)} className='flex flex-row justify-start items-center gap-5'>
                    <textarea id="no_scroll" {...register("notes")} placeholder="Notes" className="mt-10 h-36 w-[500px] border-2 border-white/90 text-tan/90 bg-transparent outline-0 p-3 rounded-md flex justify-center items-center">
                    </textarea>
                    <button type="submit" className='py-2 px-4 rounded-md border-tan text-sm border-2 hover:bg-tan hover:text-black text-tan'>Update</button>
                </form>


                <div className='flex flex-col justify-start items-start mt-10'>
                    {
                        selectedApplicantData.responses != null && selectedApplicantData.responses.map((response, index) => {
                            return (
                                <>
                                    <div className='text-md text-tan font-regular mb-10'>
                                        <b>Q{index + 1})  {response.question}</b> <br />
                                        <div className='ml-5 mt-1'>{response.answer}</div>
                                    </div>

                                </>
                            )
                        })
                    }
                </div>

                <embed
                    src={selectedApplicantData.resume}
                    className="h-[700px] w-full mt-10 bg-white/20 rounded-md">
                </embed>


            </div> :
            <div className="h-full w-[60%] text-tan/60 bg-blue rounded-md text-md flex flex-col justify-center items-center p-10">
                Select a candidate to see details  {selectedApplicantId}
            </div>

    )
}