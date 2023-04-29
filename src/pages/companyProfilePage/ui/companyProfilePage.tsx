import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { useParams } from 'react-router';
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

function CompanyProfilePage() {
  const { companyId } = useParams();
  const [companyValues, setCompanyValues] = useRecoilState(companyAtom);

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

  // async function fetchAllJobsPostedByCompany() {
  //   onSnapshot(
  //     query(collection(db, 'jobs'), where('companyId', '==', companyId)),
  //     (docs) => {
  //       var allJobsData: Array<JobDataInterface> = docs.docs.map((doc) => {
  //         var tempData: JobDataInterface = doc.data() as JobDataInterface;
  //         tempData.id = doc.id;
  //         return tempData as JobDataInterface;
  //       });
  //       setAllJobsPostedByCompany(allJobsData);
  //     }
  //   );
  // }

  useEffect(() => {
    fetchCompanyDetails();
    // fetchAllJobsPostedByCompany();
  }, []);

  return (
    <div className='flex flex-col'>
      <PublicFacingLayout>
        <div
          style={{
            backgroundImage: `url('${
              !companyValues.company.companyCover
                ? 'https://assets-global.website-files.com/5c7fdbdd4e3feeee8dd96dd2/62c4ff55b8637de51557f5f0_growth-flat-color.gif'
                : companyValues.company.companyCover
            }')`,
          }}
          className={`w-full h-72 bg-blue bg-cover shadow-xl bg-center rounded-3xl flex justify-end items-end p-10 border border-dark-gray`}
        />

        <div className='flex items-center justify-center'>
          <div className='w-36 h-36 rounded-full border border-dark-gray overflow-hidden -mt-24'>
            <img
              src={companyValues.company.companyLogo}
              alt={companyValues.company.companyName}
              className='w-full h-full rounded-full object-cover'
            />
          </div>
        </div>

        <div className='flex flex-col justify-center items-center mb-3'>
          <Heading text={companyValues.company.companyName} />
          <div className='text-black text-sm mt-2'>
            {companyValues.company.companyLocation}
          </div>
        </div>

        {/* layout */}
        {isCompanyFetched && (
          <TwoColumnCompanyPreview
            leftBar={<LeftBar companyDetails={companyValues.company} />}
            rightHeader={<SearchHeader />}
            rightBar={<JobsList id={companyValues.company.id!} />}
          />
        )}
      </PublicFacingLayout>
      <Footer />
    </div>
  );
}

export default CompanyProfilePage;
