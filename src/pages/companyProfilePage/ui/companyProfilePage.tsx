import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useRecoilState } from "recoil";
import isLoadingAtom from "../../../atoms/app/isLoadingAtom";
import { CompanyDataInterface } from "../../../standards/interfaces/interfaces";
import { Heading, SubHeading } from "../../../standards/styles/components/heading";
import FormLayout from "../../../standards/styles/layouts/FormLayout";
import PageLayout from "../../../standards/styles/layouts/pageLayout";
import PublicFacingLayout from "../../../standards/styles/layouts/PublicFacingLayout";
import CompanyBanner from "../../addNewCompany/components/companyBanner";
import { CompanyData } from "../../apply/ui/apply";

function CompanyProfilePage() {

    const { companyId } = useParams();
    const [companyDetails, setcompanyDetails] = useState<CompanyDataInterface>({} as CompanyDataInterface);
    const db = getFirestore();
    const [loading, setLoading] = useRecoilState(isLoadingAtom);

    async function fetchCompanyDetails() {
        setLoading(true);
        var data: CompanyDataInterface = (await getDoc(doc(db, "companies", companyId as string))).data() as CompanyDataInterface;
        setcompanyDetails(data);
        setLoading(false);
    }


    useEffect(() => {
        fetchCompanyDetails();
    }, [])

    return (
            <PublicFacingLayout>

                <div style={{ backgroundImage: `url('${companyDetails.companyCover == "" ? "https://assets-global.website-files.com/5c7fdbdd4e3feeee8dd96dd2/62c4ff55b8637de51557f5f0_growth-flat-color.gif" : companyDetails.companyCover}')` }} className={`  w-full h-72 bg-blue bg-cover shadow-xl bg-center rounded-md flex justify-end items-end p-10`}>
                    <div className="flex flex-row justify-end items-center">
                    </div>
                </div>

                <div
                    style={{ backgroundImage: `url('${companyDetails.companyLogo}')` }}
                    className=" bg-contain bg-no-repeat bg-transparent bg-center -mt-24 ml-12 h-36 w-36 rounded-xl flex justify-center items-center">
                </div>

                <Heading text={companyDetails.companyName} customStyles="mt-4 ml-12"></Heading>

                <div className="text-black text-sm mt-2 ml-12">
                    {companyDetails.companyLocation}
                </div>

                <div className="text-black text-sm mt-0 ml-12">
                    {companyDetails.numberOfEmployees} Employees
                </div>

                <div className="ml-12 mt-5 flex flex-row gap-2 justify-start items-start">
                    {
                        companyDetails.companyTags!=null&&companyDetails.companyTags.map((tag, index) => {
                            return (
                                <div key={tag + index.toString()} className=" flex gap-3 justify-center items-center flex-row px-6 py-2 text-sm text-tan bg-blue rounded-full">
                                    {tag}

                                </div>
                            )
                        })
                    }
                </div>

                <SubHeading text={companyDetails.companyDescription} customStyles="ml-12 mt-10"/>

                <div className="mt-10 ml-12 text-2xl text-black font-['Inter'] font-bold">Careers</div>
                


                

            </PublicFacingLayout>
               


    );
}

export default CompanyProfilePage;