import FrontPageBanner from "../../../images/landingPage/Frontpagebanner.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function SimplifyingModernRecruitment() {
  const navigate = useNavigate();

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      transition={{ duration: 0.8 }}
      variants={{
        visible: { opacity: 1, y: 0, scale: 1 },
        hidden: { opacity: 0, y: 1, scale: 0.95 },
      }}
      className="h-screen bg-tan w-full flex flex-row items-center"
    >
      <div
        style={{ fontFamily: "Space Grotesk" }}
        className="absolute text-primary pl-[75px] flex flex-col mt-[-150px] font-bold text-[58px]"
      >
        <p className="flex flex-row">
          Simplifying <p className="text-[#0044B2] ml-3">Modern</p>
        </p>
        <p className="mt-[-10px]">Recruitment</p>
      </div>
      <p className="text-[21px] absolute pl-[75px] mt-[80px] ">
        The Ultimate Online HR Software for Modern Recruiters
      </p>
      <button
        onClick={() => {
          navigate("/login");
        }}
        className="hover:scale-[1.02] absolute ml-[75px] mt-[250px] text-sm px-8 py-3 rounded-[10px] bg-primary flex flex-row gap-2 justify-center items-center"
      >
        <div
          style={{ fontFamily: "Space Grotesk" }}
          className="text-tan font-bold text-[12px] uppercase"
        >
          Sign up now
        </div>
      </button>
      <img
        src={FrontPageBanner}
        className=" object-contain h-full w-full mt-[-40px]"
      />
    </motion.span>
  );
}

export default SimplifyingModernRecruitment;
