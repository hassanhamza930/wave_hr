import {BsArrowRightShort} from "react-icons/bs";

export default function Page3() {

    return (
        <div className="h-screen w-full flex justify-start items-start px-[15%] py-24 flex flex-col justify-start items-start">
            <div className="text-purple text-7xl font-bold">Job Applications</div>
            <div className="text-purple text-4xl font-bold">that feel like a conversation</div>

            <input placeholder="What should we call you?" className="border-b-2 p-2 bg-transparent focus:ring-0 border-purple border-0 text-purple text-md font-regular mt-10">
            </input>


            <div className="h-12 w-12 mt-10 bg-purple rounded-md flex justify-center items-center">
                <BsArrowRightShort size={40} color="white"></BsArrowRightShort>
            </div>
        </div>
    )

}