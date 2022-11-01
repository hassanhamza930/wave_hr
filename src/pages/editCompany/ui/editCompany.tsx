import { useForm } from "react-hook-form";
import { AiFillCamera } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { SelectedCompanyLogoAtom } from "../atoms/editCompanyAtoms";

export default function EditCompany() {

    const { watch, handleSubmit, register } = useForm();
    const [selectedCompanyLogo,setSelectedCompanyLogo]=useRecoilState<string>(SelectedCompanyLogoAtom);

    function changeCompanyDetails(data: any) {

    }

    async function saveImageToLocalStorage() {
        var inputField = document.createElement("input");
        inputField.type = "file";
        inputField.accept="image/png, image/jpeg, .svg";
        inputField.onchange = (e: any) => {
            e.preventDefault();
            var reader = new FileReader();
            var file: File = e.target.files[0];
            reader.readAsDataURL(file);
            reader.onloadend = (file) => {
                console.log("loaded");
                var base64Result=file!.target!.result! as string;
                console.log(base64Result);
                setSelectedCompanyLogo(base64Result);
            }
        };
        inputField.click();
    }



    return (
        <div className="pt-[80px] h-screen w-full flex justify-center items-center overflow-y-scroll ">
            <form className="h-full" onSubmit={handleSubmit(changeCompanyDetails)} >
                <div className="h-full w-[600px] p-5 overflow-y-scroll flex flex-col justify-start items-start">
                    <div className="text-bray text-sm font-regular mt-10">What's your company called?</div>
                    <input {...register("name")} placeholder="Company Name" className="mt-5 w-48 md:w-full border-b-[1px] border-bray/90 text-bray/80 bg-transparent outline-0 px-2 py-1 flex justify-center items-center"></input>

                    <div className="text-bray text-sm font-regular mt-10">Select a company logo</div>
                    <button
                        type="button"
                        onClick={() => { saveImageToLocalStorage() }}
                        style={{
                            backgroundColor: selectedCompanyLogo == "" ? "#eae0d5" : "#eae0d5",
                            backgroundImage: `url('${selectedCompanyLogo}')`
                        }}
                        className="hover:bg-bray bg-bray bg-contain bg-no-repeat bg-center hover:scale-105 h-36 w-36 rounded-xl mt-3 flex justify-center items-center">
                        {selectedCompanyLogo == "" && <AiFillCamera color="black" className="opacity-50" size={50} />}
                    </button>

                    <div className="text-bray text-sm font-regular mt-10">What's your company called?</div>
                    <input {...register("name")} placeholder="Company Name" className="mt-5 w-48 md:w-full border-b-[1px] border-bray/90 text-bray/80 bg-transparent outline-0 px-2 py-1 flex justify-center items-center"></input>



                </div>
            </form>
        </div>
    )
}