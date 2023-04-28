import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { Heading } from "../../../standards/styles/components/heading";
import { selectedCompanyAtom } from "../atoms/selectedCompany";
import { Dropdown, MenuProps, Space } from "antd";
import { ButtonOutlinedWhite } from "../../../standards/styles/components/button";


function SelectedCompanyDetails() {

  const [selectedCompany, setSelectedCompany] = useRecoilState(selectedCompanyAtom);
  const navigate = useNavigate();




  return (
    selectedCompany.id == null ?

      <div id="no_scroll" className="relative flex justify-center items-center h-full rounded-md mb-10 w-full overflow-y-scroll">
        <div className="text-blue text-md">Select a company profile to see details</div>
      </div> :

      <div id="no_scroll" className="w-full h-[90%] mt-10 bg-black rounded-md overflow-y-scroll">

        <div style={{ backgroundImage: `url('${selectedCompany.companyCover}')` }} className="h-72 w-full bg-blue bg-cover bg-center bg-[url('https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/61a77a4a6e46e5363fbbde1d_purple-pink.png')]"></div>
        <div style={{ backgroundImage: `url('${selectedCompany.companyLogo}')` }} className="border-2 border-black h-36 w-36 shadow-2xl bg-transparent rounded-md ml-10 -mt-24 bg-cover bg-center bg-[url('https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/61a77a4a6e46e5363fbbde1d_purple-pink.png')]"></div>

        <div className="relative text-tan text-4xl px-10 pt-5 w-full flex flex-row justify-between items-start">

          <div className="font-bold">
            {selectedCompany.companyName}
          </div>


          <div className="flex flex-col justify-start items-end gap-2">
            <ButtonOutlinedWhite text="Edit" onClick={() => {navigate("/editCompany/" + selectedCompany.id)}} />
            <ButtonOutlinedWhite onClick={() => {navigate("/company/" + selectedCompany.id)}} customStyles="ml-2" text="Company Page" />
          </div>


        </div>

        <div className="text-tan text-sm px-10 mt-2">
          {selectedCompany.companyLocation}
        </div>

        <div className="text-tan text-sm px-10 mt-0">
          {selectedCompany.numberOfEmployees} Employees
        </div>

        <div className="text-tan text-sm font-regular px-10 mt-5 mb-5 gap-2 w-full flex justify-start items-start">
          {selectedCompany.companyTags.map((tag) => {
            return <div className="px-4 py-2 rounded-full bg-tan text-black text-sm">
              {tag}
            </div>
          })}
        </div>

          <div className="text-xl font-bold text-tan ml-10">Company Description</div>
        <textarea rows={selectedCompany.companyDescription.split("\n").length} id="no_scroll" value={selectedCompany.companyDescription} disabled={true} className="resize-none h-96 text-tan text-md bg-transparent w-full font-regular mt-2 px-10 mb-10">
        </textarea>









      </div>
  );
}

export default SelectedCompanyDetails;