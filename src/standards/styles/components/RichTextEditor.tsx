import React, { useEffect, useState } from "react";
import ReactQuill, { Quill, ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { SubHeading } from "./heading";
var Font = Quill.import('formats/font');
// We do not add Aref Ruqaa since it is the default
Font.whitelist = ['mirza', 'roboto'];
Font.size=
Quill.register(Font, true);


const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "color",
  "background",
  "link",
];

interface RichTextEditorProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  customStyles?: string;
  examples: string
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  placeholder = "",
  value,
  onChange = () => {},
  customStyles = "",
  examples=''
}) => {

  const [editorValue, setEditorValue] = useState("");


  const handleEditorChange = (content: string) => {
    setEditorValue(content);
    onChange(content);
  };
  
  useEffect(() => {
    setEditorValue(value);
  });

  return (
    <div className={` ${customStyles} mt-14 flex justify-start items-start flex-col`}>
      <SubHeading text={placeholder} customStyles="mb-3 text-sm ml-4" />
      <ReactQuill
        id="no_scroll"
        placeholder={examples}
        value={value}
        onChange={handleEditorChange}
        modules={modules}
        formats={formats}
        className="w-full text-md text-black overflow-y-scroll py-2 rounded-3xl px-4 outline-none focus:border-blue-500 focus:shadow-outline-blue resize-none bg-blue/10"
      />
      
    </div>
  );
};

export default RichTextEditor;
