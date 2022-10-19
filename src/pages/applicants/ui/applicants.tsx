import { useParams } from "react-router";
import AllPostedJobs from "../../jobs/components/AllPostedJobs"

export default function Applicants() {

    const { jobId } = useParams();


    return (
        <div className="pt-[85px] pb-[25px] h-screen w-full flex justify-center items-center">

            <div className="h-full w-full flex flex-row justify-between items-center px-10">
                <div className="h-full w-[39%] bg-bray rounded-md">
                </div>

                <div className="h-full w-[60%] bg-bray rounded-md">
                </div>

            </div>

        </div>
    )
}