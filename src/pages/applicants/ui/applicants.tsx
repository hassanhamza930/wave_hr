import AllApplicants from '../components/AllApplicants';
import SelectedApplicantDetails from '../components/selectedApplicantDetails';
import TwoColumnLayoutPage from '../../../standards/styles/layouts/twoColumnLayout';
import { useEffect, useState } from 'react';
import { CompanyDataInterface, JobDataInterface } from '../../../standards/interfaces/interfaces';
import { useParams } from 'react-router';
import { DocumentSnapshot, doc, getDoc, getFirestore, onSnapshot } from '@firebase/firestore';
import { AnimatePresence, motion } from 'framer-motion';

export default function Applicants() {
  const [jobData, setJobData] = useState({} as JobDataInterface);
  const [companyData, setCompanyData] = useState({} as CompanyDataInterface);
  const { jobId } = useParams();
  const db = getFirestore();

  useEffect(() => {
    onSnapshot(doc(db, 'jobs', jobId as string), (doc1: DocumentSnapshot) => {
      setJobData(doc1.data() as JobDataInterface);
      getDoc(doc(db, "companies", doc1.data()!.companyId)).then((doc2) => {
        setCompanyData(doc2.data() as CompanyDataInterface);
      })
    });
  }, []);


  return (
    <>
      <TwoColumnLayoutPage
        header={
          <div className='text-md flex justify-start items-center h-full w-full text-black'>
            <AnimatePresence>
              {
                jobData.jobTitle != undefined && companyData.companyName != undefined &&
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <span><b>{jobData.jobTitle}</b> at <b>{companyData.companyName}</b> </span>
                </motion.div>
              }
            </AnimatePresence>
          </div>
        }
        leftBar={<AllApplicants />}
        rightBar={<SelectedApplicantDetails />}
      />
    </>
  );
}
