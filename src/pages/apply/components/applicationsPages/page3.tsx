import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillCamera } from "react-icons/ai";
import { useRecoilState } from "recoil";
import pageIndexAtom from "../../../newJob/atoms/newJobAtoms";
import JobApplicationAtom, { ApplyPageIndexAtom, JobApplication, selectedProfilePictureAtom } from "../../atoms/applyPageAtoms";
import { motion } from "framer-motion";
import { ApplicationDataInterface } from "../../../../standards/interfaces/interfaces";

export default function Page3() {

    const [selectedProfilePicture, setSelectedProfilePicture] = useRecoilState(selectedProfilePictureAtom);
    const { watch, handleSubmit, register } = useForm<JobApplication>();
    const [jobApplication, setJobApplication] = useRecoilState(JobApplicationAtom);
    const [pageIndex, setPageIndex] = useRecoilState(ApplyPageIndexAtom);

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
                setSelectedProfilePicture(base64Result);
            }
        };
        inputField.click();
    }

    function handlePage3DataSubmit(data: ApplicationDataInterface) {

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
        <motion.form 
        initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 50 }
            }}
        onSubmit={handleSubmit(handlePage3DataSubmit)} className="text-left h-full rounded-md  flex justify-center items-start flex-col p-10 w-full md:w-[60%]">
           
            <div className="text-3xl text-start font-bold text-tan">Upload your profile picture</div>
            <div className="text-xl text-left text-tan mt-2">Make a solid first impression.</div>


            <div className="text-md text-tan/80 mt-10">Add your profile picture</div>
            <button
                type="button"
                onClick={() => { saveImageToLocalStorage() }}
                style={{
                    backgroundImage: `url('${selectedProfilePicture}')`
                }}
                className="hover:bg-blue/80 hover:text-tan/90 transition-all duration-100 bg-white/90 bg-contain bg-no-repeat bg-center hover:scale-105 h-36 w-36 rounded-xl mt-3 flex justify-center items-center">
                {selectedProfilePicture == "" && <AiFillCamera size={50} />}
            </button>

            <button type="submit" className="border-tan border-2 hover:bg-tan bg-transparent text-tan hover:text-black px-8 py-2 flex flex-row justify-center items-center gap-2 rounded-full mt-20 w-min">
                Next
            </button>


        </motion.form>
    )
}