import { useCallback, useEffect } from 'react';
import { getCompanyJobs } from '../logic';
import { toast } from 'react-hot-toast';
import JobCard from './JobCard';
import { useRecoilState } from 'recoil';
import { companyAtom } from '../atom/companyAtom';
import { Text } from '../../../standards/styles/components/heading';

const RightBar = ({ id }: { id: string }) => {
  const [companyValues, setCompanyValues] = useRecoilState(companyAtom);
  const { filteredCompanyJobs } = companyValues;

  const fetchJobs = useCallback(async () => {
    const { status, data, message } = await getCompanyJobs(id);
    if (status) {
      toast.success(message);
      setCompanyValues((prev) => ({
        ...prev,
        companyJobs: data!,
        filteredCompanyJobs: data!,
      }));
    } else {
      toast.error(message);
    }
  }, [id, setCompanyValues]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <>
      {filteredCompanyJobs.length ? (
        filteredCompanyJobs.map((job) => <JobCard key={job.id!} job={job} />)
      ) : (
        <div className='p-6'>
          <Text text='No Jobs Found' color='text-black' textSize='text-xl' />
        </div>
      )}
    </>
  );
};

export default RightBar;
