import TwoColumnLayoutPage from '../../../standards/styles/layouts/twoColumnLayout';
import { StandardLightBlueButton } from '../../../standards/styles/components/button';
import { BiPlus } from 'react-icons/bi';
import AllCompaniesPostedByUser from '../components/allCompaniesPostedByUser';
import SelectedCompanyDetails from '../components/selectedCompanyDetails';
import currentRouteAtom from '../../../atoms/app/currentRouteAtom';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { selectedCompanyAtom } from '../atoms/selectedCompany';
import { CompanyDataInterface } from '../../../standards/interfaces/interfaces';

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
          <div className='flex flex-row justify-start items-start w-full h-full'>
            <StandardLightBlueButton
              onClick={() => {
                navigate('/companyForm');
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
