import { useNavigate } from "react-router";
import { ButtonOutlinedBlue, ButtonOutlinedWhite, ButtonSolid } from "../../../standards/styles/components/button";
import { Heading, SubHeading } from "../../../standards/styles/components/heading";
import PageLayout from "../../../standards/styles/layouts/pageLayout";
import AllCompaniesPostedByUser from "../components/allCompaniesPostedByUser";

function Companies() {
    const navigate=useNavigate();

    return ( 
        <PageLayout>
            <Heading text="All Companies"/>
            <SubHeading text="Setup a company profile to start hiring." customStyles="mt-2"/>
            <AllCompaniesPostedByUser/>
            <ButtonOutlinedBlue text="Add Company" onClick={()=>{navigate("/addNewCompany")}} customStyles="mt-5"/>
        </PageLayout>
     );
}

export default Companies;