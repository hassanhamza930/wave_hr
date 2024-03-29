import { GoLocation } from 'react-icons/go';
import { MdOutlinePeopleAlt } from 'react-icons/md';
import { BiLinkExternal } from 'react-icons/bi';

import { CompanyDataInterface } from '../../../standards/interfaces/interfaces';
import { StandardBlueButton, StandardLightBlueButton } from '../../../standards/styles/components/button';
import { Text } from '../../../standards/styles/components/heading';
import ReactQuill from 'react-quill';

interface ILeftBar {
  companyDetails: CompanyDataInterface;
}


const Tag = ({ tag }: { tag: string }) => (
  <div key={tag} className="flex gap-3 justify-center items-center flex-row px-6 py-2 text-sm text-black bg-blue/10 shadow-md rounded-full">
    {tag}
  </div>
);




const LeftBar = ({ companyDetails }: ILeftBar) => {


  return (
    <div className='w-full flex flex-col justify-start items-start'>
      <Text
        text={`About ${companyDetails.companyName}`}
        color='text-black'
        textSize='text-xl'
        fontWeight='font-semibold'
      />
      <div className='mt-2'>
        <ReactQuill readOnly={true} theme='bubble' value={companyDetails.companyDescription} className='mt-2 -ml-3'/>
      </div>
      {/* location */}
      <div className='flex items-center'>
        <GoLocation className='text-md mr-2' />
        <Text
          fontWeight='font-semibold'
          text={companyDetails.companyLocation}
          color='text-black'
          textSize='text-sm'
        />
      </div>
      {/* employees */}
      <div className='flex items-center mt-2'>
        <MdOutlinePeopleAlt className='text-md mr-2' />
        <Text
          fontWeight='font-semibold'
          text={companyDetails.numberOfEmployees + ' Employees'}
          color='text-black'
          textSize='text-sm'
        />
      </div>

      {/* tags */}
      <div className='flex flex-wrap items-center mt-5 gap-3'>
        {companyDetails.companyTags?.map((tag: string, index: number) => (
          <Tag tag={tag} key={index} />
        ))}
      </div>

      {
        companyDetails.companyWebsite!="" &&
        <div className='mt-10 mb-5'>
          <StandardBlueButton
            text='Website'
            onClick={()=>{window.open(companyDetails.companyWebsite!)}}
            icon={<BiLinkExternal className='text-lg' />}
          />
        </div>
      }
    </div>
  );
};

export default LeftBar;
