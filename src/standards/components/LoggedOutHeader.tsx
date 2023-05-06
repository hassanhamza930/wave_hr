import Logo from "../../images/landingPage/wavehr-logo.png";
import { BsArrowRightShort } from "react-icons/bs";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { StandardBlueButton } from "../styles/components/button";

export default function LoggedOutHeader() {
  const navigate = useNavigate();

  return (
    <>
      <div className="fixed h-[70px] shadow-md bg-tan/70 backdrop-blur-md z-50 w-full flex flex-row justify-between items-center px-[5%] py-5">
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
          <StandardBlueButton
            text="Get Access"
            onClick={() => { navigate("/login"); }}
          />
        </div>
      </div>
    </>
  );
}
