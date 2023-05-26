import TwoColumnLayoutPage from '../../../standards/styles/layouts/twoColumnLayout';
import { StandardLightBlueButton } from '../../../standards/components/button';
import { BiPlus } from 'react-icons/bi';
import AllCompaniesPostedByUser from '../components/allCompaniesPostedByUser';
import SelectedCompanyDetails from '../components/selectedCompanyDetails';
import currentRouteAtom from '../../app/atoms/currentRouteAtom';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { selectedCompanyAtom } from '../atoms/selectedCompany';
import { CompanyDataInterface } from '../../../standards/interfaces/interfaces';
import { AnimatePresence, motion } from 'framer-motion';

function Companies() {
  const [currentRoute, setcurrentRoute] = useRecoilState(currentRouteAtom);
  const [_, setSelectedCompany] = useRecoilState(selectedCompanyAtom);

  const navigate = useNavigate();

  useEffect(() => {
    setcurrentRoute('Companies');
    setSelectedCompany({} as CompanyDataInterface)
  }, []);

  return (
      <TwoColumnLayoutPage
        header={
          <AnimatePresence>
            <motion.div 
          initial={{opacity:0}}
          animate={{opacity:1}}
          className='flex flex-row justify-start items-start w-full h-full'>
            <StandardLightBlueButton
              onClick={() => {
                navigate('/companyForm');
              }}
              icon={<BiPlus />}
              text='New Company'
            />
          </motion.div>
          </AnimatePresence>
        }
        leftBar={<AllCompaniesPostedByUser />}
        rightBar={<SelectedCompanyDetails />}
      />
  );
}

export default Companies;
