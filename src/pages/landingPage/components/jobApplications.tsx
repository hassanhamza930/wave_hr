import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import PictureUpload from "./pictureUpload";
import TextForm from "./textform";

export default function JobApplicationsThatFeelLikeAConvo() {

    const [showing, setShowing] = useState(false);

    useEffect(() => {
        setTimeout(() => { setShowing(true) }, 3000);
    }, []);

    return (
        <div className="relative h-screen w-full flex justify-start items-start px-[15%] py-24 flex flex-col justify-start items-start mt-24">
            <div className="text-purple text-7xl font-bold">Job Applications</div>
            <div className="text-purple text-4xl font-bold">that feel like a conversation</div>


            <div className="relative flex justify-start items-start h-72 w-96">
                <AnimatePresence>
                    {showing == false && <TextForm />}
                </AnimatePresence>

                <AnimatePresence>
                    {showing == true && <PictureUpload />}
                </AnimatePresence>
            </div>



            <div className="h-16 w-16 mt-10 bg-purple rounded-md flex justify-center items-center">
                <BsArrowRightShort size={40} color="white"></BsArrowRightShort>
            </div>


        </div>
    )

}