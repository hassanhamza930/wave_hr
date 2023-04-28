import React from "react";

interface OneStopSolutionCard {
  icon: string;
  text: string;
}

function OneStopSolutionCard({ icon, text }: OneStopSolutionCard) {
  return (
    <>
      <div className=" flex flex-col items-center justify-center">
        <div className="rounded-full bg-primary bg-opacity-10 px-4 py-4">
          <img src={icon} className="w-7 h-7" />
        </div>
        <p className="text-[15px] w-[80%] text-center mt-4 text-[#283660]">
          {text}
        </p>
      </div>
    </>
  );
}

export default OneStopSolutionCard;
