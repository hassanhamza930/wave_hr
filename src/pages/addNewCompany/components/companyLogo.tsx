import { AiFillCamera } from "react-icons/ai";

interface CompanyLogoInputs {
    setCompanyLogo: Function,
    companyLogoValue: string
}

function CompanyLogo({setCompanyLogo,companyLogoValue}:CompanyLogoInputs) {



    function UpdateCompanyLogo() {
        var inputField = document.createElement("input");
        inputField.type = "file";
        inputField.accept = "image/png, image/jpeg";
        inputField.onchange = (e: any) => {
            e.preventDefault();
            var reader = new FileReader();
            var file: File = e.target.files[0];
            reader.readAsDataURL(file);
            reader.onloadend = (file) => {
                console.log("loaded");
                var base64Result = file!.target!.result! as string;
                console.log(base64Result);
                setCompanyLogo(base64Result);
                console.log("set company logo value")
                
            }
        };
        inputField.click();
    }

    return (
        <button
            type="button"
            onClick={() => { UpdateCompanyLogo()}}
            style={{backgroundImage:`url('${companyLogoValue!=""&&companyLogoValue}')`}}
            className="hover:bg-blue bg-contain bg-no-repeat bg-blue bg-center hover:scale-105 mt-2 h-36 w-36 rounded-xl flex justify-center items-center">
            {companyLogoValue==""?<AiFillCamera className="text-tan/70 h-12 w-12"  />:""}
        </button>
    );
}

export default CompanyLogo;