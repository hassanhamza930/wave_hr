import { AiFillCamera } from "react-icons/ai";

function CompanyLogo() {
    return (
        <button
            type="button"
            onClick={() => {  }}
            className="hover:bg-blue bg-contain bg-no-repeat bg-blue bg-center hover:scale-105 h-36 w-36 rounded-xl mt-3 flex justify-center items-center">
            <AiFillCamera className="text-tan/70 h-12 w-12"  />
        </button>
    );
}

export default CompanyLogo;