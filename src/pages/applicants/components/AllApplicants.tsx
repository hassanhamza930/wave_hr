import { useState, useEffect } from 'react';
import { JobApplication } from '../../apply/atoms/applyPageAtoms';
import { JobData, JobPosting } from '../../jobs/components/JobCard';
import { getFirestore, collection, onSnapshot, doc } from 'firebase/firestore';
import { useParams } from 'react-router';
export default function AllApplicants() {

    const [applicants, setApplicants] = useState<Array<JobApplication>>([]);
    const [jobDetails, setJobDetails] = useState<JobData>({} as JobData);
    const db = getFirestore();
    const { jobId } = useParams();


    function SyncApplicants() {
        var tempArray: Array<JobApplication> = [];

        onSnapshot(collection(db, "jobs", jobId as string, "applications"), (docs) => {
            docs.forEach((doc) => {
                tempArray.push({ ...doc.data(), id: doc.id } as JobApplication);
            })
            setApplicants([...tempArray]);
        })


        onSnapshot(doc(db, "jobs", jobId as string), (doc) => {
            setJobDetails(
                {
                    id: doc.id,
                    jobData: doc.data() as JobPosting
                }
            );
        })


    }


    useEffect(() => {
        SyncApplicants();
    }, []);


    return (
        <div className="h-full w-[39%] border-2 border-breen rounded-md p-5 flex flex-col justify-start items-start">
            <div className="text-breen text-md mt-10 mb-2 ml-1">Seeing Applicants for <div className="mt-2 font-bold text-3xl">{jobDetails.jobData != null && jobDetails.jobData.jobDetails.jobTitle}</div></div>




            {
                applicants.map((applicant) => {
                    return (
                        <button className="hover:bg-breen hover:scale-[1.02] w-full gap-4 text-white bg-bray/90 rounded-md my-5 flex flex-row justify-start items-center p-3">
                            <div style={{ backgroundImage: `url('${applicant.profilePicture}')` }} className='bg-cover bg-center h-12 w-12 bg-breen rounded-md'></div>
                            
                            <div className='flex flex-col justify-center items-start'>
                                <div className="text-md font-bold">{applicant.email}</div>
                                <div className="text-md">{applicant.name}</div>
                            </div>

                            

                            
                        </button>
                    )
                })
            }


        </div>
    )
}