import JobCard from "../components/JobCard";
import JobDetails from "../components/jobDetails";
import { BsArrowRightShort } from "react-icons/bs";
import { useRecoilState } from "recoil";
import isPostJobModalOpenAtom from "../../newJob/atoms/newJobAtoms";
import { Navigate, useNavigate } from "react-router";
import AllPostedJobs from "../components/AllPostedJobs";
import { moreThanTwoJobsAtom, selectedJobAtom } from "../jobsAtoms";
import { Fragment, useEffect, useState } from "react";
import { collection, getDoc, getDocs, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import PageLayout from "../../../standards/styles/layouts/pageLayout";
import { ButtonOutlinedBlue, ButtonSolid } from "../../../standards/styles/components/button";
import { Listbox, Menu, Transition } from "@headlessui/react";
import { MdArrowDropDown } from "react-icons/md";
import { CompanyInformation } from "../../addNewCompany/logic/addCompany";
import { selectedCompanyAtom } from "../atoms/selectedCompanyAtom";
import { SubHeading } from "../../../standards/styles/components/heading";
import { Dropdown, MenuProps, Space } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { CompanyDataInterface } from "../../../standards/interfaces/interfaces";



export default function JobsPage() {

    const navigate = useNavigate();
    const [selectedJob, setSelectedJob] = useRecoilState(selectedJobAtom);
    const [moreThanTwoJobs, setMoreThanTwoJobs] = useRecoilState(moreThanTwoJobsAtom);
    const [selectedCompany, setSelectedCompany] = useRecoilState(selectedCompanyAtom);
    const [allCompanies, setAllCompanies] = useState<Array<CompanyInformation>>([] as Array<CompanyInformation>);


    const db = getFirestore();



    async function fetchAllCompaniesPostedByUser() {

        onSnapshot(query(collection(db, "companies"), where("companyOwnerId", "==",localStorage.getItem("uid") as string ) ), (docs) => {
            var docsData: Array<CompanyDataInterface> = docs.docs.map((doc) => {
                var tempData: CompanyDataInterface = doc.data() as CompanyDataInterface;
                tempData.id = doc.id;
                return tempData as CompanyDataInterface
            });
            setAllCompanies(docsData as Array<CompanyDataInterface>);
        })

    }

    useEffect(() => {
        fetchAllCompaniesPostedByUser();
    }, [])




    return (

        <PageLayout>



            <div className="w-full h-full flex flex-row">

                <div className="h-full w-2/4 flex flex-col justify-start items-start ">

                    <div className="relative">
                        <Menu>
                            <Menu.Button className={"px-4 py-2 rounded-md text-sm bg-tan border-black border-[1px] text-black flex flex-row justify-center items-center gap-3"}>
                                {selectedCompany.companyName == null ? "Select a Company" : selectedCompany.companyName}
                                <MdArrowDropDown className="text-blue h-4 w-4" />
                            </Menu.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95">

                                <Menu.Items className="absolute mt-1 justify-center left-0 w-48 rounded-md origin-top-right divide-y divide-gray-100  bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                                    {allCompanies.map((company) => {
                                        return (
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        onClick={() => { setSelectedCompany(company) }}
                                                        className={`${active ? 'bg-secondary text-black' : 'text-gray-900'} group flex w-full items-center justify-start  px-4 py-2 text-sm`}>
                                                        {company.companyName}
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        )
                                    })}
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>

                    {
                        selectedCompany.companyName != null &&
                        <div className="text-md mb-2 ml-1 pt-10">Your Job Postings</div>
                    }

                    {
                        selectedCompany.companyName == null &&
                        <SubHeading customStyles="mt-5 mb-5" text="Select a company to see posted jobs." />
                    }



                    <AllPostedJobs />

                    {
                        selectedCompany.companyName != null &&
                        <ButtonSolid text="Post a New Job" onClick={() => { navigate("/newJob") }} customStyles="mt-10" />
                    }

                </div>

                {
                    selectedJob.companyId != null ? <JobDetails /> :
                        <div id="no_scroll" className="flex justify-center items-center h-[500px] rounded-md mb-10 w-2/4 overflow-y-scroll">
                            <div className="text-blue text-md">Select a job to see details</div>
                        </div>
                }

            </div>

        </PageLayout>
    )


}