import { AiFillCamera } from "react-icons/ai";
import { BiCamera } from "react-icons/bi";
import { SubHeading } from "../../../standards/styles/components/heading";

interface CompanyBannerInputs {
    customStyles?: string,
    setCompanyBanner: Function,
    companyBannerValue: string
}




function CompanyBanner({ customStyles = "", setCompanyBanner, companyBannerValue }: CompanyBannerInputs) {


    function UpdateCompanyCoverImage() {
        var inputField = document.createElement("input");
        inputField.type = "file";
        inputField.accept = "image/png, image/jpeg, .svg";
        inputField.onchange = (e: any) => {
            e.preventDefault();
            var reader = new FileReader();
            var file: File = e.target.files[0];
            reader.readAsDataURL(file);
            reader.onloadend = (file) => {
                console.log("loaded");
                var base64Result = file!.target!.result! as string;
                console.log(base64Result);
                setCompanyBanner(base64Result);
            }
        };
        inputField.click();
    }

    return (
        <div style={{backgroundImage:`url('${companyBannerValue==""?"https://assets-global.website-files.com/5c7fdbdd4e3feeee8dd96dd2/62c4ff55b8637de51557f5f0_growth-flat-color.gif":companyBannerValue}')`}} className={` ${customStyles} w-full h-48 bg-blue bg-cover shadow-xl bg-center rounded-md flex justify-end items-end p-10`}>

            <div className="flex flex-row justify-end items-center">
                {/* <SubHeading text="Add company banner (Optional)" color="text-tan/80" customStyles="text-sm pr-5"></SubHeading> */}
                <button onClick={() => { UpdateCompanyCoverImage() }} className="transition ease-in-out duration-100 hover:scale-105 shadow-md h-14 w-14 flex justify-center items-center rounded-md bg-tan">
                    <AiFillCamera className="text-blue/70 h-8 w-8" />
                </button>
            </div>

        </div>
    );
}




export default CompanyBanner;