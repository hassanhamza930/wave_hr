import Logo from "../../images/landingPage/wavehr-logo.png";
import { BsArrowRightShort } from "react-icons/bs";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export default function LoggedOutHeader() {
  const navigate = useNavigate();

  return (
    <>
      <div className="fixed h-[70px] bg-white z-50 w-full flex flex-row justify-between items-center px-[5%] py-5">
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          <img
            src={Logo}
            className="h-[35px] mt-1 w-[200px] object-contain"
          ></img>
        </button>

        <div className="flex flex-row gap-16 justify-between items-center">
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="hover:scale-[1.02] px-8 py-3 rounded-[10px] bg-blue flex flex-row gap-2 justify-center items-center"
          >
            <div
              style={{ fontFamily: "Space Grotesk" }}
              className="text-tan font-bold text-[12px] uppercase"
            >
              Sign up now
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
