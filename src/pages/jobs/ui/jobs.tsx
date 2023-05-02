import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { StandardLightBlueButton } from '../../../standards/styles/components/button';
import { MdArrowDropDown } from 'react-icons/md';
import { selectedCompanyAtom } from '../atoms/selectedCompanyAtom';
import { CompanyDataInterface, JobDataInterface } from '../../../standards/interfaces/interfaces';
import TwoColumnLayoutPage from '../../../standards/styles/layouts/twoColumnLayout';
import { BiPlus } from 'react-icons/bi';
import currentRouteAtom from '../../../atoms/app/currentRouteAtom';
import StandardDropDown, {
  DropDownOptionInterface,
} from '../../../standards/styles/components/dropdowns';
import NewJob from '../../newJob/ui/newJob';
import JobsList from '../components/JobsList';
import SelectedJobDetails from '../components/SelectedJobDetails';
import { selectedJobAtom } from '../jobsAtoms';

export default function JobsPage() {
  const navigate = useNavigate();
  const [selectedCompany, setSelectedCompany] = useRecoilState(selectedCompanyAtom);
  const [isOpen, setIsOpen] = useState(false);
  const [allCompanies, setAllCompanies] = useState<Array<CompanyDataInterface>>([] as Array<CompanyDataInterface>);
  const [_, setcurrentRoute] = useRecoilState(currentRouteAtom);
  const [selectedJob, setSelectedJob] = useRecoilState(selectedJobAtom);

  const db = getFirestore();

  useEffect(() => {
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
    setcurrentRoute('Jobs');
  }, []);

  return (
    <>
      <NewJob isOpen={isOpen} setIsOpen={setIsOpen} />
      <TwoColumnLayoutPage
        header={
          <div className='flex flex-row gap-3 justify-start items-start w-full h-full'>
            {
              allCompanies.length>0?
              <StandardDropDown
              value={selectedCompany.companyName}
              options={allCompanies.map((company) => {
                return {
                  option: company.companyName,
                  onClick: () => {
                    setSelectedCompany(company);
                    setSelectedJob({} as JobDataInterface);
                    
                  },
                } as DropDownOptionInterface;
              })}
              placeholder='Select a company'
              icon={<MdArrowDropDown size={15}></MdArrowDropDown>}
            />:
            <div className='text-blue/80 text-sm flex justify-start items-center h-full w-full'>Create a company to post jobs</div>
            }
            {selectedCompany.id && (
              <StandardLightBlueButton
                onClick={() => {
                  setIsOpen(true);
                }}
                icon={<BiPlus />}
                text='New Job'
              />
            )}
          </div>
        }
        leftBar={<JobsList />}
        rightBar={<SelectedJobDetails />}
      />
    </>
  );
}
