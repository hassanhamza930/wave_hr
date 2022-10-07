function JobCard() {
    return (
        <div className="w-[500px] border-2 rounded-xl hover:bg-breen hover:text-white border-breen flex flex-col justify-start items-start p-4">
            <div className="text-3xl font-bold">Senior Software Engineer</div>
            <div className="text-md font-regular">at CareerNetwork.co</div>
            <div className="w-full flex flex-row justify-end items-end text-md font-regular">27 Applicants</div>
        </div>
    )
}


function JobDetails() {
    return (
        <div className="w-[500px] border-2 rounded-xl hover:bg-breen hover:text-white border-breen flex flex-col justify-center items-center p-4">
            <div className="text-3xl font-bold">This will show all details for selected job.</div>
        
        </div>
    )
}


export default function JobsPage() {
    return (
        <div className="pt-[80px] text-breen bg-tan h-screen w-full flex justify-start items-start p-20 flex-col">
            <div className="text-6xl font-bold my-10">Your Job Postings</div>

            <div className="w-full h-full flex flex-row">
                <div className="h-full border-2 border-breen w-2/4 flex flex-col justify-start items-start">
                    <JobCard />
                </div>

                <div className="border-2 border-red-500 h-full w-2/4 flex flex-col justify-center items-center">
                    <JobDetails />
                </div>

            </div>

        </div>
    )


}