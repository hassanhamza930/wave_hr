import AllApplicants from '../components/AllApplicants';
import SelectedApplicantDetails from '../components/selectedApplicantDetails';
import TwoColumnLayoutPage from '../../../standards/styles/layouts/twoColumnLayout';
import { useEffect, useState } from 'react';
import { ApplicationStatusEnum, CompanyDataInterface, JobDataInterface } from '../../../standards/interfaces/interfaces';
import { useParams } from 'react-router';
import { DocumentSnapshot, doc, getDoc, getFirestore, onSnapshot } from '@firebase/firestore';
import { AnimatePresence, motion } from 'framer-motion';
import StandardDropDown from '../../../standards/styles/components/dropdowns';
import { MdArrowDropDown } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import ApplicantsFilterAtom from '../atoms/applicantsFilterAtom';



export default function Applicants() {
  const [jobData, setJobData] = useState({} as JobDataInterface);
  const [companyData, setCompanyData] = useState({} as CompanyDataInterface);
  const FilteringApplicantsStates:Array<string>= Object.entries(ApplicationStatusEnum).map(([key, value]) => (value));
  FilteringApplicantsStates.splice(0, 0, "All"); 
  const [currentFilter, setcurrentFilter] = useRecoilState(ApplicantsFilterAtom);
  const { jobId } = useParams();
  const db = getFirestore();

  useEffect(() => {
    // onSnapshot(doc(db, 'jobs', jobId as string), (doc1: DocumentSnapshot) => {
    //   setJobData(doc1.data() as JobDataInterface);
    //   getDoc(doc(db, "companies", doc1.data()!.companyId)).then((doc2) => {
    //     setCompanyData(doc2.data() as CompanyDataInterface);
    //   })
    // });
  }, []);


  return (
    <>
      <TwoColumnLayoutPage
        header={
          <div className='text-md flex flex-row justify-end items-start h-full w-full text-black'>
            <AnimatePresence>
              <StandardDropDown
              icon={<MdArrowDropDown/>}
              placeholder='Select a Filter'
              value={currentFilter}
              options={
               FilteringApplicantsStates.map((option) => {
                  return {
                    option: option,
                    onClick: () => {setcurrentFilter(option as ApplicationStatusEnum)},
                  };
                })
              }
              />
            </AnimatePresence>
          </div>
        }
        leftBar={<AllApplicants />}
        rightBar={<SelectedApplicantDetails />}
      />
    </>
  );
}
