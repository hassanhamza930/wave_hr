import { useCallback, useEffect, useState } from 'react';
import TwoColumnLayoutPage from '../../../standards/styles/layouts/twoColumnLayout';
import { HiOutlineSearch } from 'react-icons/hi';
import { selectedCompanyAtom } from '../atoms/selectedCompany';
import { useRecoilState } from 'recoil';
import { Heading } from '../../../standards/styles/components/heading';
import { getAllCompanies } from '../logic';
import { allUserCompanies } from '../atoms/companies';
import { StandardLightBlueButton } from '../../../standards/styles/components/button';
import { GiNewBorn, GiPulse } from 'react-icons/gi';
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
