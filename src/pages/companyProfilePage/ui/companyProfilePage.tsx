import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router';
import { useRecoilState } from 'recoil';
import isLoadingAtom from '../../../atoms/app/isLoadingAtom';
import { CompanyDataInterface } from '../../../standards/interfaces/interfaces';
import { Heading } from '../../../standards/styles/components/heading';
import PublicFacingLayout from '../../../standards/styles/layouts/PublicFacingLayout';
import TwoColumnCompanyPreview from '../layout/TwoColumnCompanyPreview';
import LeftBar from '../components/LeftBar';
import JobsList from '../components/JobsList';
import { companyAtom } from '../atom/companyAtom';
import SearchHeader from '../components/SearchHeader';
import Footer from '../components/Footer';
import { SearchBar } from '../../../standards/styles/components/inputs';
import { jobSearchAtom } from '../atom/jobSearch';
import { motion } from 'framer-motion';

function CompanyProfilePage() {
  const { companyId } = useParams();
  const [companyValues, setCompanyValues] = useRecoilState(companyAtom);
  const [jobSearch, setJobSearch] = useRecoilState(jobSearchAtom);
  const navigate=useNavigate();
  const db = getFirestore();
  const [_, setLoading] = useRecoilState(isLoadingAtom);
  const [isCompanyFetched, setIsCompanyFetched] = useState(false);

  async function fetchCompanyDetails() {
    setLoading(true);

    try {
      const docRef = doc(db, 'companies', companyId as string);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data: CompanyDataInterface =
          docSnap.data() as CompanyDataInterface;
        const companyDetails = {
          ...data,
          id: docSnap.id,
        };
        setCompanyValues((prev) => ({ ...prev, company: companyDetails }));
        setLoading(false);
        setIsCompanyFetched(true);
      } else {
        console.log('No such document!');
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchCompanyDetails();
  }, []);


  return (
    <PublicFacingLayout>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        style={{
          backgroundImage: `url('${!companyValues.company.companyCover
            ? 'https://assets-global.website-files.com/5c7fdbdd4e3feeee8dd96dd2/62c4ff55b8637de51557f5f0_growth-flat-color.gif'
            : companyValues.company.companyCover
            }')`,
        }}
        className={`relative mt-5 z-10 w-full h-36 md:h-64 bg-blue bg-cover shadow-md bg-center rounded-3xl flex justify-end items-end p-10`}
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className='relative z-30 flex items-center justify-center'>
        <div className='border-2 border-white bg-tan shadow-md h-24 w-24 md:w-36 md:h-36 rounded-md overflow-hidden -mt-12 md:-mt-24'>
          <img
            src={companyValues.company.companyLogo}
            alt={companyValues.company.companyName}
            className='w-full h-full rounded-md object-contain'
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className='flex flex-col justify-center items-center mt-3'>
        <Heading text={companyValues.company.companyName} />
        <div className='text-black text-sm mt-1 md:mt-2'>
          {companyValues.company.companyLocation}
        </div>
      </motion.div>

      {/* layout */}
      {isCompanyFetched && (
        <TwoColumnCompanyPreview
          leftBar={<LeftBar companyDetails={companyValues.company} />}
          rightHeader={<SearchBar placeholder='Search Job' onChange={(e: any) => { setJobSearch(e.target.value) }} value={jobSearch} />}
          rightBar={<JobsList id={companyValues.company.id!} />}
        />
      )}
    </PublicFacingLayout>
  );
}

export default CompanyProfilePage;
