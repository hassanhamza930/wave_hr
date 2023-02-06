import { useState, useEffect } from 'react';
import { JobApplication } from '../../apply/atoms/applyPageAtoms';
import { JobData, JobPosting } from '../../jobs/components/JobCard';
import { getFirestore, collection, onSnapshot, doc, orderBy, query, Timestamp, where } from 'firebase/firestore';
import { useParams } from 'react-router';
import { useRecoilState } from 'recoil';
import { selectedApplicantDataAtom, selectedApplicantIdAtom } from '../atoms/applicantsAtoms';
import { UserInterface } from '../../../atoms/app/globalUserAtom';
export default function AllApplicants() {

    const [applicants, setApplicants] = useState<Array<JobApplication>>([]);
    const [jobDetails, setJobDetails] = useState<JobData>({} as JobData);
    const [searchValue, setSearchValue] = useState<string>("");
    const [selectedApplicantId,setSelectedApplicantId]=useRecoilState(selectedApplicantIdAtom);
    const db = getFirestore();
    const { jobId } = useParams();


    useEffect(() => {

        onSnapshot(query(collection(db, "jobs", jobId as string, "applications")), (docs) => {
            var tempArray: Array<JobApplication> = [];
            docs.forEach((doc) => {
                var userName: string = doc.data()["name"] as string;
                if (userName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())== true && doc.data()["rejected"]==false) {
                    tempArray.push({ ...doc.data(), id: doc.id } as JobApplication);
                }
            })

            var pendingReviewsArray:any=[];
            var reviewsDoneArray:any=[];

            
            tempArray.forEach((data,index)=>{
                if(data.rating!=null){
                   reviewsDoneArray.splice(0,0,data);
                }
            })

            reviewsDoneArray=reviewsDoneArray.sort((a:JobApplication, b:JobApplication)=>{
                if(+a.rating!>+b.rating!){
                    return +1;
                }
                else if(+a.rating!<+b.rating!){
                    return -1;
                }
                else{
                    return 0;
                }
            });
            reviewsDoneArray=reviewsDoneArray.reverse();

            tempArray.forEach((data,index)=>{
                if(data.rating==null){
                    pendingReviewsArray.splice(0,0,data);
                }
            })

            pendingReviewsArray.forEach((data:any,index:number)=>{
                    reviewsDoneArray.splice(0,0,data);                
            })

            
            setApplicants(reviewsDoneArray);
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
        <div id="no_scroll" className="h-full w-[39%] rounded-md p-5 flex flex-col justify-start items-start">
            <div className="text-black text-md  mb-2 ml-1">Seeing Applicants for <div className="mt-2 font-bold text-black text-3xl mb-5">{jobDetails.jobData != null && jobDetails.jobData.jobDetails.jobTitle}</div></div>

            <input value={searchValue} onChange={(e) => { setSearchValue(e.target.value); }} placeholder="Search" className="w-full font-medium border-b-2 shadow-md mb-10 text-sm border-blue text-black bg-transparent outline-0 px-2 py-1 mt-3 flex justify-center items-center">
            </input>


            <div id="no_scroll" className='w-full h-96 flex-col justify-start items-center overflow-y-scroll px-2'>
            {
                applicants.map((applicant) => {
                    return (
                        <button key={`${applicant.id}`} onClick={() => { handleSelectApplicant(applicant) }} className={`hover:bg-blue hover:text-tan mt-3 w-full gap-4 ${applicant.rating==null?"bg-blue text-tan ":"bg-black/90 shadow-md border-black/10  text-tan"}  rounded-md my-1 flex w-full flex-row justify-start items-center p-3`}>

                            <div style={{ backgroundImage: `url('${applicant.profilePicture}')` }} className='bg-cover bg-center h-12 w-12 bg-blue rounded-md'></div>

                            <div className='flex flex-row justify-between items-center w-full'>

                                <div className='flex flex-col w-full justify-center items-start pr-2'>
                                    <div className="text-md font-bold ">{applicant.name}</div>
                                    <div className="text-md">{applicant.email}</div>
                                </div>

                                <div className=' w-full h-full flex justify-end flex-row pr-3 gap-3 items-center'>
                                    {/* <div className='hidden 2xl:flex px-4 py-2 text-black text-[12px] rounded-full bg-tan/90'>{applicant.applicationStatus}</div> */}
                                    <div className='px-4 py-2 text-blue text-sm font-bold rounded-md bg-tan'>{applicant.rating != null ? applicant.rating : "Pending Review"}</div>
                                </div>

                            </div>

                        </button>
                    )
                })
            }
            {
                applicants.length==0&&<div className='font-bold text-md text-black/90 ml-1'>No Applicants Yet</div>
            }
            </div>



        </div>
    )
}