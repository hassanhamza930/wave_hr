import { useEffect } from "react"
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillFile } from "react-icons/ai";
import { useRecoilState } from "recoil";
import JobApplicationAtom, { ApplyPageIndexAtom, selectedResumeAtom } from "../../atoms/applyPageAtoms";
import { motion } from "framer-motion";



export default function Page4() {

    const [selectedResume, setSelectedResume] = useRecoilState(selectedResumeAtom);
    const [jobApplication, setJobApplication] = useRecoilState(JobApplicationAtom);
    const [pageIndex, setPageIndex] = useRecoilState(ApplyPageIndexAtom);

    useEffect(() => {
        console.log("this is coming from page 4");
        console.log(jobApplication);
    }, []);


    const base64toBlob = (data: string) => {
        // Cut the prefix `data:application/pdf;base64` from the raw base 64
        const base64WithoutPrefix = data.substr('data:application/pdf;base64,'.length);

        const bytes = atob(base64WithoutPrefix);
        let length = bytes.length;
        let out = new Uint8Array(length);

        while (length--) {
            out[length] = bytes.charCodeAt(length);
        }

        return new Blob([out], { type: 'application/pdf' });
    };

    async function saveResumeToLocalStorage() {
        console.log("saving image to loc storage");
        var inputField = window.document.createElement("input");
        inputField.id = "inputField";
        inputField.type = "file";
        inputField.accept = ".pdf";
        inputField.onchange = (e: any) => {
            e.preventDefault();
            var reader = new FileReader();
            var file: File = e.target.files[0];
            reader.readAsDataURL(file);
            reader.onloadend = (file) => {
                console.log("loaded");
                var base64Result = file!.target!.result! as string;
                console.log(base64Result);
                setSelectedResume(base64Result);
            }
        };
        console.log("clicking");
        inputField.click();
        console.log(inputField);
        console.log("clicked");


    }

    function handlePage4Submit() {
        if (selectedResume == "") {
            toast.error("Please upload your resume");
        }
        else {
            setJobApplication({
                ...jobApplication,
                resume: selectedResume
            })
            setPageIndex(4);
        }
    }



    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 50 }
            }}
            className="text-left h-full rounded-md  flex justify-center items-start flex-col p-10 w-full md:w-[60%]">
            <div className="text-3xl font-bold text-tan">Upload your Resume</div>
            <div className="text-xl text-tan mt-2">Add relevant resume for the job posting</div>

            {
                selectedResume == "" ?
                    <button
                        type="button"
                        onClick={() => { saveResumeToLocalStorage() }}
                        style={{
                            backgroundImage: `url('${selectedResume}')`
                        }}
                        className="hover:bg-blue/80 hover:text-tan/90 transition-all duration-100 text-black bg-white/90 bg-contain bg-no-repeat bg-center hover:scale-105 h-36 w-36 rounded-xl mt-10 flex justify-center items-center">
                        {selectedResume == "" && <AiFillFile size={50} />}
                    </button> :
                    <embed
                        src={URL.createObjectURL(base64toBlob(selectedResume))}
                        className="h-48 w-48 mt-10 bg-white/20 rounded-md">

                    </embed>
            }

            <button onClick={() => { handlePage4Submit() }} type="button" className="border-white border-2 hover:bg-white bg-transparent text-tan hover:text-black px-8 py-2 flex flex-row justify-center items-center gap-2 rounded-full mt-10 w-min">
                Next
            </button>

        </motion.div>
    )
}