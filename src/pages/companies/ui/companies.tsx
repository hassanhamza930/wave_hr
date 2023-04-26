import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { ButtonOutlinedBlue, ButtonOutlinedWhite, ButtonSolid } from "../../../standards/styles/components/button";
import { Heading, SubHeading } from "../../../standards/styles/components/heading";
import PageLayout from "../../../standards/styles/layouts/pageLayout";
import { selectedCompanyAtom } from "../atoms/selectedCompany";
import AllCompaniesPostedByUser from "../components/allCompaniesPostedByUser";
import CompanyDetails from "../components/companyDetails";
import TwoColumnLayoutPage from "../../../standards/styles/layouts/twoColumnLayout";

function Companies() {
    const navigate = useNavigate();


    useEffect(() => {
    }, [])

    return (
        <TwoColumnLayoutPage

            component1={
                <div className="w-full bg-transparent backdrop-blur-xl rounded-xl flex flex-col justify-start items-start gap-10">
                    {
                        [1, 2, 3, 4, 5].map((item) => {
                            return (
                                <div className="h-96 w-full bg-blue/20 backdrop-blur-xl rounded-xl"></div>
                            )
                        })
                    }
                </div>
            }

            component2={
                <div className="w-full bg-transparent backdrop-blur-xl rounded-xl flex flex-col justify-start items-start gap-10">
                    {
                        [1, 2, 3, 4, 5].map((item) => {
                            return (
                                <div className="h-96 w-full bg-blue/50 backdrop-blur-xl rounded-xl"></div>
                            )
                        })
                    }
                </div>
            }
        />
    );
}

export default Companies;