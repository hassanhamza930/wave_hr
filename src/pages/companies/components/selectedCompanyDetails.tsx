import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import { SubHeading } from '../../../standards/styles/components/heading';
import { selectedCompanyAtom } from '../atoms/selectedCompany';
import { StandardWhiteButton } from '../../../standards/styles/components/button';
import { BiLinkExternal } from 'react-icons/bi';
import { MdEditNote } from 'react-icons/md';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';

function SelectedCompanyDetails() {
  const [selectedCompany] = useRecoilState(selectedCompanyAtom);
  const navigate = useNavigate();

  return !selectedCompany.id ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      id='no_scroll'
      className='flex justify-center items-center h-full w-full'
    >
      <div className='text-blue text-md text-center'>
        Select a company profile to see details
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
        <div
          style={{ backgroundImage: `url('${selectedCompany.companyCover}')` }}
          className='h-64 w-full bg-blue bg-cover bg-center'
        />

        <div
          style={{ backgroundImage: `url('${selectedCompany.companyLogo}')` }}
          className='h-36 w-36 border-2 border-white shadow-md bg-transparent rounded-md ml-10 -mt-24 bg-cover bg-center'
        />

        <div className='text-black flex justify-start items-start px-10 py-5 flex-col'>
          <div className='font-semibold text-4xl'>
            {selectedCompany.companyName}
          </div>

          <div className='text-dark-gray text-sm mt-2'>
            {selectedCompany.companyLocation}
          </div>

          <div className='text-dark-gray text-sm'>
            {selectedCompany.numberOfEmployees} Employees
          </div>

          <div className='flex flex-row justify-start items-start mt-5 gap-3'>
            <StandardWhiteButton
              text='Company Profile Page'
              icon={<BiLinkExternal />}
              onClick={() => window.open(`/company/${selectedCompany.id!}`)}
            />
            <StandardWhiteButton onClick={()=>{navigate(`/editCompany/${selectedCompany.id}`)}} text='Edit' icon={<MdEditNote />} />
          </div>

          <div className='font-medium text-2xl mt-10'>About</div>

          <SubHeading
            customStyles='mt-2'
            text={selectedCompany.companyDescription}
          ></SubHeading>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default SelectedCompanyDetails;
