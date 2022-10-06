import { BsArrowRightShort } from "react-icons/bs";
import { motion } from "framer-motion";
import {AiFillCamera} from "react-icons/ai";
import { useEffect, useState } from "react";

interface OptionCardInputs{
    title:string,
}

const Option=(props:OptionCardInputs)=>{

    const [hovering,setHovering]=useState(false);

    return (
        <button
         onMouseEnter={()=>{setHovering(true);}} onMouseLeave={()=>{ setHovering(false); }} 
         style={{backgroundColor:hovering?"#64113F":"transparent",borderColor:hovering?"transparent":"#64113F",borderWidth:hovering?"0px":"2px"}}
         className=" gap-5 h-16 w-72 border-[3px] rounded-md mt-2 flex flex-row justify-start p-5 items-center">

            <div style={{opacity:hovering?"100%":"80%",backgroundColor:hovering?"white":"#64113F",color:hovering?"#64113F":"white"}} className="p-2 rounded-md w-10 h-10 flex justify-center items-center text-xl font-bold text-white">A</div>
            <div style={{opacity:hovering?"100%":"80%",color:hovering?"white":"#64113F"}} className="p-2 rounded-md flex justify-center items-center text-xl font-bold">{props.title}</div>

        </button>
    )
}




export default function MultipleChoice() {



    useEffect(()=>{
     
    },[]);


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute">
            <div className="mt-10 w-full text-xl text-breen mb-10">
                Please select your current employment status.
            </div>

            <Option title="Unemployed" />
            <Option title="Full Time" />



        </motion.div>
    )
}