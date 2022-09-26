import { BsArrowDownShort } from "react-icons/bs";

export default function SayGoodByeToExcelSheets() {
    return (
        <div className="h-min w-full flex justify-start items-start px-[15%] py-24 flex flex-col justify-start items-start">
            <div className="text-purple text-7xl font-bold">Say Goodbye to excel sheets</div>
            <div className="text-purple text-4xl font-bold">Simple drag and drop to manage and sort talent</div>

            <div className="text-purple text-xl font-regular mt-5">
                Bring exception talent to the top of the list.
            </div>

            <div className="h-12 w-12 mt-10 bg-purple rounded-md flex justify-center items-center">
                <BsArrowDownShort size={40} color="white"></BsArrowDownShort>
            </div>
        </div>
    )

}