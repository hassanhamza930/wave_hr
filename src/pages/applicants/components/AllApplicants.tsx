import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import getCurrentJobApplications from '../logic/getCurrentJobApplications';
import ApplicantCard from './ApplicantCard';
import { SearchBar } from '@components/inputs';
import { motion } from 'framer-motion';
import { Text } from '@components/heading';
import { ApplicationDataInterface } from '../../../standards/interfaces/interfaces';
import { useRecoilState } from 'recoil';
import ApplicantsFilterAtom from '../atoms/applicantsFilterAtom';



export default function AllApplicants() {
  const [applicants, setApplicants] = useState<Array<ApplicationDataInterface>>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const { jobId } = useParams();
  const [currentFilter, setcurrentFilter] = useRecoilState(ApplicantsFilterAtom);

  useEffect(() => {
    getCurrentJobApplications(currentFilter, setApplicants, jobId as string, searchValue);
  }, [searchValue, currentFilter]);

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
                <div key={applicant.id!} className='w-full'>
                  <ApplicantCard key={applicant.id!} index={index} {...applicant as ApplicationDataInterface} />
                </div>
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
