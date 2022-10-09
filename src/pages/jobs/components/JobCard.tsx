export default function JobCard() {
    return (
        <div className="w-full border-2 rounded-xl hover:bg-breen hover:text-white border-breen flex flex-col justify-start items-start p-4">
            <div className="text-3xl font-bold">Senior Software Engineer</div>
            <div className="text-md font-regular">at CareerNetwork.co</div>
            <div className="w-full flex flex-row justify-end items-end text-md font-regular">27 Applicants</div>
        </div>
    )
}
