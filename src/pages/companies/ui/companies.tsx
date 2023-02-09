import { useNavigate } from "react-router";
import { ButtonOutlinedBlue, ButtonOutlinedWhite, ButtonSolid } from "../../../standards/styles/components/button";
import { Heading, SubHeading } from "../../../standards/styles/components/heading";
import PageLayout from "../../../standards/styles/layouts/pageLayout";
import AllCompaniesPostedByUser from "../components/allCompaniesPostedByUser";
import CompanyDetails from "../components/companyDetails";

function Companies() {
    const navigate = useNavigate();

    return (
        <PageLayout>

            <div className="flex h-full flex-row justify-start items-start gap-5">

                <div className="w-2/4 pr-20">
                    <Heading text="All Companies" />
                    <SubHeading text="Setup company profiles to start hiring." customStyles="mt-2" />
                    <AllCompaniesPostedByUser />
                    <ButtonOutlinedBlue text="Add Company" onClick={() => { navigate("/addNewCompany") }} customStyles="mt-5 mb-24" />

                </div>

                <div className="w-2/4 h-full">
                    <CompanyDetails/>
                </div>


            </div>


        </PageLayout>
    );
}

export default Companies;