import React from "react";
import { SubHeading } from "../../../standards/styles/components/heading";

interface TimeSlotInterface {
  day: string;
}
function TimeSlotsComponent(props: TimeSlotInterface) {
  return (
    <div className="ml-5 flex flex-col">
      <svg
        className="w-full"
        height="1"
        viewBox="0 0 720 1"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line y1="0.5" x2="720" y2="0.5" stroke="black" stroke-opacity="0.13" />
      </svg>
      <label className="p-5">
        <input type="checkbox" className="w-3 h-3 mr-3" />
        <span className="text-[15px] font-medium ">{props?.day}</span>
      </label>{" "}
      <span className="text-[13px] ml-11 mt-[-12px] mb-5">
        No time slot added
      </span>
    </div>
  );
}

export default TimeSlotsComponent;
