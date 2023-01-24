import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import hil from "../../../images/landingPage/hil.mp4"

function HumanInTheLoop() {

    const [playing, setplaying] = useState(false);

    useEffect(()=>{
        setplaying(true);
    },[]);

    return (
        <div className="h-screen w-full bg-tan flex justify-center items-center ">
            <div className="w-2/4 h-full flex justify-center items-center bg-purple">
            </div>
            <div className=" w-2/4 h-full flex justify-center items-center pr-5">
                <ReactPlayer height={"100%"} width={"100%"} url={"./hil.mp4"} controls={false} playing={playing} muted loop  />
            </div>

        </div>
    );
}

export default HumanInTheLoop;