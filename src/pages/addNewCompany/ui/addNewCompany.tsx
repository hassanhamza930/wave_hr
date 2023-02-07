import { Heading, SubHeading } from "../../../standards/styles/components/heading";
import SimpleInput from "../../../standards/styles/components/inputs";
import FormLayout from "../../../standards/styles/layouts/FormLayout";
import PageLayout from "../../../standards/styles/layouts/pageLayout";
import { useState, useEffect } from "react";
import CompanyBanner from "../components/companyBanner";
import PublicFacingPageLayout, { PublicFacingPageLayoutWhite } from "../../../standards/styles/layouts/publicFacingPageLayout";
import CompanyLogo from "../components/companyLogo";

function AddNewCompany() {

    const [companyName, setcompanyName] = useState("" as string);
    const [companyLogo, setcompanyLogo] = useState("" as string);
    const [companyDescription, setcompanyDescription] = useState("" as string);
    const [companyCoverImage, setcompanyCoverImage] = useState("" as string);

    return (
        <PageLayout>

            <Heading text="Add a new company profile" />
            <SubHeading text="Setup a company profile and start posting jobs." customStyles="mt-2" />

            <SubHeading text="Add a Company Banner (Optional)" customStyles="mt-12 text-sm" />
            <CompanyBanner customStyles="mt-2" />

            <SubHeading text="Add Company Logo" customStyles="mt-12 text-sm" />
            <CompanyLogo/>
            <SimpleInput placeholder="Enter company name" onChange={setcompanyName} value={companyName} customStyles="mt-10" />


        </PageLayout>
    );
}

export default AddNewCompany;