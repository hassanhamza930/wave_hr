import { useParams } from "react-router";
import AllPostedJobs from "../../jobs/components/AllPostedJobs"
import { useEffect, useState } from 'react';
import { getDocs, collection, getFirestore, onSnapshot, doc } from 'firebase/firestore';
import { JobApplication } from '../../apply/atoms/applyPageAtoms';
import { JobData, JobPosting } from '../../jobs/components/JobCard';
import AllApplicants from "../components/AllApplicants";
import { useRecoilState } from 'recoil';
import SelectedApplicantDetails from '../components/selectedApplicantDetails';
import PageLayout from "../../../standards/styles/layouts/pageLayout";




export default function Applicants() {



    return (
        <PageLayout>
        {/* <div className="pt-[85px] pb-[25px] h-screen w-full flex justify-center items-center"> */}

            <div className="h-full w-full flex flex-row justify-between items-center">

                <AllApplicants/>
                <SelectedApplicantDetails/>

            </div>
        {/* </div> */}
        </PageLayout>

    )
}