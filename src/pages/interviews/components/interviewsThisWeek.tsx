import { useState } from "react";
import { SubHeading } from "../../../standards/styles/components/heading";
import {motion} from 'framer-motion';

interface InterviewCardProps{
  title:string,
  startTime:string,
  endTime:string,
  index:number
}

function InterviewCard(props:InterviewCardProps){
  return(
    <motion.div 
    initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{duration:0.1,delay:0.08*(props.index+1)}}
    className={`hover:bg-blue/20 ${props.index%2==0?'bg-blue/10':'bg-lightblue/10'} hover:scale-[1.01] transition-all ease-in-out duration-100 flex w-full flex-col p-5 h-24 rounded-3xl text-black justify-start items-start`}>
        <div className="text-md font-semibold">Interview with James Mcgill for Product Manager at Google</div>
        <div className="text-sm text-dark-gray font-regular">Wednesday, {props.startTime}-{props.endTime} </div>
    </motion.div>
  )
}


function InterviewsThisWeek() {


  const [interviews, setinterviews] = useState<Array<InterviewCardProps>>([
    {title:"Interview with Charles McGill for Product Manager at Waltontech.co", startTime:"10:00 PM", endTime:"11:00 PM"},
    {title:"Interview with Charles McGill for Product Manager at Waltontech.co", startTime:"10:00 PM", endTime:"11:00 PM"},
    {title:"Interview with Charles McGill for Product Manager at Waltontech.co", startTime:"10:00 PM", endTime:"11:00 PM"},
    {title:"Interview with Charles McGill for Product Manager at Waltontech.co", startTime:"10:00 PM", endTime:"11:00 PM"},
    {title:"Interview with Charles McGill for Product Manager at Waltontech.co", startTime:"10:00 PM", endTime:"11:00 PM"},
  ] as Array<InterviewCardProps>);

  return ( 
    <div className="flex-1 pt-10 gap-3 flex justify-start items-start w-full flex-col p-7">
      <SubHeading text="Your Interviews this week." textSize="text-sm"/>
        {
          interviews.map((interview, index)=>{
            return(
              <InterviewCard index={index} key={index} title={interview.title} startTime={interview.startTime} endTime={interview.endTime}/>
            )
          })
        }
    </div>
   );
}

export default InterviewsThisWeek;