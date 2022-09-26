import { BsArrowRightShort, BsFillPlusSquareFill } from "react-icons/bs";

export default function Page4() {

    return (
        <div className="h-screen w-full flex justify-start items-start px-[15%] py-24 flex flex-col justify-start items-start">
            <div className="text-purple text-7xl font-bold">Job Applications</div>
            <div className="text-purple text-4xl font-bold">that feel like a conversation</div>


            <div className="text-purple text-xl font-regular mt-5">
                Hey Jacob 👋 , we’re glad you’re here.
                <br/>
                Please Upload a profile picture.
            </div>

            <button placeholder="What should we call you?" className="h-36 w-36 bg-bray rounded-md bg-purple my-10 flex justify-center items-center">
                <BsFillPlusSquareFill color="#F9F7F7" size={50}></BsFillPlusSquareFill>
            </button>


            <div className="h-12 w-12 mt-10 bg-purple rounded-md flex justify-center items-center">
                <BsArrowRightShort size={40} color="white"></BsArrowRightShort>
            </div>
        </div>
    )

}