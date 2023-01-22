import Logo from "../../images/logo.svg";
import { BsArrowRightShort } from "react-icons/bs";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";


export default function LoggedOutHeader() {

    const navigate = useNavigate();
    const [isApplyPage, setIsApplyPage] = useState<boolean>(true);

    useEffect(() => {
        if (window.location.pathname.toString().includes("apply") == false) {
            setIsApplyPage(false);
        }
        else {
            setIsApplyPage(true);
        }
    }, [])

    return (
        <>
            {
                isApplyPage == false &&
                <div className="fixed h-[80px] bg-transparent z-50 w-full flex flex-row justify-between items-center px-[5%] py-5">
                    <button onClick={() => { navigate("/") }}>
                        <img src={Logo} className="h-14 w-14"></img>
                    </button>

                    <div className="flex flex-row gap-16 justify-between items-center">

                        {/* <button onClick={() => {
                            navigate("/pricing");
                        }} className="hover:scale-[1.02] font-bold text-breen text-sm">Pricing</button> */}

                        <button onClick={() => { navigate("/login") }} className="hover:scale-[1.02] text-sm px-4 py-2 rounded-md bg-blue flex flex-row gap-2 justify-center items-center">
                            <div className="text-white font-medium">Login</div>
                            <BsArrowRightShort color="white" size={20} />
                        </button>

                    </div>
                </div>
            }
        </>

    )
}