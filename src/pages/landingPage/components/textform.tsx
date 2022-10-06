import { BsArrowRightShort } from "react-icons/bs";
import {motion} from "framer-motion";
import { useEffect, useState } from "react";

export default function TextForm() {

    const [textVal,setTextVal]=useState("");
    let word="Jacob";
    let newWord="";
    let index=0;


    useEffect(()=>{
        setTimeout(()=>{
            setInterval(()=>{
                if(index<word.length){
                    newWord=newWord+word.at(index);
                    setTextVal(newWord);
                    index=index+1;
                }
            },300);

        },1000)
    },[])

    return (
        <motion.div
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        transition={{duration:0.5}}
        className="absolute"
        >

            <input placeholder="What should we call you?" value={textVal} className="border-b-2 p-2 bg-transparent focus:ring-0 border-breen border-0 text-breen text-xl font-regular mt-10">
            </input>

        
        </motion.div>
    )
}