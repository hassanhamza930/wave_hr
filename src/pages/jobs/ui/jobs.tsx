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
import { ButtonOutlinedBlue, ButtonSolid, StandardLightBlueButton } from "../../../standards/styles/components/button";
import { Listbox, Menu, Transition } from "@headlessui/react";
import { MdArrowDropDown } from "react-icons/md";
import { CompanyInformation } from "../../addNewCompany/logic/addCompany";
import { selectedCompanyAtom } from "../atoms/selectedCompanyAtom";
import { SubHeading } from "../../../standards/styles/components/heading";
import { Dropdown, MenuProps, Space } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { CompanyDataInterface, JobDataInterface } from "../../../standards/interfaces/interfaces";
import TwoColumnLayoutPage from "../../../standards/styles/layouts/twoColumnLayout";
import { BiPlus } from "react-icons/bi";
import currentRouteAtom from "../../../atoms/app/currentRouteAtom";
import StandardDropDown, { DropDownOptionInterface } from "../../../standards/styles/components/dropdowns";



export default function JobsPage() {

    const navigate = useNavigate();
    const [selectedJob, setSelectedJob] = useRecoilState(selectedJobAtom);
    const [selectedCompany, setSelectedCompany] = useRecoilState(selectedCompanyAtom);
    const [allCompanies, setAllCompanies] = useState<Array<CompanyDataInterface>>([] as Array<CompanyDataInterface>);
    const [currentRoute, setcurrentRoute] = useRecoilState(currentRouteAtom);


    const db = getFirestore();




    useEffect(() => {
        onSnapshot(query(collection(db, "companies"), where("companyOwnerId", "==", localStorage.getItem("uid") as string)), (docs) => {
            var docsData: Array<CompanyDataInterface> = docs.docs.map((doc) => {
                var tempData: CompanyDataInterface = doc.data() as CompanyDataInterface;
                tempData.id = doc.id;
                return tempData as CompanyDataInterface
            });
            setAllCompanies(docsData as Array<CompanyDataInterface>);
        })
        setcurrentRoute('Jobs');

    }, [])




    return (
        <TwoColumnLayoutPage
            header={
                <div className='flex flex-row gap-3 justify-start items-start w-full h-full'>
                    <StandardDropDown value={selectedCompany.companyName}
                        options={
                            allCompanies.map((company) => {
                                return {
                                    option: company.companyName,
                                    onClick: () => {
                                        setSelectedCompany(company);
                                    }
                                } as DropDownOptionInterface
                            })} placeholder="Select a company" icon={<MdArrowDropDown size={15}></MdArrowDropDown>} />
                    <StandardLightBlueButton
                        onClick={() => {
                            navigate('/addNewCompany');
                        }}
                        icon={<BiPlus />}
                        text='New Job'
                    />
                </div>
            }
            leftBar={<div></div>}
            rightBar={<div />}
        />
    )


}