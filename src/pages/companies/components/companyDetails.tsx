import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { Heading } from "../../../standards/styles/components/heading";
import { selectedCompanyAtom } from "../atoms/selectedCompany";
import { Dropdown, MenuProps, Space } from "antd";
import { ButtonOutlinedWhite } from "../../../standards/styles/components/button";


function CompanyDetails() {

  const [selectedCompany, setSelectedCompany] = useRecoilState(selectedCompanyAtom);
  const navigate = useNavigate();




  return (
    selectedCompany.id == null ?

      <div id="no_scroll" className="relative flex justify-center items-center h-full rounded-md mb-10 w-full overflow-y-scroll">
        <div className="text-blue text-md">Select a company profile to see details</div>
      </div> :

      <div id="no_scroll" className="w-full h-[90%] mt-10 bg-black rounded-md overflow-y-scroll">

        <div style={{ backgroundImage: `url('${selectedCompany.companyCover}')` }} className="h-72 w-full bg-blue bg-cover bg-center bg-[url('https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/61a77a4a6e46e5363fbbde1d_purple-pink.png')]"></div>
        <div style={{ backgroundImage: `url('${selectedCompany.companyLogo}')` }} className="h-36 w-36 bg-blue rounded-md ml-10 -mt-24 bg-cover bg-center bg-[url('https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/61a77a4a6e46e5363fbbde1d_purple-pink.png')]"></div>

        <div className="relative text-tan text-4xl px-10 pt-5 w-full flex flex-row justify-between items-center">

          <div className="font-bold">
            {selectedCompany.companyName}
          </div>

          {/* <Menu>
            <Menu.Button className="text-tan hover:scale-105">
              <BsThreeDots size={30} />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute -mb-24 mr-10 justify-center right-0 w-48 origin-top-right divide-y rounded-md divide-gray-100 bg-tan shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => { }}
                        className={`${active ? 'bg-secondary text-black' : 'text-gray-900'} group font-regular flex w-full items-center justify-start outline-none hover:bg-purp hover:text-tan  px-4 py-2 text-sm`}>
                        Copy Company Link
                      </button>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => { navigate("/editCompany/" + selectedCompany.id) }}
                        className={`${active ? 'bg-secondary text-black' : 'text-gray-900'} group font-regular flex w-full items-center justify-start outline-none hover:bg-purp hover:text-tan  px-4 py-2 text-sm`}>
                        Edit
                      </button>
                    )}
                  </Menu.Item>


                </div>
              </Menu.Items>
            </Transition>

          </Menu> */}

          <div className="flex flex-row justify-start items-start">
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

        <div className="text-tan text-sm font-regular px-10 mt-5 mb-10 gap-2 w-full flex justify-start items-start">
          {selectedCompany.companyTags.map((tag) => {
            return <div className="px-4 py-2 rounded-full bg-tan text-blue text-sm">
              {tag}
            </div>
          })}
        </div>

        <div className="text-tan text-md font-regular px-10 mt-2 mb-10">
          {selectedCompany.companyDescription}Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

          Why do we use it?
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).


          Where does it come from?
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

          The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
        </div>









      </div>
  );
}

export default CompanyDetails;