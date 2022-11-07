import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import MultipleChoice from "./multipleChoice";
import PictureUpload from "./pictureUpload";
import TextForm from "./textform";

export default function JobApplicationsThatFeelLikeAConvo() {

    const [index, setIndex] = useState(0);
    let components = [<TextForm />, <PictureUpload />, <MultipleChoice />]

    function increase() {
        setTimeout(() => {
            if (index < components.length-1) {
                setIndex(index + 1);
                increase();
            }
            else{
                setIndex(0);
            }
        }, 4000);
    }


    useEffect(() => {
        increase();
    }, [index]);

    return (
        <div className="relative h-min w-full px-[15%] py-24 flex flex-col justify-start items-start mt-24">
            <div className="text-breen text-7xl font-bold">Job Applications</div>
            <div className="text-breen text-4xl font-bold">that feel like a conversation</div>

            <div className="text-breen text-xl font-regular mt-10 mb-10">
                Post jobs directly on our platform, Improve user experience, get high quality applicants.
            </div>


            <div className="relative flex justify-start items-start h-72 w-[500px]">
                {
                    components.map((e, localIndex) => {
                        return (
                            <AnimatePresence>
                                {localIndex == index && e}
                            </AnimatePresence>
                        )
                    })
                }

            </div>



            {/* <div className="h-12 w-12 mt-12 bg-breen rounded-md flex justify-center items-center">
                <BsArrowRightShort size={40} color="white"></BsArrowRightShort>
            </div> */}


        </div>
    )

}