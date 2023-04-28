import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { Heading, SubHeading } from "../../../standards/styles/components/heading";
import { selectedCompanyAtom } from "../atoms/selectedCompany";
import { Dropdown, MenuProps, Space } from "antd";
import { ButtonOutlinedWhite, StandardWhiteButton } from "../../../standards/styles/components/button";
import { BiEdit, BiLinkExternal } from "react-icons/bi";
import { MdEditNote } from "react-icons/md";


function SelectedCompanyDetails() {

  const [selectedCompany, setSelectedCompany] = useRecoilState(selectedCompanyAtom);
  const navigate = useNavigate();


  return (
    selectedCompany.id == null ?

      <div id="no_scroll" className="flex justify-center items-center h-full w-full">
        <div className="text-blue text-md text-center">Select a company profile to see details</div>
      </div> :

      <div id="no_scroll" className="flex-1 flex-col justify-start items-start w-full h-full rounded-md overflow-y-scroll">

        <div style={{ backgroundImage: `url('${selectedCompany.companyCover}')` }} className="h-72 w-full bg-blue bg-cover bg-center"></div>

        <div style={{ backgroundImage: `url('${selectedCompany.companyLogo}')` }} className="h-36 w-36 bg-transparent rounded-md ml-10 -mt-24 bg-cover bg-center"></div>


        <div className="text-black flex justify-start items-start px-10 py-5 flex-col">
          <div className="font-semibold text-4xl">
            {selectedCompany.companyName}
          </div>

          <div className="text-dark-gray text-sm mt-2">
            {selectedCompany.companyLocation}
          </div>

          <div className="text-dark-gray text-sm">
            {selectedCompany.numberOfEmployees} Employees
          </div>


          <div className="flex flex-row justify-start items-start mt-5 gap-3">
            <StandardWhiteButton text="Company Profile Page" icon={<BiLinkExternal />} />
            <StandardWhiteButton text="Edit" icon={<MdEditNote />} />
          </div>

          <div className="font-medium text-2xl mt-10">
            About
          </div>



          <SubHeading customStyles="mt-2" text={selectedCompany.companyDescription}></SubHeading>


        </div>


      </div>
  );
}

export default SelectedCompanyDetails;