import { useState } from "react"
import { AiFillCamera } from "react-icons/ai";

export default function Page1() {

    const [selectedImage,setSelectedImage]=useState("");

    return (
        <div className="h-full w-full rounded-md flex justify-start items-start flex-col p-10">
            <div className="text-3xl font-bold text-white">Let's get your application started</div>
            <div className="text-xl text-white mt-2">Tell us a bit more about yourself</div>

            <input placeholder="Full Name" className="mt-10 w-96 border-b-[1px] border-white/90 text-white/90 bg-transparent outline-0 px-2 py-1 flex justify-center items-center">
            </input>

            <input placeholder="Email" className="mt-10 w-96 border-b-[1px] border-white/90 text-white/90 bg-transparent outline-0 px-2 py-1 flex justify-center items-center">
            </input>

            <div className="text-md text-white mt-10">Add a company logo</div>
            <button
                type="button"
                onClick={() => {
                    // saveImageToLocalStorage();
                }}
                style={{
                    backgroundColor: selectedImage == "" ? "#eae0d5" : "#eae0d5",
                    backgroundImage: `url('${selectedImage}')`
                }}
                className="hover:bg-bray bg-contain bg-no-repeat bg-center hover:scale-105 h-36 w-36 rounded-xl mt-3 flex justify-center items-center">
                {selectedImage == "" && <AiFillCamera color="black" className="opacity-50" size={50} />}
            </button>


        </div>
    )
}