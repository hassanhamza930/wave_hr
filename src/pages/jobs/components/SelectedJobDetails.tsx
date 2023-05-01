import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import { SubHeading } from '../../../standards/styles/components/heading';
import { selectedJobAtom } from '../jobsAtoms';
import { StandardWhiteButton } from '../../../standards/styles/components/button';
import { BiLinkExternal } from 'react-icons/bi';
import { MdContentCopy } from 'react-icons/md';
import { AnimatePresence } from 'framer-motion';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaRegEdit } from 'react-icons/fa';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import { copyUrlToClipboard } from '../../../standards/functions/copyUrlToClipboard';
import { toast } from 'react-hot-toast';

function SelectedJobDetails() {
  const [selectedJob, setSelectedJob] = useRecoilState(selectedJobAtom);
  const navigate = useNavigate();

  const handleDeleteJob = () => {};

  const handleEditJob = () => {};

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
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        id='no_scroll'
        className='flex-1 flex-col justify-start items-start w-full h-full rounded-md overflow-y-scroll'
      >
        <div className='text-black flex justify-start items-start px-10 py-5 flex-col'>
          <div className='font-semibold text-4xl'>{selectedJob.jobTitle}</div>

          <div className='text-dark-gray text-sm mt-2'>14 Applicants</div>

          <div className='text-dark-gray text-sm'>
            Posted On: {dayjs(selectedJob.time.toDate()).format('DD/MM/YY')}
          </div>

          <div className='flex flex-row justify-start items-center mt-5 gap-3'>
            <StandardWhiteButton
              text='See Applicants'
              icon={<BiLinkExternal className='text-lg' />}
              onClick={() => window.open(`/applicants/${selectedJob.id}`)}
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
          <SubHeading customStyles='mt-2' text={selectedJob.jobDescription} />

          <div className='font-medium text-2xl mt-10'>Job Qualifications</div>
          <SubHeading
            customStyles='mt-2'
            text={`⚫ ${selectedJob.jobQualifications}`}
          />

          <div className='font-medium text-2xl mt-10'>Salary Compensation</div>
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
  );
}

export default SelectedJobDetails;
