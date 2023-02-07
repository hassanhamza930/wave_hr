import ReactQuill from "react-quill";
import { TextField } from "@mui/material";
import { SubHeading } from "./heading";

interface SimpleInputProps {
    width?: string,
    placeholder: string,
    onChange: any,
    value?: string,
    customStyles?: string
}

function SimpleInput({ placeholder = "", value = "", customStyles = "", onChange }: SimpleInputProps) {
    return (
        <div className={` ${customStyles} flex justify-start items-start flex-col`}>
            <SubHeading text={placeholder} customStyles="mb-2 text-sm"></SubHeading>
            <input value={value} onChange={(newVal) => { onChange(newVal.target.value) }} className={` w-96 text-sm border-b-[1px] border-blue text-blue bg-transparent outline-0 p-2 flex justify-center items-center`}>
            </input>
        </div>
    );
}

function TextArea({ width = "", placeholder = "", value = "", customStyles = "", onChange }: SimpleInputProps) {
    return (
        <div className={` ${customStyles} flex justify-start items-start flex-col`}>
            <SubHeading text={placeholder} customStyles="mb-2 text-sm"></SubHeading>
            <textarea id="no_scroll" value={value} onChange={(newVal) => { onChange(newVal.target.value) }} className={` h-48 w-96 border-[1px] border-blue text-sm text-blue bg-transparent outline-0 py-2 px-4 rounded-md flex justify-center items-center`}>
            </textarea>
        </div>
        // <textarea id="no_scroll" className={`${customStyles} h-48 w-full pb-12 text-blue border-b-[1px] outline-none border-blue bg-transparent`} value={value} placeholder={placeholder} onChange={(newVal) => { onChange(newVal.target.value) }} />
    );
}
//Need to figure out some way to add line breaks here.




export default SimpleInput;
export { TextArea }