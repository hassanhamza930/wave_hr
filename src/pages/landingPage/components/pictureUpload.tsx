import { BsArrowRightShort } from "react-icons/bs";
import { motion } from "framer-motion";
import {AiFillCamera} from "react-icons/ai";
import { useEffect, useState } from "react";

export default function PictureUpload() {

    const [isShowingPicture,setIsShowingPicture]=useState(false);


    useEffect(()=>{
        setTimeout(()=>{
            setIsShowingPicture(true);
        },2000)
    },[]);


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute">
            <div className="mt-10 text-md text-purple">
                Hey Jacob 👋 , we’re glad you’re here.<br />
                Please Upload a profile picture.
            </div>

            <div style={{backgroundImage:isShowingPicture?"url('https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')":""}} className="bg-bray bg-cover bg-center h-36 w-36 rounded-2xl my-5 flex justify-center items-center">
                {isShowingPicture==false&&<AiFillCamera size={50} color="white"/>}
            </div>



        </motion.div>
    )
}