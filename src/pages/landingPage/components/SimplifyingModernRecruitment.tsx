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

      {/* <div className="w-3/5 h-full flex justify-center items-center px-24 pt-[2%]">
        <div className=" h-full w-full flex flex-col justify-center items-start gap-0">
          <div className="font-bold text-8xl text-blue">WaveHR</div>
          <div className="text-3xl ml-2 tracking-tighter text-black">
            HR software for the startup
          </div>
          <div className="text-xl ml-2 tracking-tighter mt-10 text-black">
            Wave is an integrated suite of highly effective tools that allows
            you to streamline your hiring process, find the best candidates, and
            fill open positions faster than ever before.
          </div>
          <div className="text-md ml-2 mt-10 tracking-tighter underline gap-1 flex flex-col  text-black">
            <div>Filter all candidates to remove the clutter</div>
            <div>Track Candidates and resumes in one integrated dashboard</div>
            <div>Schedule and conduct interviews with ease</div>
            <div>Onboard with ease</div>
            <div>Get a shareable link to your company’s careers page</div>
          </div>

          <button
            onClick={() => {
              navigate("/login");
            }}
            className="flex flex-row justify-center items-center text-md font-medium px-6 py-1 hover:bg-purp bg-blue rounded-full mt-10 text-tan/80"
          >
            Get Access
            <AiOutlineArrowRight className="h-10 mt-[1px]  ml-5" />
          </button>
        </div>
      </div> */}
    </motion.span>
  );
}

export default SimplifyingModernRecruitment;
