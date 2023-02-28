import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { ApplicationDataInterface } from "../../../standards/interfaces/interfaces";
import { JobApplication } from "../../apply/atoms/applyPageAtoms";
import { selectedApplicantIdAtom } from "../atoms/applicantsAtoms";

function ApplicantCard(props: ApplicationDataInterface) {

  const [selectedApplicantId, setSelectedApplicantId] = useRecoilState(selectedApplicantIdAtom);


  useEffect(()=>{
    console.log(props.name);
  },[])

  return (
      <button
      onClick={()=>{setSelectedApplicantId(props.id!)}}
        className={`hover:bg-blue bg-black text-tan hover:text-tan mt-3 gap-4 rounded-md my-1 flex w-full flex-row justify-start items-center p-3`}
      >
        <div
          style={{
            backgroundImage: `url('${props.profilePicture}')`,
          }}
          className="bg-cover bg-center h-12 w-12 bg-blue rounded-md"
        ></div>

        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-col w-full justify-center items-start pr-2">
            <div className="text-md font-bold ">{props.name}</div>
            <div className="text-md">{props.email}</div>
          </div>

          <div className=" w-full h-full flex justify-end flex-row pr-3 gap-3 items-center">
            <div className="px-4 py-2 text-blue text-sm font-bold rounded-md bg-tan">
              {props.rating != 0 ? props.rating : "Pending Review"}
            </div>
          </div>
        </div>
      </button>
  );
}

export default ApplicantCard;
