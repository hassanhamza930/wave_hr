import { Route, Routes } from "react-router-dom";
import LoggedOutHeader from "../../../standards/components/LoggedOutHeader";
import Apply from "../../apply/ui/apply";
import CompanyProfilePage from "../../companyProfilePage/ui/companyProfilePage";
import LandingPage from '../../landingPage/ui/landingPage';
import Login from "../../login/ui/login";



export default function LoggedOutRoutes() {
    return (
        <>
            <LoggedOutHeader />

            <Routes>
                <Route path="/" element={<LandingPage />} ></Route>
                <Route path="/login" element={<Login />} ></Route>
                <Route path="/apply/:jobId" element={<Apply />} ></Route>
                <Route path="/company/:companyId" element={<CompanyProfilePage />} ></Route>
            </Routes>
        </>

    )
}