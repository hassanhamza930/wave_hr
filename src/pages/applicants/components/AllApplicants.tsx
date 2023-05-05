import { useState, useEffect } from 'react';
import { JobApplication } from '../../apply/atoms/applyPageAtoms';
import { useParams } from 'react-router';
import getCurrentJobApplications from '../logic/getCurrentJobApplications';
import ApplicantCard from './ApplicantCard';
import { SearchBar } from '../../../standards/styles/components/inputs';
import { motion } from 'framer-motion';
import { Text } from '../../../standards/styles/components/heading';
import FlipMove from 'react-flip-move';



export default function AllApplicants() {
  const [applicants, setApplicants] = useState<Array<JobApplication>>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const { jobId } = useParams();

  useEffect(() => {
    getCurrentJobApplications(setApplicants, jobId as string, searchValue);
  }, [searchValue]);

  return (
    <div className='flex w-full h-full flex-col justify-start items-start'>
      <SearchBar
        onChange={(e: any) => {
          setSearchValue(e.target.value);
        }}
        value={searchValue}
        placeholder='Search Applicants'
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        id='no_scroll'
        className='h-full flex-1 w-full flex-col justify-start items-start overflow-y-scroll'
      >

        {applicants.length ? (
          applicants.map((applicant, index) => {
            if (
              applicant.name.trim().toLowerCase().includes(searchValue.trim())
            )
              return (
                <ApplicantCard key={applicant.id!} index={index} {...applicant} />
              );

            return null;
          })
        ) : (
          <div className='flex justify-center items-center h-full w-full'>
            <Text
              text={'No Applicants Found'}
              color='text-blue'
              textSize='text-mg'
              customStyles='m-6'
            />
          </div>
        )}
      </motion.div>
    </div>
  );
}
