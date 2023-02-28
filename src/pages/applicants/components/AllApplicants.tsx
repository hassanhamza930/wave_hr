import { useState, useEffect, Fragment } from "react";
import { JobApplication } from "../../apply/atoms/applyPageAtoms";
import { useParams } from "react-router";
import { useRecoilState } from "recoil";
import { selectedApplicantIdAtom } from "../atoms/applicantsAtoms";
import { Menu, Transition } from "@headlessui/react";
import { AiFillCaretDown } from "react-icons/ai";
import { dropDownItems } from "../../../standards/HardcodedLists";
import getCurrentJobApplications from "../logic/getCurrentJobApplications";
import ApplicantCard from "./ApplicantCard";
import { ApplicationDataInterface, JobDataInterface } from "../../../standards/interfaces/interfaces";
import { selectedJobAtom } from "../../jobs/jobsAtoms";
import { selectedCompanyAtom } from "../../jobs/atoms/selectedCompanyAtom";



export default function AllApplicants() {
  const [applicants, setApplicants] = useState<Array<JobApplication>>([]);
  const [jobDetails, setJobDetails] = useState<JobDataInterface>({} as JobDataInterface);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedJob, setSelectedJob] = useRecoilState(selectedJobAtom);
  const [selectedCompany, setSelectedCompany] = useRecoilState(selectedCompanyAtom);
  const { jobId } = useParams();
  const [selectedApplicantId, setSelectedApplicantId] = useRecoilState(selectedApplicantIdAtom);



  useEffect(() => {
    getCurrentJobApplications(setApplicants,jobId as string,searchValue);
  }, [searchValue]);



  return (
    <div
      id="no_scroll"
      className="h-full 2xl:w-[40%] w-2/4 rounded-md pr-10 flex flex-col justify-start items-start">


        <div className="flex flex-row justify-center items-center gap-2 text-sm  mb-10">
          <div className="text-black/70">{selectedCompany.companyName}</div>
          {"  >  "}
          <div className="text-black/80">{selectedJob.jobTitle}</div>
          {"  >  "}
          <div className="text-black/90">Applicants</div>

        </div>

      <div className="text-black text-md mb-2 ml-1">
        Seeing Applicants for <br></br>
        <div className="font-bold text-4xl">{selectedJob.jobTitle}</div>
        <div className="mt-2 font-bold text-black text-3xl mb-5">
          {jobDetails.companyId != null && jobDetails.jobTitle}
        </div>
      </div>

      <input
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        placeholder="Search"
        className="w-full font-medium border-b-2 shadow-md mb-10 text-sm border-blue text-black bg-transparent outline-0 px-2 py-1 mt-3 flex justify-center items-center"></input>


      <div
        id="no_scroll"
        className="w-full flex-col justify-start items-center overflow-y-scroll px-2">

        <>
          {applicants?.map((applicantData: ApplicationDataInterface, index) => {
            return(
              <ApplicantCard {...applicantData} />
            )
          })}

          {applicants.length == 0 && (
            <div className="font-bold text-md text-black/90 mt-3">
              No Applicants Yet
            </div>
          )}
        </>

      </div>
    </div>
  );
}
