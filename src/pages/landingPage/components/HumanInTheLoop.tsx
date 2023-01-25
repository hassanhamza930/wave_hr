import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import hil from "../../../images/landingPage/hil.mp4"
import { TbArrowLoopRight2 } from "react-icons/tb";
import { BsFillShareFill } from "react-icons/bs";
import { BiConversation } from "react-icons/bi";

function HumanInTheLoop() {

    const [playing, setplaying] = useState(false);

    useEffect(() => {
        setplaying(true);
    }, []);

    return (
        <div className="relative h-[900px] w-full font-['Inter'] tracking-tight bg-tan flex justify-center items-center ">
            
            <div className="absolute z-10 w-full text-tan h-full flex flex-col gap-5 justify-center items-center py-20 bg-tan/90 backdrop-blur-sm ">

                <div className="hover:bg-purp hover:text-tan bg-blue w-3/5 text-tan rounded-md shadow-xl p-10 flex justify-start items-start flex-col">
                    <div className="text-4xl font-bold flex flex-row justify-center items-center gap-2">
                        Human in the Loop
                        <TbArrowLoopRight2 />
                    </div>

                    <div className="w-full text-md font-medium mt-2 ">
                        Wave follows a human in the loop approach to hiring,<br />
                        We believe traditional ATS software hurts diversity and inclusion and skims over people who could be part of your dream team.
                        <br />Wave provides you the tools to streamline your hiring pipeline while making sure every candidate resume is reviewed by human eyes.
                    </div>

                </div>


                <div className="hover:bg-purp hover:text-tan bg-blue w-3/5 text-tan rounded-md shadow-xl p-10 flex justify-start items-start flex-col">
                    <div className="text-4xl font-bold flex flex-row justify-center items-center gap-4">
                        Post Once,Share Everywhere
                        <BsFillShareFill className="mt-2" size={25} />
                    </div>

                    <div className="w-full text-md font-medium mt-2 ">
                        Post your job on our platform and get a shareable link,<br />
                        Distribute it wherever you like and start receiving applications.
                        <br />LinkedIn, Indeed, Glassdoor or even Whatsapp.
                    </div>
                </div>


                <div className="hover:bg-purp hover:text-tan bg-blue w-3/5 text-tan rounded-md shadow-xl p-10 flex justify-start items-start flex-col">
                    <div className="text-4xl font-bold flex flex-row justify-center items-center gap-4">
                        Applications that feel like a conversation
                        <BiConversation className="mt-2" size={30} />
                    </div>

                    <div className="w-full text-md font-medium mt-2 ">
                        Wave makes job applications more interactive by turning it into a conversation,<br />
                        Applicants get detailed overview of what your comapny does with a Careers and a Company page.<br />
                        Get higher quality applications and get more applicants.
                    </div>
                </div>


            </div>
            <div className="absolute z-0 w-full h-full flex justify-center items-center">
                <ReactPlayer height={"100%"} width={"100%"} url={"./hil.mp4"} controls={false} playing={playing} muted loop />
            </div>

        </div>
    );
}

export default HumanInTheLoop;