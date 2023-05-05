import { Route, Routes } from 'react-router-dom';
import LoggedInHeader from '../../../standards/components/LoggedInHeader';
import Applicants from '../../applicants/ui/applicants';
import Apply from '../../apply/ui/apply';
import Companies from '../../companies/ui/companies';
import CompanyProfilePage from '../../companyProfilePage/ui/companyProfilePage';
import Home from '../../home/ui/home';
import Interviews from '../../interviews/ui/interview';
import JobsPage from '../../jobs/ui/jobs';
import { useEffect, useState } from 'react';
import CompanyForm from '../../compnayForm/ui';
import JobForm from '../../jobForm/ui';

export default function LoggedInRoutes() {
  var publicUrls: Array<string> = ['company', 'apply'];
  const [isPublic, setisPublic] = useState(false);

  useEffect(() => {
    publicUrls.forEach((url) => {
      if (window.location.pathname.includes(url)) {
        setisPublic(true);
      }
    });
  }, []);

  return (
    <>
      {isPublic ? null : <LoggedInHeader />}
      {/* <div className="fixed z-50 text-5xl font-bold text-black">{window.location.href}</div> */}
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/jobs' element={<JobsPage />}></Route>
        <Route path='/companies' element={<Companies />}></Route>
        <Route path='/applicants/:jobId' element={<Applicants />}></Route>
        <Route path='/apply/:jobId' element={<Apply />}></Route>
        <Route path='/companyForm' element={<CompanyForm />} />
        <Route path='/jobForm' element={<JobForm />} />
        <Route
          path='/company/:companyId'
          element={<CompanyProfilePage />}
        ></Route>
        <Route path='/interviews' element={<Interviews />}></Route>
      </Routes>
    </>
  );
}
