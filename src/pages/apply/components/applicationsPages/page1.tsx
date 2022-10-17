import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillCamera } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { JobPosting } from "../../../jobs/components/JobCard";
import pageIndexAtom from "../../../newJob/atoms/newJobAtoms";
import JobApplicationAtom, { ApplyPageIndexAtom, JobApplication, selectedProfilePictureAtom } from "../../atoms/applyPageAtoms";

export default function Page1() {

    const [selectedProfilePicture, setSelectedProfilePicture] = useRecoilState(selectedProfilePictureAtom);
    const { watch, handleSubmit, register } = useForm<JobApplication>();
    const [jobApplication, setJobApplication] = useRecoilState(JobApplicationAtom);
    const [pageIndex, setPageIndex] = useRecoilState(ApplyPageIndexAtom);

    async function saveImageToLocalStorage() {
        console.log("saving image to loc storage");
        var inputField = window.document.createElement("input");
        inputField.id = "inputField";
        inputField.type = "file";
        inputField.accept = "image/png, image/jpeg, .svg";
        inputField.onchange = (e: any) => {
            e.preventDefault();
            var reader = new FileReader();
            var file: File = e.target.files[0];
            reader.readAsDataURL(file);
            reader.onloadend = (file) => {
                console.log("loaded");
                var base64Result = file!.target!.result! as string;
                console.log(base64Result);
                setSelectedProfilePicture(base64Result);
            }
        };
        console.log("clicking");
        inputField.click();
        console.log(inputField);
        console.log("clicked");

    }

    function handlePage1DataSubmit(data: JobApplication) {

        if (watch("name") == "" ) {
            toast.error("Please enter your name")
        }
        else {
            setJobApplication({
                ...jobApplication,
                name:data.name
            });
            setPageIndex(1);
        }
    }


    useEffect(() => {
        console.log(jobApplication);
    }, [])

    return (
        <form onSubmit={handleSubmit(handlePage1DataSubmit)} className="text-left h-full flex justify-center items-start flex-col p-10 w-full md:w-[60%]">
            <div className="text-3xl text-start font-bold text-white">Let's get your application started</div>
            <div className="text-xl text-left text-white mt-2">Tell us a bit more about yourself</div>


            <input {...register("name")} placeholder="Full Name" className="mt-10 w-48 md:w-96 border-b-[1px] border-white/90 text-white/90 bg-transparent outline-0 px-2 py-1 flex justify-center items-center">
            </input>

            {/* <input {...register("email")} placeholder="Email" className="mt-10 w-96 border-b-[1px] border-white/90 text-white/90 bg-transparent outline-0 px-2 py-1 flex justify-center items-center">
            </input>

            <div className="text-md text-white/80 mt-10">Add your profile picture</div>
            <button
                type="button"
                onClick={() => { saveImageToLocalStorage() }}
                style={{
                    backgroundColor: selectedProfilePicture == "" ? "#eae0d5" : "#eae0d5",
                    backgroundImage: `url('${selectedProfilePicture}')`
                }}
                className="hover:bg-bray bg-contain bg-no-repeat bg-center hover:scale-105 h-36 w-36 rounded-xl mt-3 flex justify-center items-center">
                {selectedProfilePicture == "" && <AiFillCamera color="black" className="opacity-50" size={50} />}
            </button> */}

            <button type="submit" className="border-white border-2 hover:bg-white bg-transparent text-white hover:text-breen px-8 py-2 flex flex-row justify-center items-center gap-2 rounded-md mt-20 w-min">
                Next
            </button>


        </form>
    )
}