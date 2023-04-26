import { Pro, Individual, Startup } from "./PricingPlanCards";
import PricingCardsVector from "../../../../images/landingPage/PricingCardsVector.png";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

function Pricing() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full bg-tan flex flex-col justify-center items-center ">
      <div
        style={{ fontFamily: "Space Grotesk" }}
        className="font-bold text-[35px] tracking-tighter text-primary mt-56"
      >
        Pricing plans for teams of all sizes
      </div>

      <div className="h-full w-full flex flex-row justify-center items-start gap-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          variants={{
            visible: { opacity: 1, y: 0, scale: 1 },
            hidden: { opacity: 0, y: 1, scale: 0.95 },
          }}
          className="z-30 h-full w-full flex flex-row justify-center items-start gap-10 px-10 mt-12"
        >
          <div className="z-30 h-full w-full flex flex-row justify-center items-start gap-10 px-10 mt-12">
            <Individual />
            <Startup />
            <Pro />
          </div>
        </motion.div>

        <img
          src={PricingCardsVector}
          className="w-full h-[1000px] mt-[300px] object-contain absolute z-10"
        />
        <div className="flex flex-col absolute mt-[900px] z-30 text-tan text-center">
          <p
            style={{ fontFamily: "Space Grotesk" }}
            className="font-bold text-[33px]"
          >
            Ready to take your recruitment process to the next level?
          </p>
          <p className="text-[13px]">
            Sign up for WaveHR today and experience the future of recruitment
            for yourself!
          </p>
          <div className="w-full mt-[50px] rounded-[10px] bg-transparent flex flex-row justify-center items-center">
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="hover:scale-[1.02] w-[150px] text-sm px-8 py-3 rounded-[10px] bg-tan flex flex-row gap-2 justify-center items-center"
            >
              <div
                style={{ fontFamily: "Space Grotesk" }}
                className="text-primary font-bold text-[12px] uppercase"
              >
                Sign up now
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
