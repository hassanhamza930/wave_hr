import { useCallback, useEffect, useState } from 'react';
import { getCompanyJobs } from '../logic';
import { toast } from 'react-hot-toast';
import JobCard from './JobCard';
import { useRecoilState } from 'recoil';
import { companyAtom } from '../atom/companyAtom';
import { Text } from '../../../standards/styles/components/heading';
import { motion } from 'framer-motion';
import { jobSearchAtom } from '../atom/jobSearch';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { JobDataInterface } from '../../../standards/interfaces/interfaces';




const RightBar = ({ id }: { id: string }) => {
  const [jobSearch,setJobSearch] = useRecoilState(jobSearchAtom);
  const [allJobsPostedByCompany,setAllJobsPostedByCompany]=useState([] as Array<JobDataInterface>);
  

  async function fetchAllJobsForCompany(){
    const db = getFirestore();
    const jobsRef = collection(db, 'jobs');
    const q = query(jobsRef, where('companyId', '==', id));
    const querySnapshot = await getDocs(q);
  
    var jobs = querySnapshot.docs.map((doc) => ({
      ...(doc.data() as JobDataInterface),
      id: doc.id,
    }));

    jobs=jobs.filter((job)=>{
      if(job.jobTitle.toLowerCase().includes(jobSearch.toLowerCase())){
        return job;
      }
    })

    setAllJobsPostedByCompany(jobs);

  }

  
  useEffect(()=>{
    fetchAllJobsForCompany();
  },[jobSearch]);



  return (
    <>
      {allJobsPostedByCompany.length ? (
        allJobsPostedByCompany.map((job,index) =>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:(index+1)*0.08}}>
            <JobCard key={job.id!} job={job} />
          </motion.div>)
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='p-6'>
          <Text text='No Jobs Found' color='text-black' textSize='text-sm' />
        </motion.div>
      )}
    </>
  );
};

export default RightBar;
