import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import { SubHeading } from '../../../standards/styles/components/heading';
import { selectedCompanyAtom } from '../atoms/selectedCompany';
import { StandardWhiteButton } from '../../../standards/components/button';
import { BiLinkExternal } from 'react-icons/bi';
import { MdDelete, MdEditNote } from 'react-icons/md';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import ReactQuill from 'react-quill';

function SelectedCompanyDetails() {
  const [selectedCompany, setSelectedCompany] = useRecoilState(selectedCompanyAtom);
  const navigate = useNavigate();
  const db = getFirestore();

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
          className='h-36 w-36 border-2 border-white shadow-md bg-white rounded-md ml-10 -mt-24 bg-contain bg-no-repeat bg-center'
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
            <StandardWhiteButton onClick={() => navigate('/companyForm', { state: selectedCompany })} text='Edit' icon={<MdEditNote />} />
            <StandardWhiteButton onClick={async () => {
              if (window.confirm('Are you sure you want to delete this company?')) {
                await getDocs(
                  query(
                    collection(db, 'jobs'),
                    where('companyId', '==', selectedCompany.id!),
                  ),
                ).then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    deleteDoc(doc.ref);
                  });
                });

                await deleteDoc(doc(db, 'companies', selectedCompany.id!));
                setSelectedCompany({} as any);

              }
            }} text='Delete' icon={<MdDelete />} />

          </div>

          <div className='font-medium text-2xl mt-10'>About</div>

          <ReactQuill readOnly={true} theme='bubble' value={selectedCompany.companyDescription} className='mt-2 -ml-3'/>


        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default SelectedCompanyDetails;
