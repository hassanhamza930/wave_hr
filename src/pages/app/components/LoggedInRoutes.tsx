import { Route, Routes } from "react-router-dom";
import LoggedInHeader from "../../../standards/components/LoggedInHeader";
import Home from "../../home/ui/home";
import JobsPage from "../../jobs/ui/jobs";



export default function LoggedInRoutes() {
    return (
        <>
            <LoggedInHeader />
            <Routes>
                <Route path="/" element={<Home />} ></Route>
                <Route path="/jobs" element={<JobsPage/>} ></Route>
            </Routes>
        </>

    )
}