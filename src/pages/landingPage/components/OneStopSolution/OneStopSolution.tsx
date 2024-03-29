import OneStopSolutionCard from "./OneStopSolutionCard";
import person_search from "../../../../images/landingPage/person_search.png";
import dashboard from "../../../../images/landingPage/dashboard.png";
import calendar_add_on from "../../../../images/landingPage/calendar_add_on.png";
import { motion } from "framer-motion";

function OneStopSolution() {
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
      className=" items-center justify-center flex flex-col mt-24"
    >
      <p
        style={{ fontFamily: "DM Sans" }}
        className="font-bold text-[35px] text-blue"
      >
        Your One-Stop Solution for Modern Recruitment
      </p>
      <p className="text-[16px] text-[#696969] mt-5">
        Efficient, Intuitive, and Seamless Recruitment Solution
      </p>
      <motion.span
        initial={{
          y: 10,
          opacity: 0,
        }}
        animate={{
          x: 0,
          y: 0,
          opacity: 1,
          rotate: 0,
        }}
        transition={{ duration: 1.2 }}
        className="flex flex-row justify-between items-center w-full pl-[250px] pr-[250px] mt-[50px]"
      >
        <OneStopSolutionCard
          icon={person_search}
          text={"Filter candidates intuitively to find the best"}
        />
        <OneStopSolutionCard
          icon={dashboard}
          text={"Track Candidates and resumes in one integrated dashboard"}
        />
        <OneStopSolutionCard
          icon={calendar_add_on}
          text={"Schedule and conduct interviews with ease"}
        />
      </motion.span>
    </motion.span>
  );
}

export default OneStopSolution;
