import ReactQuill from "react-quill";
import { SubHeading } from "./heading";

interface SimpleInputProps {
    width?: string,
    placeholder: string,
    onChange: any,
    value?: string,
    customStyles?: string,
    examples?:string,
}

export const parseLines = (value:any) => value.replace(/(\\n)/g, "\n"); 

function SimpleInput({ placeholder = "", value = "", customStyles = "", onChange, examples="" }: SimpleInputProps) {
    return (
        <div className={` ${customStyles} flex justify-start items-start flex-col`}>
            <SubHeading text={placeholder} customStyles="mb-2 text-sm"></SubHeading>
            <input placeholder={examples} value={value.replace("<br/>","\n")} onChange={(newVal) => { onChange(newVal.target.value.replace("\n","<br/>")) }} className={` w-96 text-sm border-b-[1px] border-blue text-blue bg-transparent outline-0 p-2 flex justify-center items-center`}>
            </input>
        </div>
    );
}

function TextArea({ width = "", placeholder = "", value = "", customStyles = "", onChange,examples="" }: SimpleInputProps) {
    
    

    return (
        <div className={` ${customStyles} flex justify-start items-start flex-col`}>
            <SubHeading text={placeholder} customStyles="mb-2 text-sm"></SubHeading>
            <textarea 
              id="no_scroll" placeholder={examples} value={parseLines(value)} onChange={(newVal) => {onChange(parseLines(newVal.target.value)) }} className={` h-48 w-[600px] border-[1px] border-blue text-sm text-blue bg-transparent outline-0 py-2 px-4 rounded-md flex justify-center items-center`}>
            </textarea>
        </div>
    );
}
//Need to figure out some way to add line breaks here.




export default SimpleInput;
export { TextArea }