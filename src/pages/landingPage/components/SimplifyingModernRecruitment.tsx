import FrontPageBanner from "../../../images/landingPage/Frontpagebanner.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function SimplifyingModernRecruitment() {
  const navigate = useNavigate();

  return (
    <motion.div
      style={{ backgroundImage: `url('${FrontPageBanner}')` }}
      initial="hidden"
      whileInView="visible"
      animate={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.0, delay: 0.5 }}
      variants={{
        visible: { opacity: 1, y: 0, scale: 1 },
        hidden: { opacity: 0, y: 1, scale: 1.05 },
      }} className="mt-[70px] bg-cover bg-no-repeat bg-center bg-tan w-full flex h-[700px] flex-col justify-center px-[10%] items-start">

      <div className="flex flex-col justify-start items-start gap-5">
        <div style={{ fontFamily: "Space Grotesk" }} className="text-blue flex flex-col justify-start items-start gap-1 text-7xl font-bold">
          <div className="flex flex-row justify-start items-start gap-4">
            Simplifying <p className="text-darkblue">Modern</p>
          </div>
          <div>
            Recruitment
          </div>
        </div>

        <p className="text-[21px] mt-2 ">
          The Ultimate Online HR Software for Modern Recruiters
        </p>

        <button
          onClick={() => {navigate("/login");}}
          className="hover:scale-[1.02] hover:shadow-xl transition-all duration-100 ease-in-out mt-10 text-md px-8 py-3 rounded-[10px] bg-blue text-white font-medium flex flex-row gap-2 justify-center items-center">
          Get Access
        </button>



      </div>

    </motion.div>
  );
}

export default SimplifyingModernRecruitment;
