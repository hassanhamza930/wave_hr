import { useRecoilState } from "recoil";
import globalUserAtom from "../../../atoms/app/globalUserAtom";
import { AiFillCamera } from "react-icons/ai";

export default function CompanyOnboardingPopup() {
    const [globalUser, setGlobalUser] = useRecoilState(globalUserAtom);

    return (
        <div className="z-50 fixed h-screen w-full bg-bray/80 flex justify-center items-center">

            <div className="w-[600px] h-[80%] text-breen overflow-y-scroll bg-white/90 rounded-xl flex-col justify-start items-start p-10 gap">
                <div className="text-4xl font-bold">Hello {globalUser.name},</div>
                <div className="text-2xl font-bold">Let's get you started</div>
                <div className="text-md font-regular mt-3">Please tell us more about your company</div>
                <div className="text-md font-regular mt-1">You can edit these details later.</div>


                <div className="text-md font-bold mt-10">Add a company logo</div>
                <button className="hover:bg-bray hover:scale-105 h-36 w-36 bg-breen rounded-xl mt-3 flex justify-center items-center">
                    <AiFillCamera color="white" className="opacity-50" size={50} />
                </button>


                <div className="text-md font-bold mt-10">What's your company called?</div>
                <input className=" w-96 border-b-2 border-breen bg-transparent outline-0 px-2 py-1 mt-3 flex justify-center items-center">
                </input>

                <div className="text-md font-bold mt-10">A brief description of your company.</div>
                <textarea className="h-16 w-96 border-b-2 border-breen bg-transparent outline-0 px-2 font-medium py-1 mt-3 flex justify-center items-center">
                </textarea>

                <div className="text-md font-bold mt-10">How many team members do you currently have?</div>
                <input type="number" min={0} max={300} className=" w-96 border-b-2 border-breen bg-transparent outline-0 px-2 py-1 mt-3 flex justify-center items-center">
                </input>


                <div className="text-md font-bold mt-10">What's the average salary of employees at your company?</div>
                <div className="flex flex-row justify-start items-start ">
                    <div className="h-14 w-8 flex justify-center items-center text-md text-breen font-bold">$</div>
                    <input type="number" min={0} max={300} className=" w-96 border-b-2 border-breen bg-transparent outline-0 px-2 py-1 mt-3 flex justify-center items-center">
                    </input>
                </div>
                <div className="text-sm text-bray/70 font-regular mt-2">This information is kept private</div>




                <div className="text-md font-regular mt-20 w-full flex flex-row justify-start items-end">
                    <button className="bg-breen hover:bg-bray hover:scale-105 rounded-md px-8 py-2 text-white">Start</button>
                </div>




            </div>


        </div>

    )
}