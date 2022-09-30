import WeBelieveEveryApplicationDeservesToBeSeen from '../components/everyApplication';
import ShufflingImages from '../components/shufflingImages';
import { BsArrowRightShort } from 'react-icons/bs';
import JobApplicationsThatFeelLikeAConvo from '../components/jobApplications';
import SayGoodByeToExcelSheets from '../components/sayGoodByeToExcelSheet';
import ScheduleInterviews from '../components/scheduleInterviews';
import InterviewInApp from '../components/interviewInApp';
import { motion } from "framer-motion";

export default function LandingPage() {
    return (
        <div className="relative pt-[80px] h-full w-full flex flex-col justify-start items-center">

            <div className="h-36 mt-16 text-7xl text-purple font-bold text-center overflow-hidden">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.7,delay:0.5 }}
                    variants={{
                        visible: { opacity: 1, y: 0 },
                        hidden: { opacity: 0, y: 100 }
                    }}>
                    Recruit for<br />The Startup
                </motion.div>
            </div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.7,delay:0.5 }}
                variants={{
                    visible: { opacity: 1, y: 0 },
                    hidden: { opacity: 0, y: 50 },
                }}
                className="text-xl mt-10 text-purple font-regular text-center">
                <b>Wave</b> takes the pain out of recruiting world class talent.
            </motion.div>


            <ShufflingImages />
            <WeBelieveEveryApplicationDeservesToBeSeen />
            <JobApplicationsThatFeelLikeAConvo />
            <SayGoodByeToExcelSheets />
            <ScheduleInterviews />
            <InterviewInApp />


        </div >
    )
}