import { useRecoilState } from "recoil";
import globalUserAtom from "../../../atoms/app/globalUserAtom";
import { AiFillCamera } from "react-icons/ai";
import selectedImageAtom from "../../../atoms/home/selectedImage";
import useSaveImageToLocalStorage from "../logic/useSaveImageToLocalStorage";
import { useForm } from "react-hook-form";
import useSubmitOnboardingDataToFirebase, { CompanyOnboardingData } from "../logic/useSubmitOnboardingDataToFirebase";

export default function CompanyOnboardingPopup() {
    const [globalUser, setGlobalUser] = useRecoilState(globalUserAtom);
    const [selectedImage, setSelectedImageState] = useRecoilState(selectedImageAtom);
    const { saveImageToLocalStorage } = useSaveImageToLocalStorage();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<CompanyOnboardingData>();
    const { submitOnboardingDataToFirebase } = useSubmitOnboardingDataToFirebase();

    return (
        <div className="fixed z-50 h-screen w-full bg-blue/80 flex justify-center items-center">

            <div className="w-[600px] h-[80%] text-breen overflow-y-scroll bg-white/90 rounded-xl flex-col justify-start items-start p-10 gap">
                <div className="text-4xl font-bold">Hello {globalUser.name},</div>
                <div className="text-2xl font-bold">Let's get you started</div>
                <div className="text-md font-regular mt-3">Please tell us more about your company</div>
                <div className="text-md font-regular mt-1">You can edit these details later.</div>


                <form onSubmit={handleSubmit(submitOnboardingDataToFirebase)} >
                    <div className="text-md font-bold mt-10">Add a company logo</div>
                    <button
                        type="button"
                        onClick={() => {
                            saveImageToLocalStorage();
                        }}
                        style={{
                            backgroundColor: selectedImage == "" ? "#06283D" : "#eae0d5",
                            backgroundImage: `url('${selectedImage}')`
                        }}
                        className="hover:bg-blue bg-contain bg-no-repeat bg-center hover:scale-105 h-36 w-36 rounded-xl mt-3 flex justify-center items-center">
                        {selectedImage == "" && <AiFillCamera color="white" className="opacity-50" size={50} />}
                    </button>


                    <div className="text-md font-bold mt-10">What's your company called?</div>
                    <input {...register("companyName")} className=" w-96 border-b-2 border-breen bg-transparent outline-0 px-2 py-1 mt-3 flex justify-center items-center">
                    </input>

                    <div className="text-md font-bold mt-10">A brief description of your company.</div>
                    <textarea
                        {...register("companyDescription")}
                        className="h-16 w-96 border-b-2 border-breen bg-transparent outline-0 px-2 font-medium py-1 mt-3 flex justify-center items-center">
                    </textarea>

                    <div className="text-md font-bold mt-10">How many team members do you currently have?</div>
                    <input
                        {...register("numberOfTeamMembers")}
                        type="number" min={0} max={300} className=" w-96 border-b-2 border-breen bg-transparent outline-0 px-2 py-1 mt-3 flex justify-center items-center">
                    </input>


                    <div className="text-md font-bold mt-10">What's the average yearly salary of<br />employees at your company?</div>
                    <div className="flex flex-row justify-start items-start ">
                        <div className="h-14 w-8 flex justify-center items-center text-md text-breen font-bold">$</div>
                        <input
                            {...register("averageSalaryOfEmployees")}
                            type="number" min={0} max={300000} className=" w-[350px] border-b-2 border-breen bg-transparent outline-0 px-2 py-1 mt-3 flex justify-center items-center">
                        </input>
                    </div>
                    <div className="text-sm text-bray/70 font-regular mt-2">This information is kept private</div>




                    <div className="text-md font-regular mt-10 w-full flex flex-row justify-start items-end">
                        <button type="submit" className="bg-blue hover:bg-blue hover:scale-105 rounded-md px-8 py-2 text-white">Start</button>
                    </div>
                </form>




            </div>


        </div>

    )
}