import { useRecoilState } from "recoil";
import globalUserAtom from "../../../atoms/app/globalUserAtom";
import { useEffect, useState } from "react";
import { collection, collectionGroup, getDocs, getFirestore, query, where } from "firebase/firestore";
import { AnimatePresence, m } from "framer-motion";
import LoadingSpiner from "../../../standards/styles/components/loadingSpinner";
import { motion } from "framer-motion";

interface InfoCardProps {
    number: number,
    info: string,
    isLoading: boolean
}

function InfoCard(props: InfoCardProps) {
    return (
        <div className="p-3 flex flex-col gap-1 justify-center items-center">
            <AnimatePresence>
                {
                    props.isLoading == true ?
                        <LoadingSpiner /> :
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            className="flex flex-col justify-center items-center gap-1"
                        >
                            <div className="text-3xl font-semibold">{props.number}</div>
                            <div className="text-md font-regular">{props.info}</div>
                        </motion.div>
                }
            </AnimatePresence>

        </div>
    )
}


function LeftBar() {

    const [loggedInUser] = useRecoilState(globalUserAtom);
    const [numberOfCompanies, setnumberOfCompanies] = useState(0);
    const [numberOfJobs, setnumberOfJobs] = useState(0);
    const [numberOfInterviews, setnumberOfInterviews] = useState(0);
    const [numberOfApplicants, setnumberOfApplicants] = useState(0);
    const [loading, setloading] = useState(false);
    // const [userCompanyIds, setuserCompanyIds] = useState([] as Array<string>);
    const db = getFirestore();

    async function fetchStats() {
        setloading(true);
        await getDocs(query(collection(db, "jobs"), where("postedBy", "==", localStorage.getItem('uid') as string,))).then((querySnapshot) => {
            setnumberOfJobs(querySnapshot.size);
        });
        await getDocs(query(collection(db, "companies"), where("companyOwnerId", "==", localStorage.getItem('uid') as string,))).then((querySnapshot) => {
            setnumberOfCompanies(querySnapshot.size);
        });

        const applications = await getDocs(collectionGroup(db, 'applications'));
        setnumberOfApplicants(applications.size);
        setloading(false);
    }

    useEffect(() => {
        fetchStats();
    }, []);


    return (
        <div id="no_scroll" className="flex flex-col h-full w-full justify-start items-center overflow-y-scroll bg-white overflow-x-hidden p-5">

            {
                loggedInUser.name != undefined &&
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="hover:scale-[1.02] text-center hover:shadow-md duration-300 transition-all text-4xl rounded-3xl font-semibold hover:bg-blue bg-blue/90 text-tan flex justify-center items-center p-10 w-full">
                    Hello {loggedInUser.name} 👋
                </motion.div>
            }

            {
                loggedInUser.name != undefined &&
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-5 hover:scale-[1.02] hover:shadow-md transition-all  rounded-3xl duration-300 font-semibold hover:bg-blue bg-blue/90 text-tan flex flex-wrap justify-evenly items-center py-10 w-full">
                    <InfoCard isLoading={loading} number={numberOfCompanies} info="Companies" />
                    <InfoCard isLoading={loading} number={numberOfJobs} info="Jobs" />
                    <InfoCard isLoading={loading} number={numberOfInterviews} info="Interviews" />
                    <InfoCard isLoading={loading} number={numberOfApplicants} info="Applicants" />
                </motion.div>
            }

        </div>
    );
}

export default LeftBar;