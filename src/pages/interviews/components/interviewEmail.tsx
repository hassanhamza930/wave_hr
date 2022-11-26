export default function InterviewEmail() {
    return (
        <div className="h-[95%] w-2/4 rounded-md p-5 flex flex-col justify-start items-start overflow-y-scroll">
            <div className="text-4xl font-bold">Interview Email</div>
            <div className="text-sm text-bray/90 mt-5 w-[70%]">This link will be used to send interview invites to candidates. Make sure you have all the meeting details on this link</div>
            <textarea placeholder="Email Invitation" className="h-72 w-[90%] outline-none p-3 rounded-md bg-transparent border-2 border-bray/50 text-sm mt-5"></textarea>

        </div>
    )
}