import { useState, useEffect } from 'react';
import { JobApplication } from '../../apply/atoms/applyPageAtoms';
import { JobData, JobPosting } from '../../jobs/components/JobCard';
import { getFirestore, collection, onSnapshot, doc, orderBy, query, Timestamp, where } from 'firebase/firestore';
import { useParams } from 'react-router';
import { useRecoilState } from 'recoil';
import { selectedApplicantDataAtom, selectedApplicantIdAtom } from '../atoms/applicantsAtoms';
export default function AllApplicants() {

    const [applicants, setApplicants] = useState<Array<JobApplication>>([]);
    const [jobDetails, setJobDetails] = useState<JobData>({} as JobData);
    const [searchValue, setSearchValue] = useState<string>("");
    const [selectedApplicantId,setSelectedApplicantId]=useRecoilState(selectedApplicantIdAtom);
    const db = getFirestore();
    const { jobId } = useParams();


    useEffect(() => {

        onSnapshot(query(collection(db, "jobs", jobId as string, "applications"),orderBy("rating","desc")), (docs) => {
            var tempArray: Array<JobApplication> = [];
            docs.forEach((doc) => {
                var userName: string = doc.data()["name"] as string;
                if (userName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())== true && doc.data()["rejected"]==false) {
                    tempArray.push({ ...doc.data(), id: doc.id } as JobApplication);
                }
            })
            setApplicants(tempArray);
        })


        onSnapshot(doc(db, "jobs", jobId as string), (doc) => {
            setJobDetails(
                {
                    id: doc.id,
                    jobData: doc.data() as JobPosting
                }
            );
        })

    }, [searchValue]);




    function handleSelectApplicant(applicant: JobApplication) {
        setSelectedApplicantId(applicant.id as string);
    }



    return (
        <div id="no_scroll" className="h-full w-[39%] overflow-y-scroll rounded-md p-5 flex flex-col justify-start items-start">
            <div className="text-breen text-md mt-10 mb-2 ml-1">Seeing Applicants for <div className="mt-2 font-bold text-3xl mb-5">{jobDetails.jobData != null && jobDetails.jobData.jobDetails.jobTitle}</div></div>

            <input value={searchValue} onChange={(e) => { setSearchValue(e.target.value); }} placeholder="Search" className="w-full font-bold border-b-2 shadow-md mb-10 border-bray text-bray/90 bg-transparent outline-0 px-2 py-1 mt-3 flex justify-center items-center">
            </input>


            {
                applicants.map((applicant) => {
                    return (
                        <button key={`${applicant.id}`} onClick={() => { handleSelectApplicant(applicant) }} className={`hover:bg-bray hover:text-tan hover:scale-[1.02] w-full gap-4 ${applicant.rating!=null?"bg-bray/90 text-tan/90":"bg-breen text-white"} rounded-md my-1 flex flex-row justify-start items-center p-3`}>

                            <div style={{ backgroundImage: `url('${applicant.profilePicture}')` }} className='bg-cover bg-center h-12 w-12 bg-breen rounded-md'></div>

                            <div className='flex flex-row justify-between items-center w-full'>

                                <div className='flex flex-col w-full justify-center items-start '>
                                    <div className="text-md font-bold ">{applicant.name}</div>
                                    <div className="text-md">{applicant.email}</div>
                                </div>

                                <div className=' w-full h-full flex justify-end pr-5 items-center'>
                                    <div className='px-4 py-2 text-breen text-sm font-bold rounded-md bg-tan/90'>{applicant.rating != null ? applicant.rating : "Pending Review"}</div>
                                </div>

                            </div>

                        </button>
                    )
                })
            }




        </div>
    )
}