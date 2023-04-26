import { useCallback, useEffect, useState } from 'react';
import TwoColumnLayoutPage from '../../../standards/styles/layouts/twoColumnLayout';
import LeftSidebar from '../components/LeftSidebar';
import { HiOutlineSearch } from 'react-icons/hi';
import { selectedCompanyAtom } from '../atoms/selectedCompany';
import { useRecoilState } from 'recoil';
import { Heading } from '../../../standards/styles/components/heading';
import CompanyDetail from '../components/CompanyDetail';
import { getAllCompanies } from '../logic';
import { allUserCompanies } from '../atoms/companies';

function Companies() {
  const [search, setSearch] = useState('');
  const [selectedCompany] = useRecoilState(selectedCompanyAtom);
  const [allCompanies, setAllCompanies] = useRecoilState(allUserCompanies);

  const fetchData = useCallback(async () => {
    if (!allCompanies.isDataFetched) {
      const userCompanies = await getAllCompanies();
      setAllCompanies({ isDataFetched: true, companies: userCompanies! });
    }
  }, [allCompanies.isDataFetched, setAllCompanies]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <TwoColumnLayoutPage
        header={
          <div className='flex items-center'>
            <HiOutlineSearch className='text-black ml-10 w-[32px] h-[32px]' />
            <input
              type='text'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='w-full h-full p-8 border-none outline-none bg-transparent text-black text-[22px] placeholder-black pl-4'
              placeholder='Search Company'
            />
          </div>
        }
        component1={
          <>
            <div className='w-full bg-transparent backdrop-blur-xl rounded-xl flex flex-col justify-start items-start'>
              <LeftSidebar search={search} />
            </div>
          </>
        }
        component2={
          <div className='w-full bg-transparent backdrop-blur-xl rounded-xl flex flex-col justify-start items-start p-6'>
            {Object.keys(selectedCompany).length ? (
              <CompanyDetail />
            ) : (
              <Heading text='Please Select a Company' />
            )}
          </div>
        }
      />
    </>
  );
}

export default Companies;
