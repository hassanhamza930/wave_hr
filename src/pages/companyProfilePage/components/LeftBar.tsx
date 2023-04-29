import { GoLocation } from 'react-icons/go';
import { MdOutlinePeopleAlt } from 'react-icons/md';
import { BiLinkExternal } from 'react-icons/bi';

import { CompanyDataInterface } from '../../../standards/interfaces/interfaces';
import { StandardLightBlueButton } from '../../../standards/styles/components/button';
import { Text } from '../../../standards/styles/components/heading';

interface ILeftBar {
  companyDetails: CompanyDataInterface;
}

const Tag = ({ tag }: { tag: string }) => (
  <div className='bg-white rounded-3xl p-3 text-black flex items-center justify-center text-md mr-1'>
    {tag}
  </div>
);

const LeftBar = ({ companyDetails }: ILeftBar) => {
  const formatCompanyName = () => companyDetails.companyName?.split(' ')[0];
  const getEmployeeCountRange = () => {
    const numEmployees = parseInt(companyDetails.numberOfEmployees);
    if (numEmployees > 100) {
      return '100+ employees';
    } else if (numEmployees > 50) {
      return '50-100 employees';
    } else {
      return '0-50 employees';
    }
  };

  return (
    <div className='w-full h-full'>
      <Text
        text={`About ${formatCompanyName()}`}
        color='text-black'
        textSize='text-xl'
        fontWeight='font-semibold'
      />
      <div className='mt-2 mb-10'>
        <Text text={companyDetails.companyDescription} textSize='text-sm' />
      </div>
      {/* location */}
      <div className='flex items-center'>
        <GoLocation className='text-[24px] mr-2' />
        <Text
          text={companyDetails.companyLocation}
          color='text-black'
          textSize='text-md'
        />
      </div>
      {/* employees */}
      <div className='flex items-center mt-5'>
        <MdOutlinePeopleAlt className='text-[24px] mr-2' />
        <Text
          text={getEmployeeCountRange()}
          color='text-black'
          textSize='text-md'
        />
      </div>

      {/* tags */}
      <div className='flex items-center mt-5'>
        {companyDetails.companyTags?.map((tag: string, index: number) => (
          <Tag tag={tag} key={index} />
        ))}
      </div>

      <div className='mt-10'>
        <StandardLightBlueButton
          text='Website'
          icon={<BiLinkExternal className='text-lg' />}
        />
      </div>
    </div>
  );
};

export default LeftBar;
