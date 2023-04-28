import TwoColumnLayoutPage from '../../../standards/styles/layouts/twoColumnLayout';
import { StandardLightBlueButton } from '../../../standards/styles/components/button';
import { BiPlus } from 'react-icons/bi';
import AllCompaniesPostedByUser from '../components/allCompaniesPostedByUser';
import SelectedCompanyDetails from '../components/selectedCompanyDetails';

function Companies() {

  return (
    <>
      <TwoColumnLayoutPage
        header={
          <div className='flex flex-row justify-start items-start w-full h-full'>
            <StandardLightBlueButton icon={<BiPlus />} text='New Company' />
          </div>
        }
        leftBar={<AllCompaniesPostedByUser/>}
        rightBar={<SelectedCompanyDetails />}
      />
    </>
  );
}

export default Companies;
