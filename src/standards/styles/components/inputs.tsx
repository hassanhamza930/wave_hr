import ReactQuill from 'react-quill';
import { SubHeading } from './heading';
import { Gi3DGlasses } from 'react-icons/gi';
import { BiSearch } from 'react-icons/bi';

interface SimpleInputProps {
  width?: string;
  placeholder: string;
  onChange: any;
  value?: string;
  customStyles?: string;
  examples?: string;
}

function SimpleInput({
  placeholder = '',
  value = '',
  customStyles = '',
  onChange,
  examples = '',
}: SimpleInputProps) {
  return (
    <div className={` ${customStyles} flex justify-start items-start flex-col`}>
      <SubHeading
        text={placeholder}
        customStyles='mb-3 text-sm ml-4'
      ></SubHeading>
      <input
        placeholder={examples}
        value={value.replace('<br/>', '\n')}
        onChange={(newVal) => {
          onChange(newVal.target.value.replace('\n', '<br/>'));
        }}
        className={` w-full text-sm  text-black bg-blue/10 rounded-full px-8 py-6 outline-0 flex justify-center items-center`}
      ></input>
    </div>
  );
}

export function SearchBar({
  placeholder = '',
  value = '',
  customStyles = '',
  onChange,
}: SimpleInputProps) {
  return (
    <div
      className={` ${customStyles} flex flex-row justify-center items-center w-full border-b-[1px] border-blue text-blue bg-transparent px-7 py-5`}
    >
      <BiSearch color='black' className='' />
      <input
        placeholder={placeholder}
        value={value}
        onChange={(newVal) => {
          onChange(newVal);
        }}
        className={` w-full text-black text-sm bg-transparent outline-none px-2 flex justify-center items-center placeholder:text-black`}
      ></input>
    </div>
  );
}

function TextArea({
  placeholder = '',
  value = '',
  customStyles = '',
  onChange,
  examples = '',
}: SimpleInputProps) {
  return (
    <div className={` ${customStyles} flex justify-start items-start flex-col`}>
      <SubHeading
        text={placeholder}
        customStyles='mb-3 text-sm ml-4'
      ></SubHeading>
      <textarea
        placeholder={examples}
        value={value}
        onChange={(newVal) => {
          onChange(newVal.target.value);
        }}
        className={` w-full text-sm h-48  text-black bg-blue/10 rounded-3xl px-8 py-6 outline-0 flex justify-center items-center`}
      ></textarea>
    </div>
  );
}

//Need to figure out some way to add line breaks here.

export default SimpleInput;
export { TextArea };
