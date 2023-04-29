import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { AiOutlineSearch } from 'react-icons/ai';

import { companyAtom } from '../atom/companyAtom';

const SearchHeader = () => {
  const [search, setSearch] = useState('');
  const [_, setCompanyValues] = useRecoilState(companyAtom);

  useEffect(() => {
    if (search) {
      setCompanyValues((prev) => ({
        ...prev,
        filteredCompanyJobs: prev.companyJobs.filter((job) =>
          job.jobTitle
            .trim()
            .toLowerCase()
            .includes(search.trim().toLowerCase())
        ),
      }));
    } else {
      setCompanyValues((prev) => ({
        ...prev,
        filteredCompanyJobs: prev.companyJobs,
      }));
    }
  }, [search]);

  return (
    <div className='w-full bg-blue/5 flex items-center p-6 rounded-tl-3xl rounded-tr-3xl'>
      <AiOutlineSearch className='text-2xl mr-3' />
      <input
        type='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='outline-none border-none bg-transparent w-full placeholder-black h-full'
        placeholder='Search Jobs'
      />
    </div>
  );
};

export default SearchHeader;
