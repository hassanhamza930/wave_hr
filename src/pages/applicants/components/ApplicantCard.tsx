import React from "react";
import { useRecoilState } from "recoil";
import { JobApplication } from "../../apply/atoms/applyPageAtoms";
import { selectedApplicantIdAtom } from "../atoms/applicantsAtoms";

function ApplicantCard({ applicant }: any) {
  return (
    <div>
      <button
        className={`hover:bg-blue hover:text-tan mt-3 w-full gap-4 ${
          applicant.rating == null
            ? "bg-blue text-tan "
            : "bg-black/90 shadow-md border-black/10  text-tan"
        }  rounded-md my-1 flex w-full flex-row justify-start items-center p-3`}
      >
        <div
          style={{
            backgroundImage: `url('${applicant.profilePicture}')`,
          }}
          className="bg-cover bg-center h-12 w-12 bg-blue rounded-md"
        ></div>

        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-col w-full justify-center items-start pr-2">
            <div className="text-md font-bold ">{applicant.name}</div>
            <div className="text-md">{applicant.email}</div>
          </div>

          <div className=" w-full h-full flex justify-end flex-row pr-3 gap-3 items-center">
            {/* <div className='hidden 2xl:flex px-4 py-2 text-black text-[12px] rounded-full bg-tan/90'>{applicant.applicationStatus}</div> */}
            <div className="px-4 py-2 text-blue text-sm font-bold rounded-md bg-tan">
              {applicant.rating != null ? applicant.rating : "Pending Review"}
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

export default ApplicantCard;
