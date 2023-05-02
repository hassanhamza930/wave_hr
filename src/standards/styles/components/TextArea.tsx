import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { SubHeading } from "./heading";

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
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  customStyles?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  placeholder = "",
  value = "",
  onChange = () => {},
  customStyles = "",
}) => {
  const [editorValue, setEditorValue] = useState(value);

  const handleEditorChange = (content: string) => {
    setEditorValue(content);
    onChange(content);
  };

  return (
    <div className={` ${customStyles} flex justify-start items-start flex-col`}>
      <SubHeading text={placeholder} customStyles="mb-3 text-sm ml-4" />
      <ReactQuill
        placeholder={placeholder}
        value={editorValue}
        onChange={handleEditorChange}
        modules={modules}
        formats={formats}
        className="w-full text-sm text-gray-800 rounded-3xl  h-48 py-2 px-4 outline-none focus:border-blue-500 focus:shadow-outline-blue resize-none bg-blue/10"
      />
    </div>
  );
};

export default RichTextEditor;
