import ReactQuill from "react-quill";
import {TextField} from "@mui/material";

interface SimpleInputProps{
    width?: string,
    placeholder:string,
    onChange:any,
    value?:string,
    customStyles?:string
}

function SimpleInput({placeholder="",value="",customStyles="",onChange}:SimpleInputProps) {
    return ( 
        <input placeholder={placeholder} value={value} onChange={(newVal)=>{onChange(newVal.target.value)}} className={`${customStyles} w-full border-b-[1px] border-blue text-blue bg-transparent outline-0 p-2 flex justify-center items-center`}>
        </input>
     );
}

function TextArea({width="",placeholder="",value="",customStyles="",onChange}:SimpleInputProps) {
    return ( 
        <textarea id="no_scroll" className={`${customStyles} h-48 w-full pb-12 text-blue border-b-[1px] outline-none border-blue bg-transparent`} value={value} placeholder={placeholder} onChange={(newVal)=>{onChange(newVal.target.value)}} />
     );
}




export default SimpleInput;
export {TextArea}