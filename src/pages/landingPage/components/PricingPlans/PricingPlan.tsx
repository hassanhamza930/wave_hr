import { Pro, Individual, Startup } from "./PricingPlanCards";
import PricingCardsVector from "../../../../images/landingPage/PricingCardsVector.png";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

function Pricing() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full bg-tan flex flex-col justify-center items-center mt-24 ">
      <div
        style={{ fontFamily: "Space Grotesk" }}
        className="font-bold text-[35px] tracking-tighter text-primary mt-96 "
      >
        Pricing plans for teams of all sizes
      </div>

      <div className="h-min w-full flex flex-col justify-center items-center gap-10 mt-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          transition={{ duration: 1.0, delay: 0.2 }}
          variants={{
            visible: { opacity: 1, y: 0, scale: 1 },
            hidden: { opacity: 0, y: 1, scale: 0.95 },
          }}
          className="z-30 h-full w-full flex flex-row justify-center items-start gap-10 px-10 mt-12"
        >
          <Individual />
          <Startup />
          <Pro />
        </motion.div>

        <img
          src={PricingCardsVector}
          className="w-full h-[700px] mt-[400px] bg-cover absolute z-10"
        />

        <div className="flex flex-col relative z-20 text-tan text-center">
          <p
            style={{ fontFamily: "Space Grotesk" }}
            className="font-bold text-[33px] mt-24"
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
                className="text-blue font-bold text-[12px] uppercase"
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
