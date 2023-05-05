import { Pro, Individual, Startup } from "./PricingPlanCards";
import PricingCardsVector from "../../../../images/landingPage/pricingbg.svg";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

function Pricing() {
  const navigate = useNavigate();

  return (
    <div style={{backgroundImage:`url('${PricingCardsVector}')`}} className=" w-full bg-tan flex flex-col pb-16 bg-cover bg-center justify-center items-center mt-24">
      <div
        style={{ fontFamily: "DM Sans" }}
        className="font-bold text-[35px] tracking-tighter text-primary mt-0 "
      >
        Pricing plans for teams of all sizes
      </div>

      <div className="h-full w-full flex flex-col justify-center items-center gap-10 mt-5">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          transition={{ duration: 1.0, delay: 0.2 }}
          variants={{
            visible: { opacity: 1, y: 0, scale: 1 },
            hidden: { opacity: 0, y: 1, scale: 0.95 },
          }}
          className="z-30 h-full w-full flex flex-row justify-center items-start gap-10 px-10 mt-12 mb-24"
        >
          <Individual />
          <Startup />
          <Pro />
        </motion.div>


        {/* <div className="flex flex-col relative z-20 text-tan text-center">
          <p
            style={{ fontFamily: "DM Sans" }}
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
                style={{ fontFamily: "DM Sans" }}
                className="text-blue font-bold text-[12px] uppercase"
              >
                Sign up now
              </div>
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Pricing;
