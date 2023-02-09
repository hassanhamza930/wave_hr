import { collection, getDocs, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { Heading, SubHeading } from "../../../standards/styles/components/heading";
import { CompanyInformation } from "../../addNewCompany/logic/addCompany";


function CompanyCard(companyData: CompanyInformation) {
    return (
        <div className="flex w-full h-full flex-row justify-start items-start">
            <button style={{ backgroundImage: `url('${companyData.companyCover}')` }} className="h-48 w-full hover:scale-[1.02] rounded-md bg-cover bg-center">
                <div className="h-full bg-cover bg-center bg-black/[95%] backdrop-hue-rotate-90 text-tan w-full rounded-md flex flex-1 flex-row justify-between items-center p-5">

                    <div className="text-tan text-4xl h-32 w-3/5 overflow-hidden font-bold flex justify-start items-start">
                        {companyData.companyName}

                    </div>

                    <div style={{ backgroundImage: `url('${companyData.companyLogo}')` }} className="h-32 w-32 rounded-md bg-cover bg-center bg-blue"></div>

                </div>
            </button>


        </div>
    )
}



function AllCompaniesPostedByUser() {

    const [allCompaniesPostedByUser, setAllCompaniesPostedByUser] = useState<Array<CompanyInformation>>([] as Array<CompanyInformation>);
    const db = getFirestore();

    async function fetchAllCompaniesPostedByUser() {

        onSnapshot(query(collection(db, "companies"), where("companyOwnerId", "==", localStorage.getItem("uid"))), (docs) => {
            var docsData: Array<CompanyInformation> = docs.docs.map((doc) => { return doc.data() as CompanyInformation });
            setAllCompaniesPostedByUser(docsData as Array<CompanyInformation>);
        })

    }

    useEffect(() => {
        fetchAllCompaniesPostedByUser();
    }, [])

    return (
        <div className="flex flex-col justify-start items-start mt-5 mb-10 gap-5">
            {
                allCompaniesPostedByUser.map((companyData) => {
                    return (
                        <CompanyCard {...companyData}></CompanyCard>
                    )
                })
            }
            {allCompaniesPostedByUser.length == 0 && <SubHeading text="No companies setup yet." customStyles="mt-20" />}

        </div>
    );
}

export default AllCompaniesPostedByUser;