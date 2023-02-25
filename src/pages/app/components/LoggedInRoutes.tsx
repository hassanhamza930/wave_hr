import { Route, Routes } from "react-router-dom";
import LoggedInHeader from "../../../standards/components/LoggedInHeader";
import AddNewCompany from "../../addNewCompany/ui/addNewCompany";
import Applicants from "../../applicants/ui/applicants";
import Apply from "../../apply/ui/apply";
import Companies from "../../companies/ui/companies";
import CompanyProfilePage from "../../companyProfilePage/ui/companyProfilePage";
import EditCompany from "../../editCompany/ui/editCompany";
import EditJob from "../../editJob/ui/editJob";
import Home from "../../home/ui/home";
import Interviews from "../../interviews/ui/interview";
import JobsPage from "../../jobs/ui/jobs";
import NewJob from '../../newJob/ui/newJob';
import Test from "../../test/test";
import { useWindowSize } from "../ui/App";



export default function LoggedInRoutes() {
    const { height, width } = useWindowSize();

    if (width < 1280 && window.location.pathname.includes("apply")) {
        return (
            <Routes>
                <Route path="/apply/:jobId" element={<Apply />} />
                <Route path="*" element={""} />
            </Routes>
        )
    }
    else if (width < 1280 && window.location.pathname.includes("apply") == false) {
        return (
            <></>
        )
    }
    else {
        return (
            <>
                <LoggedInHeader />
                <Routes>
                    <Route path="/" element={<Home />} ></Route>
                    <Route path="/jobs" element={<JobsPage />} ></Route>
                    <Route path="/newJob" element={<NewJob />} ></Route>
                    <Route path="/editJob/:jobId" element={<EditJob />} ></Route>
                    <Route path="/editCompany/:companyId" element={<EditCompany />} ></Route>
                    <Route path="/companies" element={<Companies />} ></Route>
                    <Route path="/applicants/:jobId" element={<Applicants />} ></Route>
                    <Route path="/apply/:jobId" element={<Apply />} ></Route>
                    <Route path="/addNewCompany" element={<AddNewCompany />} ></Route>
                    <Route path="/company/:companyId" element={<CompanyProfilePage />} ></Route>
                </Routes>
            </>

        )
    }


}