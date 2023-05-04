import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { JobDataInterface } from '../../../standards/interfaces/interfaces';

import { SearchBar } from '../../../standards/styles/components/inputs';
import { StandardMidBlueButton } from '../../../standards/styles/components/button';
import { motion } from 'framer-motion';
import currentRouteAtom from '../../../atoms/app/currentRouteAtom';
import { selectedCompanyAtom } from '../atoms/selectedCompanyAtom';
import { selectedJobAtom } from '../jobsAtoms';
import { BiLinkExternal } from 'react-icons/bi';
import { Text } from '../../../standards/styles/components/heading';
import { useNavigate } from 'react-router';

function JobCard(jobData: JobDataInterface) {
  const [selectedJob, setSelectedJob] = useRecoilState(selectedJobAtom);
  const [applicants, setApplicants] = useState(0);
  const [_, setcurrentRoute] = useRecoilState(currentRouteAtom);
  const [selectedCompany] = useRecoilState(selectedCompanyAtom);
  const db = getFirestore();
  const navigate=useNavigate();

  const fetchApplicants = () => {
      const applicantsRef = collection(
        db,
        'jobs',
        `${jobData.id}`,
        'applications'
      );
      onSnapshot(applicantsRef, (snapshot) => {
        var applicantCount = snapshot.docs.length;
        setApplicants(applicantCount);
      });
    
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const handleOnClick = () => {
    navigate(`/applicants/${jobData.id}`);
    setcurrentRoute(`${selectedCompany.companyName} > ${jobData.jobTitle} > Applicants`);
  };

  return (
    <div
    key={jobData.id}
      onClick={()=>{setSelectedJob(jobData)}}
      className='hover:bg-blue/5 transition ease-in-out duration-150 cursor-pointer flex px-7 py-4 w-full flex-row justify-between items-center border-t-[1px] border-gray'
    >
      <div className='flex flex-col justify-start items-start h-full w-[60%] '>
        <div className=' w-full text-md font-medium text-black overflow-hidden'>
          {jobData.jobTitle}
        </div>
        <div className='text-sm font-regular text-dark-gray'>
          {applicants} Applicants
        </div>
      </div>

      <StandardMidBlueButton
        onClick={handleOnClick}
        text='See Applicants'
        icon={<BiLinkExternal />}
      />
    </div>
  );
}



const JobsList = () => {
  const [allJobs, setAllJobs] = useState<Array<JobDataInterface>>([]);
  const db = getFirestore();
  const [searchCompany, setsearchCompany] = useState('');
  const [selectedCompany] = useRecoilState(selectedCompanyAtom);

  async function fetchJobs() {
    onSnapshot(
      query(
        collection(db, 'jobs'),
        where('companyId', '==', selectedCompany.id)
      ),
      (docs) => {
        var docsData: Array<JobDataInterface> = docs.docs.map((doc) => {
          var tempData: JobDataInterface = doc.data() as JobDataInterface;
          tempData.id = doc.id;
          return tempData as JobDataInterface;
        });

        setAllJobs(docsData as Array<JobDataInterface>);
      }
    );
  }

  useEffect(() => {
    fetchJobs();
  }, [selectedCompany.id]);

  return (
    <div className='flex h-full flex-col justify-start items-start'>
      {selectedCompany.id ? (
        <>
          <SearchBar
            onChange={(e: any) => {
              setsearchCompany(e.target.value);
            }}
            value={searchCompany}
            placeholder='Search Jobs'
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            id='no_scroll'
            className='h-full flex-1 w-full flex-col justify-start items-start overflow-y-scroll'
          >
            {allJobs.length ? (
              allJobs.map((job, index) => {
                if (
                  job.jobTitle
                    .trim()
                    .toLowerCase()
                    .includes(searchCompany.trim())
                )
                  return (
                    <motion.div
                      transition={{ delay: (index + 1) * 0.08 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <JobCard {...job} />
                    </motion.div>
                  );

                return null;
              })
            ) : (
              <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='flex justify-center items-center h-full w-full'>
                <Text
                  text={'No Jobs Found'}
                  color='text-blue'
                  textSize='text-mg'
                  customStyles='m-6'
                />
              </motion.div>
            )}
          </motion.div>
        </>
      ) : (
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='flex justify-center items-center h-full w-full'>
          <Text
            text={'Please Select a Company to See Jobs'}
            color='text-blue'
            textSize='text-mg'
            customStyles='m-6'
          />
        </motion.div>
      )}
    </div>
  );
};

export default JobsList;
