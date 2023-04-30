import TwoColumnLayoutPage from '../../../standards/styles/layouts/twoColumnLayout';
import { StandardLightBlueButton } from '../../../standards/styles/components/button';
import { BiPlus } from 'react-icons/bi';
import AllCompaniesPostedByUser from '../components/allCompaniesPostedByUser';
import SelectedCompanyDetails from '../components/selectedCompanyDetails';
import currentRouteAtom from '../../../atoms/app/currentRouteAtom';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

function Companies() {
  const [currentRoute, setcurrentRoute] = useRecoilState(currentRouteAtom);
  const navigate = useNavigate();

  useEffect(() => {
    setcurrentRoute('Companies');
  }, []);

  return (
      <TwoColumnLayoutPage
        header={
          <div className='flex flex-row justify-start items-start w-full h-full'>
            <StandardLightBlueButton
              onClick={() => {
                navigate('/addNewCompany');
              }}
              icon={<BiPlus />}
              text='New Company'
            />
          </div>
        }
        leftBar={<AllCompaniesPostedByUser />}
        rightBar={<SelectedCompanyDetails />}
      />
  );
}

export default Companies;
