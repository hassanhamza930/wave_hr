import { AiFillCamera } from "react-icons/ai";
import { BiCamera } from "react-icons/bi";
import { SubHeading } from "../../../standards/styles/components/heading";

interface CompanyBannerInputs {
    customStyles?: string
}

function CompanyBanner({ customStyles = "" }: CompanyBannerInputs) {
    return (
        <div className={` ${customStyles} w-[1000px] h-72 bg-blue bg-cover bg-center bg-[url('https://assets-global.website-files.com/5c7fdbdd4e3feeee8dd96dd2/62c4ff55b8637de51557f5f0_growth-flat-color.gif')] rounded-md flex justify-end items-end p-10`}>

            <div className="flex flex-row justify-end items-center">
                {/* <SubHeading text="Add company banner (Optional)" color="text-tan/80" customStyles="text-sm pr-5"></SubHeading> */}
                <button className="hover:scale-105 shadow-md h-14 w-14 flex justify-center items-center rounded-md bg-tan">
                    <AiFillCamera className="text-blue/70 h-8 w-8" />
                </button>
            </div>

        </div>
    );
}

export default CompanyBanner;