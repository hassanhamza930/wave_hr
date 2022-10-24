import { selectedApplicantAtom } from '../atoms/applicantsAtoms';
import { useRecoilState } from 'recoil';
import { JobApplication } from '../../apply/atoms/applyPageAtoms';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { useParams } from 'react-router';
import { selectedJobAtom } from '../../jobs/jobsAtoms';


export default function SelectedApplicantDetails() {
    const [selectedApplicant, setSelectedApplicant] = useRecoilState<JobApplication>(selectedApplicantAtom);
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
    const db = getFirestore();
    const { jobId } = useParams();


    useEffect(() => {
        setValue("rank", selectedApplicant.rating?.toString());
    }, [selectedApplicant]);


    async function SetRanking() {

        if (watch("rank") == "") {
            toast.error("Kindly enter a value for rank");
        }
        else {
            console.log("trying to set rank");
            console.log(selectedApplicant.id);
            await setDoc(doc(db, "jobs", jobId as string, "applications", selectedApplicant.id as string), { rating: watch("rank") }, { merge: true });
            toast.success("Rank Updated");
        }

    }

    async function RejectApplicant(){
        setSelectedApplicant({} as JobApplication);
        await setDoc(doc(db,"jobs",jobId as string,"applications",selectedApplicant.id as string),{"rejected":true},{merge:true});
        console.log(selectedApplicant.id);
    }


    return (

        selectedApplicant.email != null ?
            <div id="no_scroll" className="h-full w-[60%] bg-bray rounded-md flex-col justify-start items-start overflow-y-scroll p-10">

                <div className='flex flex-row w-full justify-between items-end h-48 mt-28'>

                    <div className='flex flex-col justify-start items-start'>
                        <div style={{ backgroundImage: `url('${selectedApplicant.profilePicture}')` }} className='bg-cover bg-center h-48 w-48 bg-white rounded-md'></div>
                        <div className='bg-cover bg-center rounded-md text-tan font-bold text-4xl mt-5'>{selectedApplicant.name}</div>
                        <div className='bg-cover bg-center rounded-md text-tan font-regular text-xl mt-2'>{selectedApplicant.email}</div>
                    </div>

                    <div className='flex flex-col justify-between items-end h-72'>
                        <form onSubmit={handleSubmit(SetRanking)} className='flex flex-row gap-4'>
                            <div className='text-md font-bold flex justify-center items-center text-tan '>Rank:</div>
                            <input min={1} max={10} {...register("rank")} type="number" placeholder='Rank out of 10' className='text-tan w-36 bg-transparent border-b-2 px-2 border-tan outline-none'></input>
                            <button type="submit" className='py-2 px-4 rounded-md border-tan border-2 hover:bg-tan hover:text-breen text-tan'>Set</button>
                        </form>
                        <div className='flex flex-row justify-start items-center gap-5'>
                            <button className='bg-cover hover:scale-[1.05] hover:bg- bg-center rounded-md font-regular text-md mt-2 px-6 py-2 hover:bg-tan bg-transparent hover:text-breen text-tan/90 border-2 border-tan '>Interview</button>
                            <button onClick={()=>{RejectApplicant()}} className='bg-cover hover:scale-[1.05] hover:bg- bg-center rounded-md font-regular text-md mt-2 px-6 py-2 hover:bg-tan bg-transparent hover:text-breen text-tan/90 border-2 border-tan '>Reject</button>
                        </div>
                    </div>

                </div>


                <div className='flex flex-col justify-start items-start mt-20'>
                    {
                        selectedApplicant.responses.map((response, index) => {
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
                    src={selectedApplicant.resume}
                    className="h-[700px] w-full mt-10 bg-white/20 rounded-md">
                </embed>


            </div> :
            <div className="h-full w-[60%] text-white/60 bg-bray rounded-md text-md flex flex-col justify-center items-center p-10">
                Select a candidate to see details
            </div>

    )
}