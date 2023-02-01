import ReactQuill from "react-quill";

interface SimpleInputProps{
    width?: string,
    placeholder:string,
    onChange:any,
    value?:string,
    customStyles?:string
}

function SimpleInput({width="w-96",placeholder="",value="",customStyles="",onChange}:SimpleInputProps) {
    return ( 
        <input placeholder={placeholder} value={value} onChange={(newVal)=>{onChange(newVal.target.value)}} className={`${customStyles} w-96 border-b-[1px] border-blue text-blue bg-transparent outline-0 px-2 py-1 mt-3 flex justify-center items-center`}>
        </input>
     );
}

function RichTextarea({width="",placeholder="",value="",customStyles="",onChange}:SimpleInputProps) {
    return ( 
        <ReactQuill className={`${customStyles} h-48 w-2/4 pb-12 text-blue border-[1px] border-blue mt-4`} theme={"snow"} value={value} onChange={(newVal)=>{onChange(newVal)}} />
     );
}
//Need to convert this to a simple textare with a reasonable size to make it more easy and avoid confusions.




export default SimpleInput;
export {RichTextarea}