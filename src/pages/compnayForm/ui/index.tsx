import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { BiEditAlt, BiPlus } from "react-icons/bi";
import { AiFillPlusCircle } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { MdCancel } from "react-icons/md"

import { SubHeading } from "../../../standards/styles/components/heading";
import SimpleInput, { NumericInput, TextArea } from "../../../standards/styles/components/inputs";
import FormLayout from "../../../standards/styles/layouts/FormLayout";
import CompanyBanner from "../components/companyBanner";
import CompanyLogo from "../components/companyLogo";
import { StandardBlueButton } from "../../../standards/styles/components/button";
import { useHandleAddCompany, useHandleEditCompany } from "../logic/addCompany";
import { CompanyDataInterface } from "../../../standards/interfaces/interfaces";
import currentRouteAtom from "../../../atoms/app/currentRouteAtom";
import { useLocation } from "react-router";
import RichTextEditor from "../../../standards/styles/components/RichTextEditor";


const CompanyForm = () => {
    const { state } = useLocation()
    const [companyName, setcompanyName] = useState("");
    const [companyLogo, setcompanyLogo] = useState("");
    const [companyDescription, setcompanyDescription] = useState("");
    const [companyCoverImage, setcompanyCoverImage] = useState("");
    const [companyTagValue, setcompanyTagValue] = useState("");
    const [companyTags, setcompanyTags] = useState<string[]>([]);
    const [numberOfEmployees, setnumberOfEmployees] = useState("");
    const [companyLocation, setcompanyLocation] = useState("");
    const [companyWebsite, setcompanyWebsite] = useState("");
    const { AddCompany } = useHandleAddCompany();
    const { EditCompany } = useHandleEditCompany()

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


    useEffect(() => {
        if (state) {
            setcompanyName(state.companyName);
            setcompanyLogo(state.companyLogo);
            setcompanyDescription(state.companyDescription);
            setcompanyCoverImage(state.companyCover);
            setcompanyTags(state.companyTags);
            setnumberOfEmployees(state.numberOfEmployees);
            setcompanyLocation(state.companyLocation);
            setcompanyWebsite(state.companyWebsite);
        }
    }, [])

    const handleSubmit = () => {
        if (state) {
            EditCompany({
                id: state.id as string,
                companyCover: companyCoverImage,
                companyDescription: companyDescription,
                companyLocation: companyLocation,
                companyLogo: companyLogo,
                companyName: companyName,
                companyTags: companyTags,
                numberOfEmployees: numberOfEmployees,
                companyWebsite: companyWebsite,
                companyOwnerId: localStorage.getItem("userId") as string
            } as CompanyDataInterface)
        } else {
            AddCompany({
                companyCover: companyCoverImage,
                companyDescription: companyDescription,
                companyLocation: companyLocation,
                companyLogo: companyLogo,
                companyName: companyName,
                companyTags: companyTags,
                numberOfEmployees: numberOfEmployees,
                companyWebsite: companyWebsite,
                companyOwnerId: localStorage.getItem("userId") as string
            } as CompanyDataInterface)
        }
    }


    return (
        <FormLayout>
            <div className="p-10 w-full flex-1 flex-col justify-start items-start ">

                <SubHeading text="Add Company Banner" customStyles=" text-sm" />
                <CompanyBanner companyBannerValue={companyCoverImage} setCompanyBanner={setcompanyCoverImage} customStyles="mt-2" />


                <SubHeading text="Add Company Logo*" customStyles="mt-12 text-sm" />
                <CompanyLogo companyLogoValue={companyLogo} setCompanyLogo={setcompanyLogo} />


                <SimpleInput examples="Google" placeholder="Company Name*" onChange={setcompanyName} value={companyName} customStyles="mt-10" />
                <RichTextEditor examples="We make great software" placeholder="Enter company description*" onChange={setcompanyDescription} value={companyDescription} customStyles="mt-10" />

                <SimpleInput examples="Texas, US" value={companyLocation} onChange={setcompanyLocation} placeholder="Location*" customStyles="mt-10" />
                <NumericInput examples="5" value={numberOfEmployees} onChange={setnumberOfEmployees} placeholder="Number of Employees*" customStyles="mt-10" />
                <SimpleInput examples="https://www.google.com" value={companyWebsite} onChange={setcompanyWebsite} placeholder="Company Website" customStyles="mt-10" />


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
                    <StandardBlueButton text={state ? "Update Company" : "Add Company"} onClick={handleSubmit} />
                </div>


            </div>

        </FormLayout>
    );
}

export default CompanyForm;