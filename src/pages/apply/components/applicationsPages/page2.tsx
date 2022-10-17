import { useEffect } from "react"
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillFile } from "react-icons/ai";
import { useRecoilState } from "recoil";
import pageIndexAtom from "../../../newJob/atoms/newJobAtoms";
import JobApplicationAtom, { JobApplication, selectedResumeAtom } from "../../atoms/applyPageAtoms";

export default function Page2() {

    const { watch, handleSubmit, register } = useForm<JobApplication>();
    const [selectedResume, setSelectedResume] = useRecoilState(selectedResumeAtom);
    const [jobApplication, setJobApplication] = useRecoilState(JobApplicationAtom);
    const [pageIndex, setPageIndex] = useRecoilState(pageIndexAtom);

    useEffect(() => {
        console.log("this is coming from page 2");
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

    function handlePage2Submit(){
        if(selectedResume==""){
            toast.error("Please upload your resume");
        }
        else{
            setPageIndex(2);
        }
    }

    return (
        <div className="h-full w-full overflow-y-scroll flex-col justify-start items-start p-10">
            <div className="text-3xl font-bold text-white">Upload your Resume</div>
            <div className="text-xl text-white mt-2">Add relevant resume for the job posting</div>

            {
                selectedResume == "" ?
                    <button
                        type="button"
                        onClick={() => { saveResumeToLocalStorage() }}
                        style={{
                            backgroundColor: selectedResume == "" ? "#eae0d5" : "#eae0d5",
                            backgroundImage: `url('${selectedResume}')`
                        }}
                        className="hover:bg-bray bg-contain bg-no-repeat bg-center hover:scale-105 h-36 w-36 rounded-xl mt-10 flex justify-center items-center">
                        {selectedResume == "" && <AiFillFile color="black" className="opacity-50" size={50} />}
                    </button> :
                    <embed
                        src={URL.createObjectURL(base64toBlob(selectedResume))}
                        className="h-96 w-96 mt-10">

                    </embed>
            }

            <button onClick={()=>{handlePage2Submit()}} type="button" className="border-white border-2 hover:bg-white bg-transparent text-white hover:text-breen px-8 py-2 flex flex-row justify-center items-center gap-2 rounded-md mt-10 w-min">
                Next
            </button>

        </div>
    )
}