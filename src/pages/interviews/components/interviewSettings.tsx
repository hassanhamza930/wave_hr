import { BsArrowRightShort } from "react-icons/bs"
import { Navigate, useNavigate } from "react-router"

export default function InterviewSettings() {

    const navigate=useNavigate();

    return (
        <div className="h-[95%] pl-10 w-2/4 rounded-md p-5 flex flex-col justify-start items-start overflow-y-scroll">
            <div className="text-4xl font-bold">Interview Settings</div>
            <div className="text-md font-bold mt-10">Calendly Link</div>
            <input placeholder="Calendly Link" className="w-3/4 outline-none px-2 py-1 bg-transparent border-b-2 border-bray/90 text-sm mt-5"></input>
            <button onClick={() => { navigate("/newJob") }} className=" mt-8 text-breen font-bold hover:text-tan text-sm flex flex-row gap-5 justify-center items-center px-4 py-2 bg-transparent border-2 border-breen hover:bg-blue rounded-md">
                Update
            </button>
            <div className="text-sm text-bray/90 mt-5 w-[70%]">This link will be used to send interview invites to candidates. Make sure you have all the meeting details on this link</div>

        </div>
    )
}