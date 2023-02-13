import JobCard from "../components/JobCard";
import JobDetails from "../components/jobDetails";
import { BsArrowRightShort } from "react-icons/bs";
import { useRecoilState } from "recoil";
import isPostJobModalOpenAtom from "../../newJob/atoms/newJobAtoms";
import { Navigate, useNavigate } from "react-router";
import AllPostedJobs from "../components/AllPostedJobs";
import { moreThanTwoJobsAtom, selectedJobAtom } from "../jobsAtoms";
import { useEffect, useState } from "react";
import { collection, getDoc, getDocs, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import PageLayout from "../../../standards/styles/layouts/pageLayout";
import { ButtonOutlinedBlue } from "../../../standards/styles/components/button";
import { Listbox } from "@headlessui/react";
import { MdArrowDropDown } from "react-icons/md";
import { CompanyInformation } from "../../addNewCompany/logic/addCompany";
import { selectedCompanyAtom } from "../atoms/selectedCompanyAtom";

export default function JobsPage() {

    const navigate = useNavigate();
    const [selectedJob, setSelectedJob] = useRecoilState(selectedJobAtom);
    const [moreThanTwoJobs, setMoreThanTwoJobs] = useRecoilState(moreThanTwoJobsAtom);
    const [selectedCompany, setSelectedCompany] = useRecoilState(selectedCompanyAtom);
    const [allCompanies, setAllCompanies] = useState<Array<CompanyInformation>>([] as Array<CompanyInformation>);
    

    const db = getFirestore();

    async function checkMoreThanTwoJobs() {
        onSnapshot(query(collection(db, "jobs"), where("postedBy", "==", localStorage.getItem("uid"))), (docs) => {
            if (docs.docs.length >= 2) {
                setMoreThanTwoJobs(true);
            }
            else {
                setMoreThanTwoJobs(false);
            }
        })
    }

    async function fetchAllCompaniesPostedByUser() {

        onSnapshot(query(collection(db, "companies"), where("companyOwnerId", "==", localStorage.getItem("uid"))), (docs) => {
            var docsData: Array<CompanyInformation> = docs.docs.map((doc) => {
                var tempData: CompanyInformation = doc.data() as CompanyInformation;
                tempData.docId = doc.id;
                return tempData as CompanyInformation
            });
            setAllCompanies(docsData as Array<CompanyInformation>);
        })

    }

    useEffect(() => {
        checkMoreThanTwoJobs();
        fetchAllCompaniesPostedByUser();
    }, [])



    return (

        <PageLayout>

            <Listbox value={selectedCompany} onChange={setSelectedCompany} >

                <Listbox.Button className={"px-4 py-2 rounded-md text-sm bg-tan border-blue border-[1px] text-blue flex flex-row justify-center items-center gap-3"}>
                    {selectedCompany.companyName == null ? "Select a Company" : selectedCompany.companyName}
                    <MdArrowDropDown className="text-blue h-4 w-4"/>
                </Listbox.Button>
                
                <Listbox.Options className={"absolute bg-blue flex flex-col justify-start w-48 items-start text-tan rounded-md py-2"}>

                    {allCompanies.map((company) => {
                        return (
                            <button onClick={()=>{setSelectedCompany(company)}} key={company.companyName} className="hover:font-bold px-4 flex justify-start items-start w-full py-2 hover:bg-purp">
                                {company.companyName}
                            </button>
                        )
                    })}



                </Listbox.Options>

            </Listbox>

            <div className="text-md mb-2 ml-1 pt-10">Your Job Postings</div>

            <div className="w-full h-full flex flex-row">
                <div className="pr-20 h-full w-2/4 flex flex-col justify-start items-start ">

                    <AllPostedJobs />
                    {
                        moreThanTwoJobs == false &&
                        <ButtonOutlinedBlue text="Post a New Job" onClick={() => { navigate("/newJob") }} customStyles="mt-10" />
                    }

                </div>

                {
                    selectedJob.jobData != null ? <JobDetails /> :
                        <div id="no_scroll" className="flex justify-center items-center h-[500px] rounded-md mb-10 w-2/4 overflow-y-scroll">
                            <div className="text-blue text-md">Select a job to see details</div>
                        </div>
                }

            </div>

        </PageLayout>
    )


}