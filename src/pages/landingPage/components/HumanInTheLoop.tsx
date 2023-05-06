import { motion } from "framer-motion";
import HITL from "../../../images/landingPage/HITL.png";
import PostOnce from "../../../images/landingPage/PostOnce.png";
import Applications from "../../../images/landingPage/Applications.png";


interface FeatureCardProps {
  title: string;
  description: string;
  image: any;
  reverse: boolean;
}

function FeatureCard(props: FeatureCardProps) {
  return (
    <div className={`hover:scale-[1.02]  transition-all duration-200 hover:shadow-xl flex ${props.reverse == true ? 'flex-row-reverse' : 'flex-row'} mt-10 bg-blue shadow-md rounded-xl text-tan justify-center items-center`}>
      <img src={props.image} className="w-96 h-96 object-cover rounded-xl" />
      <div className="px-10 flex flex-col ml-5 ">
        <div
          style={{ fontFamily: "DM Sans" }}
          className="font-bold mb-7 mt-1 text-3xl"
        >
          {props.title}
        </div>

        <div className="font-regular font-['Inter'] text-md">
          {props.description}
        </div>
      </div>
    </div>
  );
}




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
      className="h-full px-[20%] mt-24 items-center"
    >


      <FeatureCard
        title="Human in the loop"
        description="
        Wave follows a human in the loop approach to hiring. We believe
        traditional ATS software hurts diversity and inclusion and skims
        over people who could be part of your dream team.
        Wave provides you the tools to streamline your hiring
        pipeline while making sure every candidate resume is reviewed by
        human eyes.
        "
        image={HITL}
        reverse={true}
      />


      <FeatureCard
        title="Post once, share everywhere"
        description="Post your job on our platform and get a shareable link. Distribute
      it wherever you like and start receiving applications.LinkedIn,
      Indeed, Glassdoor or even Whatsapp."
        image={PostOnce}
        reverse={false}
      />

      <FeatureCard
        title="Applications that feel like a conversation"
        description="
            Wave makes job applications more interactive by turning it into a
            conversation. Applicants get detailed overview of what your company
            does with a Careers and a Company page.
            Get higher quality applications and more applicants.
        "
        image={Applications}
        reverse={true}
      />

    </motion.div>
  );
}

export default HumanInTheLoop;
