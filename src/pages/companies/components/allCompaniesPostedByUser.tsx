import { collection, getDocs, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { CompanyDataInterface } from "../../../standards/interfaces/interfaces";
import { Heading, SubHeading, Text } from "../../../standards/styles/components/heading";
import { CompanyInformation } from "../../addNewCompany/logic/addCompany";
import { selectedCompanyAtom } from "../atoms/selectedCompany";
import SimpleInput, { SearchBar } from "../../../standards/styles/components/inputs";
import { StandardMidBlueButton } from "../../../standards/styles/components/button";
import { BiLinkExternal, BiWindow, BiWindowOpen } from "react-icons/bi";
import { motion } from "framer-motion"
import currentRouteAtom from "../../../atoms/app/currentRouteAtom";

function CompanyCard(companyData: CompanyDataInterface) {

    const [selectedCompany, setSelectedCompany] = useRecoilState(selectedCompanyAtom);
    const [currentRoute, setcurrentRoute] = useRecoilState(currentRouteAtom);


    return (
        <div onClick={() => { setSelectedCompany(companyData) }} className="cursor-pointer  hover:bg-blue/5 transition ease-in-out duration-150 flex px-7 py-4 w-full flex-row justify-between items-center border-t-[1px] border-gray">

            <div className="flex flex-col justify-start items-start h-full w-[60%] ">
                <div className=" w-full text-md font-medium text-black overflow-hidden">
                    {companyData.companyName}
                </div>
                <div className="text-sm font-regular text-dark-gray">3 Jobs</div>
            </div>

            {/* <StandardMidBlueButton onClick={()=>{
                setSelectedCompany(companyData);
                setcurrentRoute(`Companies > ${companyData.companyName}`);
                }} text="View Company" /> */}

        </div>
    )
}




function AllCompaniesPostedByUser() {

    const [allCompaniesPostedByUser, setAllCompaniesPostedByUser] = useState<Array<CompanyDataInterface>>([] as Array<CompanyDataInterface>);
    const db = getFirestore();
    const [searchCompany, setsearchCompany] = useState("");



    async function fetchAllCompaniesPostedByUser() {


        onSnapshot(query(collection(db, "companies"), where("companyOwnerId", "==", localStorage.getItem("uid"))), (docs) => {
            var docsData: Array<CompanyDataInterface> = docs.docs.map((doc) => {
                var tempData: CompanyDataInterface = doc.data() as CompanyDataInterface;
                tempData.id = doc.id;
                return tempData as CompanyDataInterface;
            });

            docsData = docsData.filter((companyData) => {
                if (companyData.companyName.toLowerCase().includes(searchCompany.toLowerCase())) {
                    return companyData;
                }
            });

            setAllCompaniesPostedByUser(docsData as Array<CompanyDataInterface>);
            console.log("all companies", docsData);
        })

    }

    useEffect(() => {
        console.log("fetchin all companies");
        fetchAllCompaniesPostedByUser();
    }, [searchCompany])

    return (
        <div className="flex h-full flex-col justify-start items-start">

            <SearchBar onChange={(e: any) => { setsearchCompany(e.target.value) }} value={searchCompany} placeholder="Search Company" />

            {
                allCompaniesPostedByUser.length > 0 ?
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} id="no_scroll" className="h-full flex-1 w-full flex-col justify-start items-start overflow-y-scroll">
                        {
                            allCompaniesPostedByUser.map((companyData, index) => {
                                return (
                                    <motion.div transition={{ delay: (index + 1) * 0.08 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <CompanyCard {...companyData}></CompanyCard>
                                    </motion.div>
                                )
                            })
                        }
                    </motion.div> :
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className='flex justify-center items-center h-full w-full'>
                        <Text
                            text={'No Companies Found'}
                            color='text-blue'
                            textSize='text-mg'
                            customStyles='m-6'
                        />
                    </motion.div>
            }

        </div>
    );
}

export default AllCompaniesPostedByUser;