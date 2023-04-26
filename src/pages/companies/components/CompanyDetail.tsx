import { StandardLightButton } from '../../../standards/styles/components/button';
import {
  Heading,
  SubHeading,
} from '../../../standards/styles/components/heading';
import { selectedCompanyAtom } from '../atoms/selectedCompany';
import { useRecoilState } from 'recoil';
import { FiExternalLink } from 'react-icons/fi';
import { MdEditNote } from 'react-icons/md';

const CompanyDetail = () => {
  const [selectedCompany] = useRecoilState(selectedCompanyAtom);

  return (
    <div>
      <Heading text={selectedCompany.companyName} />
      <div className='mt-6'>
        <SubHeading
          text={selectedCompany.companyLocation}
          color={'text-dark-gray'}
        />
        <SubHeading text={'0-50 employees'} color={'text-dark-gray'} />
      </div>

      {/* buttons */}
      <div className='mt-10 flex items-center gap-4'>
        <StandardLightButton text={'View Company'} icon={<FiExternalLink />} />
        <StandardLightButton text={'Edit'} icon={<MdEditNote />} />
      </div>

      {/* about */}
      <div className='mt-20'>
        <Heading text='About' />
        <p className='mt-4 text-md text-[#2D2D2D]'>
          {selectedCompany.companyDescription}
        </p>
      </div>
    </div>
  );
};

export default CompanyDetail;
