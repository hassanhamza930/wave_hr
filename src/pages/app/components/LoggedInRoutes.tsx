import { Route, Routes } from "react-router-dom";
import LoggedInHeader from "../../../standards/components/LoggedInHeader";
import Applicants from "../../applicants/ui/applicants";
import Apply from "../../apply/ui/apply";
import Home from "../../home/ui/home";
import JobsPage from "../../jobs/ui/jobs";
import NewJob from '../../newJob/ui/newJob';



export default function LoggedInRoutes() {
    return (
        <>
            <LoggedInHeader />
            <Routes>
                <Route path="/" element={<Home />} ></Route>
                <Route path="/jobs" element={<JobsPage/>} ></Route>
                <Route path="/newJob" element={<NewJob/>} ></Route>
                <Route path="/applicants/:jobId" element={<Applicants/>} ></Route>
                <Route path="/apply/:jobId" element={<Apply />} ></Route>
            </Routes>
        </>

    )
}