import { BsArrowDownShort } from 'react-icons/bs';
import { motion } from 'framer-motion';


interface TimeCardProps {
    day: string,
    date: string,
    opacity: string

}

function TimeCard(props: TimeCardProps) {
    return (
        <div style={{ opacity: props.opacity }} className=" h-28 w-28 border-2 text-bray border-bray rounded-md flex justify-start items-start flex-col p-3">
            <div className='text-4xl font-bold'>{props.day}</div>
            <div className='text-xl font-bold'>{props.date}</div>
        </div>
    )
}



function TimeCardExpanded(props: TimeCardProps) {
    return (
        <div className='flex flex-col justify-start items-start gap-2'>
            <div style={{ opacity: props.opacity }} className=" h-28 w-28 border-2 text-bray border-bray rounded-md flex justify-start items-start flex-col p-3">
                <div className='text-4xl font-bold'>{props.day}</div>
                <div className='text-xl font-bold'>{props.date}</div>
            </div>

            {
                ["8.30 AM","9.00 AM","9.30 AM","10.00 AM"].map((e, index) => {
                    return (
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: (index * 0.2) }}
                            variants={{
                                visible: { opacity: 1 },
                                hidden: { opacity: 0 }
                            }}
                            className='flex justify-start px-2 items-center h-8 w-full text-md font-bold text-bray/80 rounded-md hover:bg-bray/80 hover:text-white border-2 border-bray/80'>
                            {e}
                        </motion.div>
                    )
                })
            }





        </div>
    )
}



export default function ScheduleInterviews() {
    return (
        <div className="h-min w-full flex justify-start items-start px-[15%] py-24 flex-col">
            <div className="text-purple text-7xl font-bold">Schedule Interviews in App</div>
            <div className="text-purple text-4xl font-bold">No more back and forth on email or calendly </div>

            <div className="text-purple text-xl font-regular mt-10 mb-10">
                Work in Async.<br />
                Tell us your available timeslots and we’ll do the rest.
            </div>


            <div className="flex flex-row gap-2 justify-start items-start">
                <TimeCard day="Thu" date="8" opacity={"20%"} />
                <TimeCard day="Fri" date="9" opacity={"50%"} />
                <TimeCardExpanded day="Sat" date="10" opacity={"90%"} />
                <TimeCard day="Sun" date="11" opacity={"50%"} />
                <TimeCard day="Mon" date="12" opacity={"20%"} />

            </div>





            <div className="h-12 w-12 mt-20 bg-purple rounded-md flex justify-center items-center">
                <BsArrowDownShort size={40} color="white"></BsArrowDownShort>
            </div>



        </div>
    )

}