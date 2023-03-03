import * as dayjs from 'dayjs'
import { collection, doc, getDoc, getFirestore, onSnapshot, query, Timestamp, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { BsPerson, BsPin } from "react-icons/bs";
import { useNavigate, useParams } from "react-router";
import { useRecoilState } from "recoil";
import isLoadingAtom from "../../../atoms/app/isLoadingAtom";
import { CompanyDataInterface, JobDataInterface } from "../../../standards/interfaces/interfaces";
import { Heading, SubHeading } from "../../../standards/styles/components/heading";
import FormLayout from "../../../standards/styles/layouts/FormLayout";
import PageLayout from "../../../standards/styles/layouts/pageLayout";
import PublicFacingLayout from "../../../standards/styles/layouts/PublicFacingLayout";
import CompanyBanner from "../../addNewCompany/components/companyBanner";
import { CompanyData } from "../../apply/ui/apply";
import JobCard from "../../jobs/components/JobCard";

function CompanyProfilePage() {

    const { companyId } = useParams();
    const [companyDetails, setcompanyDetails] = useState<CompanyDataInterface>({} as CompanyDataInterface);
    const db = getFirestore();
    const [loading, setLoading] = useRecoilState(isLoadingAtom);
    const [allJobsPostedByCompany, setAllJobsPostedByCompany] = useState<Array<JobDataInterface>>([] as Array<JobDataInterface>);
    const navigate = useNavigate();

    function navigateToApplyPage(id: string) {
        var jobLink = window.location.href.includes("localhost") == true ? "http://localhost:3000/" + "apply/" + id : "https://wavehr.vercel.app" + "/apply/" + id;
        window.location.href = jobLink;
    }

    async function fetchCompanyDetails() {
        setLoading(true);
        var data: CompanyDataInterface = (await getDoc(doc(db, "companies", companyId as string))).data() as CompanyDataInterface;
        setcompanyDetails(data);
        setLoading(false);
    }

    async function fetchAllJobsPostedByCompany() {
        onSnapshot(query(collection(db, "jobs"), where("companyId", "==", companyId)), ((docs) => {
            var allJobsData: Array<JobDataInterface> = docs.docs.map((doc) => {
                var tempData: JobDataInterface = doc.data() as JobDataInterface;
                tempData.id = doc.id;
                return tempData as JobDataInterface
            });
            setAllJobsPostedByCompany(allJobsData);
        }))
    }


    useEffect(() => {
        fetchCompanyDetails();
        fetchAllJobsPostedByCompany();
    }, [])

    return (
        <PublicFacingLayout>

            <div style={{ backgroundImage: `url('${companyDetails.companyCover == "" ? "https://assets-global.website-files.com/5c7fdbdd4e3feeee8dd96dd2/62c4ff55b8637de51557f5f0_growth-flat-color.gif" : companyDetails.companyCover}')` }} className={`  w-full h-72 bg-blue bg-cover shadow-xl bg-center rounded-md flex justify-end items-end p-10`}>
                <div className="flex flex-row justify-end items-center">
                </div>
            </div>

            <div
                style={{ backgroundImage: `url('${companyDetails.companyLogo}')` }}
                className=" bg-contain bg-no-repeat bg-transparent bg-center -mt-24 ml-12 h-36 w-36 rounded-xl flex justify-center items-center">
            </div>

            <div className="flex flex-row justify-between items-center mx-12">
                <Heading text={companyDetails.companyName} customStyles="mt-4 "></Heading>
                <div className="flex flex-col justify-start items-start">
                    <div className="flex flex-row gap-2 justify-center items-center">
                        <BsPerson className="text-black text-sm h-4 w-4" />
                        {companyDetails.numberOfEmployees} Employees
                    </div>
                    <div className="flex flex-row gap-2 justify-center items-center">
                        <BsPin className="text-black text-sm h-4 w-4" />
                        {companyDetails.companyLocation}
                    </div>
                </div>

            </div>

            <div className="text-black text-sm mt-2 ml-12">
                {companyDetails.companyLocation}
            </div>

            <div className="text-black text-sm mt-0 ml-12">
                {companyDetails.numberOfEmployees} Employees
            </div>

            <div className="ml-12 mt-3 flex flex-row gap-2 justify-start items-start">
                {
                    companyDetails.companyTags != null && companyDetails.companyTags.map((tag, index) => {
                        return (
                            <div key={tag + index.toString()} className=" flex gap-3 justify-center items-center flex-row px-6 py-2 text-sm text-tan bg-blue rounded-full">
                                {tag}

                            </div>
                        )
                    })
                }
            </div>

            <textarea rows={companyDetails.companyDescription != null ? companyDetails.companyDescription.split("\n").length : 0} id="no_scroll" value={companyDetails.companyDescription} disabled={true} className="resize-none h-96 text-black text-md bg-transparent w-full font-regular mt-4 px-12 mb-10" />

            {
                allJobsPostedByCompany.length != 0 &&
                <div className="mt-10 ml-12 text-2xl text-black font-['Inter'] font-bold underline">Careers</div>

            }

            <div className="mx-12 mt-4 w-[70%] flex flex-col justify-start items-start gap-3 mb-10">
                {
                    allJobsPostedByCompany.map((jobData,index) => {
                        var currentDate=new Date().getTime();
                        var postedDate=jobData.time.toDate().getTime();
                        var difference = currentDate-postedDate;
                        let daysDiff = Math.floor(difference / (1000 * 3600 * 24));
                        var finalDifferenceText="Posted "+daysDiff.toString()+" day(s) ago";
                        if(daysDiff==0){
                            var hourDiff=Math.floor(difference / (1000 * 3600));
                            finalDifferenceText="Posted "+hourDiff.toString()+" hour(s) ago";
                            if(hourDiff==0){
                                var minuteDiff=Math.floor(difference / (1000 * 60));
                                finalDifferenceText="Posted "+minuteDiff.toString()+" minute(s) ago";   
                            }
                        }
   
                        return (
                            <button key={index} onClick={() => { navigateToApplyPage(jobData.id!) }} className="text-black hover:text-tan text-left w-full border-2 rounded-xl hover:bg-blue border-black flex flex-row justify-between items-center p-4">
                                <div className="flex flex-col justify-start items-start">
                                    <div className="text-2xl font-bold">{jobData.jobTitle}</div>
                                    <div className="text-[12px] ml-[1px] font-regular">{finalDifferenceText}</div>
                                </div>
                                <div className="flex flex-col justify-center h-full items-end gap-1">
                                    <div className="flex flex-row justify-center items-center gap-1">
                                        <div className="text-sm">{jobData.location}</div>
                                    </div>
                                    <div className="flex flex-row justify-center items-center gap-1">
                                        <div className="text-sm">{jobData.jobType}, {jobData.workModel}</div>
                                    </div>
                                </div>
                            </button>
                        )
                    })
                }
            </div>



        </PublicFacingLayout>



    );
}

export default CompanyProfilePage;