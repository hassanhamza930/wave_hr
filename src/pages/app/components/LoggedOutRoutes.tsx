import { Route, Routes } from "react-router-dom";
import LoggedOutHeader from "../../../standards/components/LoggedOutHeader";
import Apply from "../../apply/ui/apply";
import CompanyProfilePage from "../../companyProfilePage/ui/companyProfilePage";
import LandingPage from '../../landingPage/ui/landingPage';
import Login from "../../login/ui/login";
import { useEffect, useState } from "react";



export default function LoggedOutRoutes() {


    var publicUrls:Array<string>=["company","apply"];
    const [isPublic, setisPublic] = useState(false);

    useEffect(()=>{
        publicUrls.forEach((url)=>{
            if(window.location.pathname.includes(url)){
                setisPublic(true);
            }
        });
    },[])


    return (
        <>
            {isPublic==true ? null : <LoggedOutHeader />}
            <Routes>
                <Route path="/" element={<LandingPage />} ></Route>
                <Route path="/login" element={<Login />} ></Route>
                <Route path="/apply/:jobId" element={<Apply />} ></Route>
                <Route path="/company/:companyId" element={<CompanyProfilePage />} ></Route>
            </Routes>
        </>

    )
}