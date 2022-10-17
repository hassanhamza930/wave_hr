import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillCamera } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { JobPosting } from "../../../jobs/components/JobCard";
import pageIndexAtom from "../../../newJob/atoms/newJobAtoms";
import JobApplicationAtom, { JobApplication, selectedProfilePictureAtom } from "../../atoms/applyPageAtoms";

export default function Page3() {

    const [selectedProfilePicture, setSelectedProfilePicture] = useRecoilState(selectedProfilePictureAtom);
    const { watch, handleSubmit, register } = useForm<JobApplication>();
    const [jobApplication, setJobApplication] = useRecoilState(JobApplicationAtom);
    const [pageIndex, setPageIndex] = useRecoilState(pageIndexAtom);

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

    function handlePage3DataSubmit(data: JobApplication) {

        if (selectedProfilePicture=="") {
            toast.error("Please select an image")
        }
        else {
            setJobApplication({
                ...jobApplication,
                profilePicture:selectedProfilePicture
            });
            setPageIndex(3);
        }
    }


    useEffect(() => {
        console.log("this is coming from page3");
        console.log(jobApplication);
    }, [])

    return (
        <form onSubmit={handleSubmit(handlePage3DataSubmit)} className="text-left h-full rounded-md overflow-y-scroll flex justify-center items-start flex-col p-10 w-full md:w-[60%]">
           
            <div className="text-3xl text-start font-bold text-white">Upload your<br/>profile picture</div>
            <div className="text-xl text-left text-white mt-2">Make a solid first impression.</div>


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
            </button>

            <button type="submit" className="border-white border-2 hover:bg-white bg-transparent text-white hover:text-breen px-8 py-2 flex flex-row justify-center items-center gap-2 rounded-md mt-20 w-min">
                Next
            </button>


        </form>
    )
}