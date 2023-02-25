import { Heading, SubHeading } from "../../../standards/styles/components/heading";
import SimpleInput, { TextArea } from "../../../standards/styles/components/inputs";
import FormLayout from "../../../standards/styles/layouts/FormLayout";
import PageLayout from "../../../standards/styles/layouts/pageLayout";
import { useState, useEffect } from "react";
import CompanyBanner from "../components/companyBanner";
import PublicFacingPageLayout, { PublicFacingPageLayoutWhite } from "../../../standards/styles/layouts/publicFacingPageLayout";
import CompanyLogo from "../components/companyLogo";
import { AiFillPlusCircle, AiFillPlusSquare } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { MdCancel } from "react-icons/md"
import { ButtonOutlinedBlue, ButtonSolid } from "../../../standards/styles/components/button";
import { CompanyInformation, useHandleAddCompany } from "../logic/addCompany";
import { CompanyDataInterface } from "../../../standards/interfaces/interfaces";


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



    const AddCompanyTag = () => {
        if (companyTagValue.trim() == "") {
            toast.error("Kindly enter a question");
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
        <PageLayout>
            <FormLayout>

                <Heading text="Add a new company profile" />
                <SubHeading text="Setup a company profile and start posting jobs." customStyles="mt-2" />

                <SubHeading text="Add a Company Banner (Optional)" customStyles="mt-12 text-sm" />
                <CompanyBanner companyBannerValue={companyCoverImage} setCompanyBanner={setcompanyCoverImage} customStyles="mt-2" />

                <SubHeading text="Add Company Logo*" customStyles="mt-12 text-sm" />
                <CompanyLogo companyLogoValue={companyLogo} setCompanyLogo={setcompanyLogo} />

                <SimpleInput placeholder="Enter company name*" onChange={setcompanyName} value={companyName} customStyles="mt-10" />
                <TextArea placeholder="Enter company description*" onChange={setcompanyDescription} value={companyDescription} customStyles="mt-10" />


                <div className="flex flex-row justify-start items-end w-full mt-10">
                    <SimpleInput value={companyTagValue} onChange={setcompanyTagValue} placeholder="Add a Company Tag, ex Consulting, Software Services*" customStyles="" />
                    <button onClick={AddCompanyTag}>
                        <AiFillPlusSquare className="text-purp  h-10 w-10 ml-5" />
                    </button>
                </div>

                <div className="flex flex-wrap w-2/5 justify-start items-start mb-10 mt-5 gap-2">
                    {
                        companyTags.map((tag, index) => {
                            return (
                                <div key={tag + index.toString()} className="flex gap-3 justify-center items-center flex-row px-6 py-2 text-sm text-tan bg-blue rounded-full">
                                    {tag}
                                    <button onClick={() => { RemoveTag(index) }}>
                                        <MdCancel className="text-tan h-5 w-5" />
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>

                <SimpleInput value={companyLocation} onChange={setcompanyLocation} placeholder="Location*" customStyles="mt-10" />

                <SimpleInput value={numberOfEmployees} onChange={setnumberOfEmployees} placeholder="Number of Employees*" customStyles="mt-10" />

                <ButtonSolid text="Add Company" onClick={() => {
                    AddCompany({
                        companyCover: companyCoverImage,
                        companyDescription: companyDescription,
                        companyLocation: companyLocation,
                        companyLogo: companyLogo,
                        companyName: companyName,
                        companyTags: companyTags,
                        numberOfEmployees: numberOfEmployees
                    } as CompanyDataInterface)
                }} customStyles="mt-20 mb-96" />

            </FormLayout>
        </PageLayout>
    );
}

export default AddNewCompany;