import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import heroback from "../../../images/landingPage/heroback.svg";

function SimplifyingModernRecruitment() {
  const navigate = useNavigate();

  return (
    <div className="pt-[75px] tracking-tighter bg-cover bg-no-repeat bg-center bg-tan w-full flex flex-col justify-center items-center">

      <motion.div className="flex flex-col w-full justify-start items-start gap-5 mt-16">
        
        <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{duration:1,delay:0.4}}
        style={{ fontFamily: "DM Sans" }} className="text-blue flex flex-col w-full justify-center items-center gap-1 text-7xl font-semibold">
          <div className="flex flex-row justify-center items-center gap-4">
            Simplifying <p className="text-darkblue">Modern</p>
          </div>
          <div>
            Recruitment
          </div>
        </motion.div>

        <motion.p 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{duration:1,delay:0.6}}
        className="text-[21px] mt-2 w-full text-center ">
          The Ultimate tool for Modern Recruiters
        </motion.p>

        <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{duration:1,delay:0.8}}
        className="flex justify-center items-center w-full mt-5">
          <button
            onClick={() => { navigate("/login"); }}
            className="hover:scale-[1.02] hover:shadow-xl transition-all duration-100 ease-in-out text-md px-8 py-3 rounded-[10px] bg-blue text-white font-medium flex flex-row gap-2 justify-center items-center">
            Get Access
          </button>
        </motion.div>


        <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{duration:1,delay:1}}
        style={{ backgroundImage: `url('${heroback}')` }} className="mt-12 h-[700px] bg-cover bg-center w-full bg-no-repeat object-cover">
        </motion.div>



      </motion.div>

    </div>
  );
}

export default SimplifyingModernRecruitment;
