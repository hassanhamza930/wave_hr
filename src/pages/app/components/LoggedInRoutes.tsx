import { Route, Routes } from "react-router-dom";
import LoggedInHeader from "../../../standards/components/LoggedInHeader";
import Home from "../../home/ui/home";
import LandingPage from '../../landingPage/ui/landingPage';
import Login from "../../login/ui/login";
import Pricing from '../../pricing/ui/pricing';

export default function LoggedInRoutes() {
    return (
        <>
            <LoggedInHeader />
            <Routes>
                <Route path="/" element={<Home />} ></Route>
            </Routes>
        </>

    )
}