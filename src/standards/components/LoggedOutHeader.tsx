import Logo from "../../images/landingPage/wavehr-logo.png";
import { BsArrowRightShort } from "react-icons/bs";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export default function LoggedOutHeader() {
  const navigate = useNavigate();
  const [isApplyPage, setIsApplyPage] = useState<boolean>(true);

  useEffect(() => {
    if (window.location.pathname.toString().includes("apply") == false) {
      setIsApplyPage(false);
    } else {
      setIsApplyPage(true);
    }
  }, []);

  return (
    <>
      {isApplyPage == false && (
        <div className="fixed h-[80px] bg-white z-50 shadow-md w-full flex flex-row justify-between items-center px-[5%] py-5">
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={Logo} className="h-full mt-[2px] w-36"></img>
          </button>

          <div className="flex flex-row gap-16 justify-between items-center">
            {/* <button onClick={() => {
                            navigate("/pricing");
                        }} className="hover:scale-[1.02] font-bold text-black text-sm">Pricing</button> */}

            <button
              onClick={() => {
                navigate("/login");
              }}
              className="hover:scale-[1.02] text-sm px-8 py-3 rounded-[10px] bg-primary flex flex-row gap-2 justify-center items-center"
            >
              <div className="text-tan font-medium text-[10px] uppercase">
                Sign up now
              </div>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
