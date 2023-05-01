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
    <div className="hover:bg-blue/5 transition ease-in-out duration-150 flex px-7 py-4 w-full flex-row justify-between items-center border-t-[1px] border-gray">
            
    <div className="flex flex-col justify-start items-start h-full w-[60%] ">
        <div className=" w-full text-md font-medium text-black overflow-hidden">
            {job.jobTitle}
        </div>
        <div className="text-sm font-regular text-dark-gray">{job.jobType}, {job.workModel}</div>
        <div className="text-sm font-regular text-dark-gray">{job.location}</div>
    </div>

    <StandardMidBlueButton onClick={handleJobApply} icon={<BiLinkExternal />} text="Apply" />

</div>
  );
};

export default JobCard;
