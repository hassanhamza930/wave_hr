import { Heading, SubHeading } from "../../../standards/styles/components/heading";
import SimpleInput, { TextArea } from "../../../standards/styles/components/inputs";
import FormLayout from "../../../standards/styles/layouts/FormLayout";
import PageLayout from "../../../standards/styles/layouts/pageLayout";
import { useState, useEffect } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { MdCancel } from "react-icons/md"
import { ButtonOutlinedBlue, ButtonSolid, StandardBlueButton } from "../../../standards/styles/components/button";
import { CompanyInformation, useHandleAddCompany } from "../../addNewCompany/logic/addCompany";
import CompanyBanner from "../../addNewCompany/components/companyBanner";
import CompanyLogo from "../../addNewCompany/components/companyLogo";
import { useParams } from "react-router";
import { doc, getDoc, getFirestore, onSnapshot } from "firebase/firestore";
import { useRecoilState } from "recoil";
import isLoadingAtom from "../../../atoms/app/isLoadingAtom";
import { useHandleEditCompany } from "../logic/editCompany";
import { CompanyDataInterface } from "../../../standards/interfaces/interfaces";
import { BiPlus } from "react-icons/bi";


function EditCompany(props: any) {

    const [companyName, setcompanyName] = useState("" as string);
    const [companyLogo, setcompanyLogo] = useState("" as string);
    const [companyDescription, setcompanyDescription] = useState("" as string);
    const [companyCoverImage, setcompanyCoverImage] = useState("" as string);
    const [companyTagValue, setcompanyTagValue] = useState("" as string);
    const [companyTags, setcompanyTags] = useState([] as Array<string>);
    const [numberOfEmployees, setnumberOfEmployees] = useState("" as string);
    const [companyLocation, setcompanyLocation] = useState("" as string);
    const [companyWebsite, setcompanyWebsite] = useState("" as string);
    const { EditCompany } = useHandleEditCompany();
    const { companyId } = useParams();
    const [loading, setLoading] = useRecoilState(isLoadingAtom);

    const db = getFirestore();

    const AddCompanyTag = () => {
        if (companyTagValue.trim() == "") {
            toast.error("Kindly enter a valid tag");
        }
        else {
            setcompanyTags([...companyTags, companyTagValue]);
            setcompanyTagValue("");
        }
    }

    const RemoveTag = (indexToRemove: number) => {
        setcompanyTags((tags) =>
            tags.filter((tag, index) => index !== indexToRemove)
        );
    }

    async function FetchCompanyDetails() {
        setLoading(true);
        var companyData: CompanyDataInterface = (await getDoc(doc(db, "companies", companyId as string))).data() as CompanyDataInterface;
        setcompanyCoverImage(companyData.companyCover);
        setcompanyDescription(companyData.companyDescription);
        setcompanyLocation(companyData.companyLocation);
        setcompanyLogo(companyData.companyLogo);
        setcompanyName(companyData.companyName);
        setcompanyTags(companyData.companyTags);
        setnumberOfEmployees(companyData.numberOfEmployees);
        setcompanyWebsite(companyData.companyWebsite!);
        setLoading(false);

    }


    useEffect(() => {
        FetchCompanyDetails();
    }, [])


    return (
        <FormLayout>
            <div className="p-10 w-full flex-1 flex-col justify-start items-start ">


                <SubHeading text="Add Company Banner" customStyles=" text-sm" />
                <CompanyBanner companyBannerValue={companyCoverImage} setCompanyBanner={setcompanyCoverImage} customStyles="mt-2" />


                <SubHeading text="Add Company Logo*" customStyles="mt-12 text-sm" />
                <CompanyLogo companyLogoValue={companyLogo} setCompanyLogo={setcompanyLogo} />


                <SimpleInput placeholder="Company Name*" onChange={setcompanyName} value={companyName} customStyles="mt-10" />
                <TextArea examples="We make great software" placeholder="Enter company description*" onChange={setcompanyDescription} value={companyDescription} customStyles="mt-10" />

                <SimpleInput examples="Texas, US" value={companyLocation} onChange={setcompanyLocation} placeholder="Location*" customStyles="mt-10" />
                <SimpleInput examples="5" value={numberOfEmployees} onChange={setnumberOfEmployees} placeholder="Number of Employees*" customStyles="mt-10" />
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
                    <StandardBlueButton text="Update Company" onClick={() => {
                        EditCompany({
                            id: companyId as string,
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
                    }} />
                </div>


            </div>

        </FormLayout>
    );
}

export default EditCompany;