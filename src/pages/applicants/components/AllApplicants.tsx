import { useState, useEffect, Fragment } from "react";
import { JobApplication } from "../../apply/atoms/applyPageAtoms";
import { JobData, JobPosting } from "../../jobs/components/JobCard";
import { useParams } from "react-router";
import { useRecoilState } from "recoil";
import { selectedApplicantIdAtom } from "../atoms/applicantsAtoms";
import { Menu, Transition } from "@headlessui/react";
import { AiFillCaretDown } from "react-icons/ai";
import getJob from "../logic/getJob";
import { dropDownItems } from "../../../standards/HardcodedLists";
import getCurrentJobApplications from "../logic/getCurrentJobApplications";
import getAllJobApplications from "../logic/getAllJobApplication";
import ApplicantCard from "./ApplicantCard";
export default function AllApplicants() {
  const [applicants, setApplicants] = useState<Array<JobApplication>>([]);
  // const [allApplicants, setAllApplicants] = useState<Array<JobApplication>>([]);
  const [jobDetails, setJobDetails] = useState<JobData>({} as JobData);
  const [searchValue, setSearchValue] = useState<string>("");
  const { jobId } = useParams();
  const [dropDown, setDropDown] = useState(dropDownItems[0]);
  const [selectedApplicantId, setSelectedApplicantId] = useRecoilState(
    selectedApplicantIdAtom
  );

  useEffect(() => {
    getJob(setJobDetails, jobId!);
  }, []);

  useEffect(() => {
    if (dropDown === "All applications") {
      getCurrentJobApplications(setApplicants, jobId!, searchValue);
    } else {
      getAllJobApplications(setApplicants, jobId!, searchValue);
    }
  }, [searchValue, dropDown]);

  const handleMenuSelection = (di: string) => {
    setDropDown(di);
  };

  function handleSelectAllApplicant(applicant: JobApplication) {
    setSelectedApplicantId(applicant?.id as string);
  }
  function handleSelectApplicant(applicant: string) {
    setSelectedApplicantId(applicant as string);
  }

  return (
    <div
      id="no_scroll"
      className="h-full w-[39%] rounded-md p-5 flex flex-col justify-start items-start"
    >
      <div className="text-black text-md mt-5 mb-2 ml-1">
        Seeing Applicants for{" "}
        <div className="mt-2 font-bold text-black text-3xl mb-5">
          {jobDetails.jobData != null && jobDetails.jobData.jobDetails.jobTitle}
        </div>
      </div>

      <input
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        placeholder="Search"
        className="w-full font-medium border-b-2 shadow-md mb-10 text-sm border-blue text-black bg-transparent outline-0 px-2 py-1 mt-3 flex justify-center items-center"
      ></input>

      <div className="bg-blue rounded-lg ml-2">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md bg-blue px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              {dropDown}
              <AiFillCaretDown
                className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute mt-2 w-60    origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {dropDownItems.map((di, index) => {
                return (
                  <Menu.Item>
                    {({ active }) => {
                      return (
                        <div className="">
                          <button
                            key={index}
                            onClick={() => handleMenuSelection(di)}
                            className={`${
                              active ? "bg-blue text-white" : "text-gray-900"
                            } flex w-full font-normal text-sm rounded-md px-2 py-[10px]`}
                          >
                            {di}
                          </button>
                        </div>
                      );
                    }}
                  </Menu.Item>
                );
              })}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <div
        id="no_scroll"
        className="w-full flex-col justify-start items-center overflow-y-scroll px-2"
      >
        <>
          {applicants?.map((applicant: JobApplication, index) => {
            if (dropDown === "All applications") {
              return (
                <div onClick={() => handleSelectAllApplicant(applicant)}>
                  <ApplicantCard key={index} applicant={applicant} />
                </div>
              );
            } else if (dropDown === "Pending Review") {
              return (
                applicant[1]?.rejected === false &&
                (applicant[1]?.rating === undefined ||
                  applicant[1]?.rating === null) && (
                  <div onClick={() => handleSelectApplicant(applicant[0])}>
                    <ApplicantCard key={index} applicant={applicant[1]} />
                  </div>
                )
              );
            } else if (dropDown === "Interview Invite Pending") {
              return (
                applicant[1]?.applicationStatus ===
                  "Interview Invite Pending" &&
                applicant[1]?.rejected === false && (
                  <div onClick={() => handleSelectApplicant(applicant[0])}>
                    <ApplicantCard key={index} applicant={applicant[1]} />
                  </div>
                )
              );
            } else if (dropDown === "Interview Invite Sent") {
              return (
                applicant[1]?.applicationStatus === "Interview Invite Sent" &&
                applicant[1]?.rejected === false && (
                  <div onClick={() => handleSelectApplicant(applicant[0])}>
                    <ApplicantCard key={index} applicant={applicant[1]} />
                  </div>
                )
              );
            } else if (dropDown === "Interview Done") {
              return (
                applicant[1]?.applicationStatus === "Interview Done" &&
                applicant[1]?.rejected === false && (
                  <div onClick={() => handleSelectApplicant(applicant[0])}>
                    <ApplicantCard key={index} applicant={applicant[1]} />
                  </div>
                )
              );
            } else if (dropDown === "Didn't show up for interview") {
              return (
                applicant[1]?.applicationStatus ===
                  "Didn't show up for interview" &&
                applicant[1]?.rejected === false && (
                  <div onClick={() => handleSelectApplicant(applicant[0])}>
                    <ApplicantCard key={index} applicant={applicant[1]} />
                  </div>
                )
              );
            } else if (dropDown === "Accepted applications") {
              return (
                applicant[1]?.applicationStatus === "Accepted" &&
                applicant[1]?.rejected === false && (
                  <div onClick={() => handleSelectApplicant(applicant[0])}>
                    <ApplicantCard key={index} applicant={applicant[1]} />
                  </div>
                )
              );
            } else if (dropDown === "Rejected applications") {
              return (
                applicant[1]?.rejected === true && (
                  <div onClick={() => handleSelectApplicant(applicant[0])}>
                    <ApplicantCard key={index} applicant={applicant[1]} />
                  </div>
                )
              );
            }
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
