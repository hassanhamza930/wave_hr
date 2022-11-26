import InterviewEmail from "../components/interviewEmail"
import InterviewSettings from "../components/interviewSettings"

export default function Interviews(){
    return (
        <div className="pt-[70px] h-screen w-full flex flex-row justify-center items-center">
            <InterviewSettings/>
            <InterviewEmail/>
        </div>
    )
}