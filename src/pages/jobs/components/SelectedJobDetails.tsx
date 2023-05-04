import { useRecoilState } from 'recoil';
import { SubHeading } from '../../../standards/styles/components/heading';
import { selectedJobAtom } from '../jobsAtoms';
import { StandardWhiteButton } from '../../../standards/styles/components/button';
import { BiBriefcase, BiCurrentLocation, BiLinkExternal } from 'react-icons/bi';
import { MdContentCopy } from 'react-icons/md';
import { AnimatePresence } from 'framer-motion';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaRegEdit } from 'react-icons/fa';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import { copyUrlToClipboard } from '../../../standards/functions/copyUrlToClipboard';
import { toast } from 'react-hot-toast';
import {
  getFirestore,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { JobDataInterface } from '../../../standards/interfaces/interfaces';
import currentRouteAtom from '../../../atoms/app/currentRouteAtom';
import NewJob from '../../newJob/ui/newJob';
import { useNavigate } from 'react-router';



function SelectedJobDetails() {
  const [selectedJob, setSelectedJob] = useRecoilState(selectedJobAtom);
  const [_, setRoute] = useRecoilState(currentRouteAtom);
  const [applicants, setApplicants] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const navigate=useNavigate();

  const fetchApplicants = useCallback(() => {
    try {
      const db = getFirestore();
      const applicantsRef = collection(
        db,
        'jobs',
        `${selectedJob.id}`,
        'applications'
      );
      onSnapshot(applicantsRef, (snapshot) => {
        const applicantCount = snapshot.size;
        setApplicants(applicantCount);
      });
    } catch (error) {
      console.log(error);
    }
  }, [selectedJob.id]);

  useEffect(() => {
    fetchApplicants();
  }, [fetchApplicants]);

  const handleDeleteJob = async () => {
    try {
      const db = getFirestore();
      const documentRef = doc(db, 'jobs', `${selectedJob.id}`);

      await deleteDoc(documentRef);
      setSelectedJob({} as JobDataInterface);
      toast.success('Job Delete Successfully');
      setRoute('Companies');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  const handleEditJob = () => {
    setIsOpen(true);
    setRoute('Companies');
  };

  return !selectedJob.id ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      id='no_scroll'
      className='flex justify-center items-center h-full w-full'
    >
      <div className='text-blue text-md text-center'>
        Select a Job to see details
      </div>
    </motion.div>
  ) : (
    <>
      <NewJob isOpen={isOpen} setIsOpen={setIsOpen} data={selectedJob} />
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          id='no_scroll'
          className='flex-1 flex-col justify-start items-start w-full h-full rounded-md overflow-y-scroll py-10'
        >
          <div className='text-black flex justify-start items-start px-10 py-5 flex-col'>
            <div className='font-semibold text-4xl'>{selectedJob.jobTitle}</div>

            <div className='flex flex-row justify-between items-center w-full'>

              <div className='flex flex-col justify-start items-start'>
                <div className='text-dark-gray text-sm mt-2'>
                  {applicants} Applicants
                </div>

                <div className='text-dark-gray text-sm'>
                  Posted On: {dayjs(selectedJob.time.toDate()).format('DD/MM/YY')}
                </div>
              </div>

              <div className='flex flex-col justify-start items-start'>
                <div className='text-dark-gray text-sm mt-2 flex flex-row justify-center items-center gap-1'>
                  <BiCurrentLocation />
                  {selectedJob.location}
                </div>
                <div className='flex flex-row justify-center items-center gap-1 text-dark-gray text-sm mt-1'>
                  <BiBriefcase />
                  <div>{selectedJob.jobType}, {selectedJob.workModel}</div>
                </div>
              </div>


            </div>

            <div className='flex flex-row justify-start items-center mt-5 gap-3'>
              <StandardWhiteButton
                text='See Applicants'
                icon={<BiLinkExternal className='text-lg' />}
                onClick={() => navigate(`/applicants/${selectedJob.id}`)}
              />
              <StandardWhiteButton
                onClick={async () => {
                  copyUrlToClipboard(selectedJob.id!);
                  toast.success('URL copied to Clipboard');
                }}
                text='Copy Apply Link'
                icon={<MdContentCopy className='text-md' />}
              />
              <StandardWhiteButton
                onClick={handleDeleteJob}
                text='Delete'
                icon={<RiDeleteBin6Line className='text-lg' />}
              />
              <StandardWhiteButton
                onClick={handleEditJob}
                text='Edit'
                icon={<FaRegEdit className='text-lg' />}
              />
            </div>

            <div className='font-medium text-2xl mt-10'>Job Description</div>
            <div className='text-black mt-2 text-md' dangerouslySetInnerHTML={{__html: selectedJob.jobDescription}} />

            <div className='font-medium text-2xl mt-10'>Job Qualifications</div>
            <div className='text-black mt-2 text-md' dangerouslySetInnerHTML={{__html: selectedJob.jobQualifications}} />

            <div className='font-medium text-2xl mt-10'>
              Salary Compensation
            </div>
            <SubHeading
              customStyles='mt-2'
              text={selectedJob.salaryCompensation}
            />

            {!!selectedJob.questions.length && (
              <>
                <div className='font-medium text-2xl mt-10'>Questions</div>
                <ol>
                  {selectedJob.questions.map(
                    (question: string, index: number) => (
                      <SubHeading
                        customStyles='mt-2'
                        text={`${index + 1}.  ${question}`}
                        key={index}
                      />
                    )
                  )}
                </ol>
              </>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default SelectedJobDetails;
