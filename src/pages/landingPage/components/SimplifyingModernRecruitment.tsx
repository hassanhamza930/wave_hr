import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import heroback from "../../../images/landingPage/heroback.svg";
import { StandardBlueButton } from "../../../standards/styles/components/button";

function SimplifyingModernRecruitment() {
  const navigate = useNavigate();

  return (
    <div className="pt-[75px] tracking-tighter bg-cover bg-no-repeat bg-center bg-tan w-full flex flex-col justify-center items-center">

      <div className="flex flex-col w-full justify-start items-start gap-5 mt-24">

          <motion.div
            initial={{ opacity: 0, y: 150 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            style={{ fontFamily: "DM Sans" }} className="text-black/90 overflow-y-hidden flex flex-col w-full justify-center items-center gap-1 text-7xl font-medium">
            <div className="flex flex-row justify-center items-center gap-4">
              Simplifying <p className="text-blue">Modern</p>
            </div>
            <div>
              Recruitment
            </div>
          </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-xl mt-2 w-full text-center ">
          The Ultimate tool for Modern Recruiters
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex justify-center items-center w-full mt-5">

          <StandardBlueButton
            text="Get Access"
            onClick={() => { navigate("/login"); }}
          />
        </motion.div>


        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          style={{ backgroundImage: `url('${heroback}')` }} className="mt-12 h-[700px] bg-cover bg-center w-full bg-no-repeat object-cover">
        </motion.div>



      </div>

    </div>
  );
}

export default SimplifyingModernRecruitment;
