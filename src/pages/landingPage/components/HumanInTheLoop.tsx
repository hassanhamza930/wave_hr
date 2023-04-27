import { motion } from "framer-motion";
import HITL from "../../../images/landingPage/HITL.png";
import PostOnce from "../../../images/landingPage/PostOnce.png";
import Applications from "../../../images/landingPage/Applications.png";

function HumanInTheLoop() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      transition={{ duration: 1 }}
      variants={{
        visible: { opacity: 1, y: 0, scale: 1 },
        hidden: { opacity: 0, y: 1, scale: 0.95 },
      }}
      className="h-full px-[15%] mt-16 items-center"
    >
      <div className="flex flex-row mt-[450px] ">
        <img src={HITL} className="w-[400px] h-[330px] ml-2" />
        <div className="px-10 flex flex-col ml-5 ">
          <div
            style={{ fontFamily: "Space Grotesk" }}
            className="font-bold mb-7 mt-10  text-blue text-[27px]"
          >
            Human in the loop
          </div>

          <div className="font-regular font-['Inter'] text-[#696969] text-[16px]">
            Wave follows a human in the loop approach to hiring. We believe
            traditional ATS software hurts diversity and inclusion and skims
            over people who could be part of your dream team.
            <br />
            <br /> Wave provides you the tools to streamline your hiring
            pipeline while making sure every candidate resume is reviewed by
            human eyes.
          </div>
        </div>
      </div>

      <div className="flex flex-row-reverse mt-16 ">
        <img src={PostOnce} className="w-[400px] h-[330px] ml-2" />
        <div className="px-10 flex flex-col mr-5">
          <div
            style={{ fontFamily: "Space Grotesk" }}
            className="font-bold mb-7 mt-10  text-blue text-[27px]"
          >
            Post once, share everywhere
          </div>

          <div className="font-regular font-['Inter'] mb-10 text-[#696969] text-[16px] w-[90%]">
            Post your job on our platform and get a shareable link. Distribute
            it wherever you like and start receiving applications.LinkedIn,
            Indeed, Glassdoor or even Whatsapp.
          </div>
        </div>
      </div>

      <div className="flex flex-row mt-16">
        <img src={Applications} className="w-[400px] h-[330px] ml-2" />
        <div className="px-10 flex flex-col ml-5">
          <div
            style={{ fontFamily: "Space Grotesk" }}
            className="font-bold mb-7 mt-10  text-blue text-[27px]"
          >
            Applications that feels like a conversation
          </div>

          <div className="font-regular font-['Inter'] mb-10 text-[16px] text-[#696969]">
            Wave makes job applications more interactive by turning it into a
            conversation. Applicants get detailed overview of what your company
            does with a Careers and a Company page. <br />
            <br /> Get higher quality applications and more applicants.
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default HumanInTheLoop;
