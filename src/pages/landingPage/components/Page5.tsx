import { BsArrowRightShort, BsFillPlusSquareFill } from "react-icons/bs";
import {useState} from "react";
import { hover } from "@testing-library/user-event/dist/hover";

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


export default function Page5() {

    return (
        <div className="h-screen w-full flex justify-start items-start px-[15%] py-24 flex flex-col justify-start items-start">
            <div className="text-purple text-7xl font-bold">Job Applications</div>
            <div className="text-purple text-4xl font-bold">that feel like a conversation</div>


            <div className="text-purple text-xl font-regular mt-10 mb-10">
                Please select your employment status
            </div>

            <Option title="Unemployed" />
            <Option title="Full Time" />
            <Option title="Contract" />


            <div className="h-12 w-12 mt-16 bg-purple rounded-md flex justify-center items-center">
                <BsArrowRightShort size={40} color="white"></BsArrowRightShort>
            </div>
        </div>
    )

}