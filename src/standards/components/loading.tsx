import {motion} from "framer-motion";
import Logo from "../../images/logo.svg";

export default function Loading() {
    return (
        <div className="h-screen w-full bg-breen flex justify-center items-center">
            {/* <div className="h-12 w-12 rounded-md animate-spin bg-white/90">

            </div> */}
            <motion.img 
            initial={{opacity:0,y:50}}
            animate={{opacity:1,y:0}}
            transition={{duration:1}}
            src={Logo} className="h-64 w-64"></motion.img>

        </div>
    )
}