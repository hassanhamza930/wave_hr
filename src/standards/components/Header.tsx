import Logo from "../../images/logo.svg";
import { BsArrowRightShort } from "react-icons/bs";
import { useNavigate } from "react-router";


export default function Header() {

    const navigate = useNavigate();

    return (
        <div className="fixed h-[80px] bg-tan z-50 w-full flex flex-row justify-between items-center px-[5%] py-5">
            <button onClick={()=>{navigate("/")}}>
                <img src={Logo} className="h-16 w-16"></img>
            </button>

            <div className="flex flex-row gap-20 justify-between items-center">

                <button onClick={() => {
                    navigate("/pricing");
                }} className="hover:scale-[1.02] font-bold text-purple text-sm">Pricing</button>

                <button className="hover:scale-[1.02] text-sm px-4 py-2 rounded-md bg-purple flex flex-row gap-2 justify-center items-center">
                    <button onClick={()=>{navigate("/login")}} className="text-white font-medium">Login</button>
                    <BsArrowRightShort color="white" size={20} />
                </button>

            </div>

        </div>
    )
}