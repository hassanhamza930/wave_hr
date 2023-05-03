import AllApplicants from '../components/AllApplicants';
import { useRecoilState } from 'recoil';
import SelectedApplicantDetails from '../components/selectedApplicantDetails';
import PageLayout from '../../../standards/styles/layouts/pageLayout';
import currentRouteAtom from '../../../atoms/app/currentRouteAtom';
import TwoColumnLayoutPage from '../../../standards/styles/layouts/twoColumnLayout';
import { BiPlus } from 'react-icons/bi';
import { MdArrowDropDown } from 'react-icons/md';
import {
  CompanyDataInterface,
  JobDataInterface,
} from '../../../standards/interfaces/interfaces';
import { StandardLightBlueButton } from '../../../standards/styles/components/button';
import StandardDropDown, {
  DropDownOptionInterface,
} from '../../../standards/styles/components/dropdowns';
import { selectedCompanyAtom } from '../../jobs/atoms/selectedCompanyAtom';
import { useEffect, useState } from 'react';
import {
  onSnapshot,
  query,
  collection,
  where,
  getFirestore,
} from 'firebase/firestore';

export default function Applicants() {
  const [currentRoute, setCurrentRoute] = useRecoilState(currentRouteAtom);
  const [selectedCompany, setSelectedCompany] =
    useRecoilState(selectedCompanyAtom);
  const [allCompanies, setAllCompanies] = useState<Array<CompanyDataInterface>>(
    [] as Array<CompanyDataInterface>
  );

  useEffect(() => {
    const db = getFirestore();
    onSnapshot(
      query(
        collection(db, 'companies'),
        where('companyOwnerId', '==', localStorage.getItem('uid') as string)
      ),
      (docs) => {
        var docsData: Array<CompanyDataInterface> = docs.docs.map((doc) => {
          var tempData: CompanyDataInterface =
            doc.data() as CompanyDataInterface;
          tempData.id = doc.id;
          return tempData as CompanyDataInterface;
        });
        setAllCompanies(docsData as Array<CompanyDataInterface>);
      }
    );
    setCurrentRoute('Applicants');
  }, []);

  return (
    <>
      {/* <PageLayout>

            <div className="h-full w-full flex flex-row justify-between items-center">

                <AllApplicants/>
                <SelectedApplicantDetails/>

            </div>
        </PageLayout> */}
      <TwoColumnLayoutPage
        header={<></>}
        leftBar={<AllApplicants />}
        rightBar={<SelectedApplicantDetails />}
      />
    </>
  );
}
