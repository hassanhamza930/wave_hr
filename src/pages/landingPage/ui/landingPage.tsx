import WeBelieveEveryApplicationDeservesToBeSeen from '../components/everyApplication';
import ShufflingImages from '../components/shufflingImages';
import { BsArrowRightShort } from 'react-icons/bs';
import JobApplicationsThatFeelLikeAConvo from '../components/jobApplications';
import SayGoodByeToExcelSheets from '../components/sayGoodByeToExcelSheet';
import ScheduleInterviews from '../components/scheduleInterviews';
import InterviewInApp from '../components/interviewInApp';


export default function LandingPage() {
    return (
        <div className="relative pt-[80px] h-full w-full flex flex-col justify-start items-center">

            <div className="mt-16 text-7xl text-purple font-bold text-center">Recruit for<br />The Startup</div>
            <div className="text-xl mt-10 text-purple font-regular text-center"><b>Wave</b> takes the pain out of recruiting world class talent.</div>

            <ShufflingImages />
            <WeBelieveEveryApplicationDeservesToBeSeen />
            <JobApplicationsThatFeelLikeAConvo/>
            <SayGoodByeToExcelSheets/>
            <ScheduleInterviews/>
            <InterviewInApp/>


        </div>
    )
}