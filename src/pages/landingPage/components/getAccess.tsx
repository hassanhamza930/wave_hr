import leftBarImage from "../../../images/landingPage/landingPageLeftSideBarImage.svg";
import {AiOutlineArrowRight} from "react-icons/ai";
import { useNavigate } from "react-router-dom";


function GetAccess() {

    const navigate=useNavigate();

    return (
        <div className="h-screen bg-tan w-full flex flex-row justify-center items-center">
            <img src={leftBarImage} className="h-3/5 w-2/5" />

            <div className="w-3/5 h-full flex justify-center items-center px-24 pt-[2%]">
                <div className=" h-full w-full flex flex-col justify-center items-start gap-0">
                    <div className="font-bold text-8xl text-blue">WaveHR</div>
                    <div className="text-3xl ml-2 tracking-tighter text-black">HR software for the startup</div>
                    <div className="text-xl ml-2 tracking-tighter mt-10 text-black">
                        Wave is an integrated suite of highly effective tools that allows you to streamline your hiring process, find the best candidates, and fill open positions faster than ever before.
                    </div>
                    <div className="text-md ml-2 mt-10 tracking-tighter underline text-black">
                        Filter all candidates to remove the clutter <br />
                        Track Candidates and resumes in one integrated dashboard<br />
                        Schedule and conduct interviews with ease<br />
                        Onboard with ease<br />
                        Get a shareable link to your company’s careers page<br />
                    </div>

                    <button onClick={()=>{navigate("/login")}} className="flex flex-row justify-center items-center text-md font-medium px-6 py-1 hover:bg-purp bg-blue rounded-full mt-10 text-white/80">
                        Get Access
                        <AiOutlineArrowRight  className="h-10 mt-[1px]  ml-5"/>
                    </button>


                </div>
            </div>

        </div>
    );
}

export default GetAccess;