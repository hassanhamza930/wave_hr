import { collection, getDocs, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { CompanyDataInterface } from "../../../standards/interfaces/interfaces";
import { Heading, SubHeading } from "../../../standards/styles/components/heading";
import { CompanyInformation } from "../../addNewCompany/logic/addCompany";
import { selectedCompanyAtom } from "../atoms/selectedCompany";
import SimpleInput, { SearchBar } from "../../../standards/styles/components/inputs";


function CompanyCard(companyData: CompanyDataInterface) {

    const [selectedCompany, setSelectedCompany] = useRecoilState(selectedCompanyAtom);


    return (
        <div className="flex w-full h-full flex-row justify-start items-start">
            <button onClick={() => { setSelectedCompany(companyData) }} style={{ backgroundImage: `url('${companyData.companyCover}')` }} className="h-32 w-full hover:scale-[1.02] rounded-md bg-cover bg-center">
                <div className="h-full bg-cover bg-center bg-black/[95%] backdrop-hue-rotate-90 text-tan w-full rounded-md flex flex-1 flex-row justify-between items-center p-5">

                    <div className="text-tan text-4xl h-full w-3/5 overflow-hidden text-start font-bold flex justify-start items-start">
                        {companyData.companyName}
                    </div>

                    <div style={{ backgroundImage: `url('${companyData.companyLogo}')` }} className="h-24 w-24 rounded-md bg-cover bg-center bg-transparent"></div>

                </div>
            </button>


        </div>
    )
}



function AllCompaniesPostedByUser() {

    const [allCompaniesPostedByUser, setAllCompaniesPostedByUser] = useState<Array<CompanyDataInterface>>([] as Array<CompanyDataInterface>);
    const db = getFirestore();

    async function fetchAllCompaniesPostedByUser() {

        onSnapshot(query(collection(db, "companies"), where("companyOwnerId", "==", localStorage.getItem("uid"))), (docs) => {
            var docsData: Array<CompanyDataInterface> = docs.docs.map((doc) => {
                var tempData: CompanyDataInterface = doc.data() as CompanyDataInterface;
                tempData.id = doc.id;
                return tempData as CompanyDataInterface
            });
            setAllCompaniesPostedByUser(docsData as Array<CompanyDataInterface>);
        })

    }

    useEffect(() => {
        fetchAllCompaniesPostedByUser();
    }, [])

    return (
        <div className="flex flex-col justify-start items-start">

            <SearchBar onChange={(e:any)=>{}} value="" placeholder="Search Company" />
            {
                allCompaniesPostedByUser.map((companyData) => {
                    return (
                        <CompanyCard {...companyData}></CompanyCard>
                    )
                })
            }

        </div>
    );
}

export default AllCompaniesPostedByUser;