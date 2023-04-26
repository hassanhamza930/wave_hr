import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function ExperienceTheFuture() {
  const navigate = useNavigate();

  return (
    <div className="w-[75%] rounded-[19px] mt-28 flex flex-col justify-center items-center h-full gap-2 mb-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
        variants={{
          visible: { opacity: 1, y: 0, scale: 1 },
          hidden: { opacity: 0, y: 10, scale: 0.95 },
        }}
        className="w-full bg-primary bg-opacity-5 flex flex-row  items-center justify-center pt-8 pb-8 rounded-[19px]"
      >
        <div className="flex flex-col justify-center items-center">
          <div
            style={{ fontFamily: "Space Grotesk" }}
            className=" text-[22px] text-primary w-full flex flex-row items-center justify-between gap-20"
          >
            <p className="font-bold">
              Experience the future of recruitment with WaveHR. Sign up today!{" "}
            </p>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              onClick={() => {
                navigate("/login");
              }}
              className="hover:scale-[1.02] px-8 py-3 rounded-[10px] bg-primary flex flex-row gap-2 justify-center items-center"
            >
              <div
                style={{ fontFamily: "Space Grotesk" }}
                className="text-tan font-bold text-[12px] uppercase"
              >
                Sign up now
              </div>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ExperienceTheFuture;
