import {BsArrowDownShort} from "react-icons/bs";

export default function Page2() {
    return (
        <div className="h-screen w-full flex justify-start items-start px-[15%] py-24 flex flex-col justify-start items-start">
            <div className="text-purple text-7xl font-bold">We believe</div>
            <div className="text-purple text-4xl font-bold">Every application deserves to be seen!</div>

            <div className="text-purple text-xl font-regular mt-10">
                Traditional Application Tracking Software skims over people
                who could be part of your dream team. Wave takes a different approach.
            </div>

            <div className="text-purple text-xl font-regular mt-5">
                Here’s how we make sure hiring is a breeze for you.
            </div>

            <div className="h-12 w-12 mt-10 bg-purple rounded-md flex justify-center items-center">
                <BsArrowDownShort size={40} color="white"></BsArrowDownShort>
            </div>
        </div>
    )

}