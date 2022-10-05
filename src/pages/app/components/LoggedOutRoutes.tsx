import { Route, Routes } from "react-router-dom";
import LoggedOutHeader from "../../../standards/components/LoggedOutHeader";
import LandingPage from '../../landingPage/ui/landingPage';
import Login from "../../login/ui/login";
import Pricing from '../../pricing/ui/pricing';



export default function LoggedOutRoutes() {
    return (
        <>
            <LoggedOutHeader />

            <Routes>
                <Route path="/" element={<LandingPage />} ></Route>
                <Route path="/pricing" element={<Pricing />} ></Route>
                <Route path="/login" element={<Login />} ></Route>
            </Routes>
        </>

    )
}