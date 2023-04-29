import { Heading, SubHeading } from "../../../standards/styles/components/heading";
import SimpleInput, { TextArea } from "../../../standards/styles/components/inputs";
import FormLayout from "../../../standards/styles/layouts/FormLayout";
import PageLayout from "../../../standards/styles/layouts/pageLayout";
import { useState, useEffect } from "react";
import CompanyBanner from "../components/companyBanner";
import CompanyLogo from "../components/companyLogo";
import { AiFillPlusCircle, AiFillPlusSquare } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { MdCancel } from "react-icons/md"
import { ButtonOutlinedBlue, ButtonSolid, StandardBlueButton, StandardLightBlueButton, StandardWhiteButton } from "../../../standards/styles/components/button";
import { CompanyInformation, useHandleAddCompany } from "../logic/addCompany";
import { CompanyDataInterface } from "../../../standards/interfaces/interfaces";
import currentRouteAtom from "../../../atoms/app/currentRouteAtom";
import { useRecoilState } from "recoil";
import { BiPlus } from "react-icons/bi";


function AddNewCompany() {

    const [companyName, setcompanyName] = useState("" as string);
    const [companyLogo, setcompanyLogo] = useState("" as string);
    const [companyDescription, setcompanyDescription] = useState("" as string);
    const [companyCoverImage, setcompanyCoverImage] = useState("" as string);
    const [companyTagValue, setcompanyTagValue] = useState("" as string);
    const [companyTags, setcompanyTags] = useState([] as Array<string>);
    const [numberOfEmployees, setnumberOfEmployees] = useState("" as string);
    const [companyLocation, setcompanyLocation] = useState("" as string);
    const { AddCompany } = useHandleAddCompany();

    const [currentRoute, setCurrentRoute] = useRecoilState(currentRouteAtom);
    useEffect(() => {
        setCurrentRoute("Companies > New Company");
    }, []);

    const AddCompanyTag = () => {
        if (companyTagValue.trim() == "") {
            toast.error("Please enter a valid tag");
        }
        else {
            setcompanyTags([...companyTags, companyTagValue]);
        }
    }

    const RemoveTag = (indexToRemove: number) => {
        setcompanyTags((tags) =>
            tags.filter((tag, index) => index !== indexToRemove)
        );
    }


    return (
        <FormLayout>

            <div className="p-10 w-full flex-1 flex-col justify-start items-start ">


                <div className="flex flex-row justify-start items-start gap-3">
                    <StandardWhiteButton text="Add Company Logo" icon={<BiPlus />} onClick={() => { }}></StandardWhiteButton>
                    <StandardWhiteButton text="Add Company Logo" icon={<BiPlus />} onClick={() => { }}></StandardWhiteButton>
                </div>

                {/* <SubHeading text="Add Company Logo*" customStyles="mt-12 text-sm" />
                <CompanyLogo companyLogoValue={companyLogo} setCompanyLogo={setcompanyLogo} /> */}


                <SimpleInput placeholder="Company Name*" onChange={setcompanyName} value={companyName} customStyles="mt-10" />
                <TextArea examples="We make great software" placeholder="Enter company description*" onChange={setcompanyDescription} value={companyDescription} customStyles="mt-10" />

                <SimpleInput examples="Texas, US" value={companyLocation} onChange={setcompanyLocation} placeholder="Location*" customStyles="mt-10" />
                <SimpleInput examples="5" value={numberOfEmployees} onChange={setnumberOfEmployees} placeholder="Number of Employees*" customStyles="mt-10" />


                <div className="flex flex-row justify-start items-end w-full mt-10">
                    <SimpleInput examples="Software Services, IT, Sales etc" value={companyTagValue} onChange={setcompanyTagValue} placeholder="Add a Company Tag*" customStyles="w-96" />
                    <button className="mb-3" onClick={AddCompanyTag}>
                        <AiFillPlusCircle className="text-blue/90 transition-all duration-75 ease-in-out hover:text-blue h-12 w-12 ml-5" />
                    </button>
                </div>

                <div className="flex flex-wrap w-full justify-start items-start mb-10 mt-5 gap-2">
                    {
                        companyTags.map((tag, index) => {
                            return (
                                <div key={tag + index.toString()} className="flex gap-3 justify-center border-[1px] border-black items-center flex-row px-6 py-2 text-sm text-black bg-white shadow-md rounded-full">
                                    {tag}
                                    <button onClick={() => { RemoveTag(index) }}>
                                        <MdCancel className="text-black h-5 w-5" />
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>



                <div className="flex flex-row justify-end items-end w-full mb-12">
                    <StandardBlueButton icon={<BiPlus></BiPlus>} text="Add Company" onClick={() => {
                        AddCompany({
                            companyCover: companyCoverImage,
                            companyDescription: companyDescription,
                            companyLocation: companyLocation,
                            companyLogo: companyLogo,
                            companyName: companyName,
                            companyTags: companyTags,
                            numberOfEmployees: numberOfEmployees
                        } as CompanyDataInterface)
                    }} />
                </div>


            </div>

        </FormLayout>
    );
}

export default AddNewCompany;