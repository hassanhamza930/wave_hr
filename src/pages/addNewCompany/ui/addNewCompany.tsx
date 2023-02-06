import { Heading, SubHeading } from "../../../standards/styles/components/heading";
import SimpleInput from "../../../standards/styles/components/inputs";
import FormLayout from "../../../standards/styles/layouts/FormLayout";
import PageLayout from "../../../standards/styles/layouts/pageLayout";
import {useState,useEffect} from "react";

function AddNewCompany() {

    const [companyName, setcompanyName] = useState("" as string);
    const [companyLogo, setcompanyLogo] = useState("" as string);
    const [companyDescription, setcompanyDescription] = useState("" as string);
    const [companyCoverImage, setcompanyCoverImage] = useState("" as string);

    return (
        <PageLayout>
            <FormLayout>
                <Heading text="Add a new company profile" />
                <SubHeading text="Setup a company profile and start posting jobs." customStyles="mt-2" />

                <SimpleInput placeholder="Enter company name" onChange={setcompanyName} value={companyName} customStyles="mt-10"/>

            </FormLayout>
        </PageLayout>
    );
}

export default AddNewCompany;