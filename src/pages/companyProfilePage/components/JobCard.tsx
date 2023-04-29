import { BiLinkExternal } from 'react-icons/bi';

import { JobDataInterface } from '../../../standards/interfaces/interfaces';
import { Text } from '../../../standards/styles/components/heading';
import { StandardMidBlueButton } from '../../../standards/styles/components/button';
import { useNavigate } from 'react-router';

const JobCard = ({ job }: { job: JobDataInterface }) => {
  const navigate = useNavigate();
  const handleJobApply = () => {
    navigate(`/apply/${job.id}`, { replace: true });
  };

  return (
    <div className='border-t border-t-black/10'>
      <div className='p-6 flex items-center justify-between'>
        {/* left */}
        <div className='max-w-[60%]'>
          <Text text={job.jobTitle} textSize='text-lg' color='text-black' />
          <div className='mt-2'>
            <Text
              text={`${job.location}, (${job.workModel})`}
              textSize='text-[#545454]'
              color='text-black'
            />
          </div>
        </div>

        {/* right */}
        <StandardMidBlueButton
          text='Apply'
          icon={<BiLinkExternal className='text-lg' />}
          onClick={handleJobApply}
        />
      </div>
    </div>
  );
};

export default JobCard;
