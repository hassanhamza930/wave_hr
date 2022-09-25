import { Route, Routes } from "react-router-dom";
import LandingPage from '../../landingPage/ui/landingPage';
import Pricing from '../../pricing/ui/pricing';

export default function LoggedOutRoutes(){
    return(
        <Routes>
            <Route path="/" element={<LandingPage/>} ></Route>
            <Route path="/pricing" element={<Pricing/>} ></Route>
        </Routes>
            
    )
}