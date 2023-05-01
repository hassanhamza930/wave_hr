import React from "react";
import { SubHeading } from "../../../standards/styles/components/heading";
import TimeSlotsComponent from "./TimeSlotsComponent";

function TimeSlotSelection() {
  return (
    <div>
      <SubHeading
        text={"Set your per day availability to schedule interviews"}
        customStyles="mt-2 mb-1 p-5 text-[15px] font-bold ml-2"
      ></SubHeading>

      <TimeSlotsComponent day="Monday" />
      <TimeSlotsComponent day="Tuesday" />
      <TimeSlotsComponent day="Wednesday" />
      <TimeSlotsComponent day="Thursday" />
      <TimeSlotsComponent day="Friday" />
      <svg
        className="w-full"
        height="1"
        viewBox="0 0 720 1"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line y1="0.5" x2="720" y2="0.5" stroke="black" stroke-opacity="0.13" />
      </svg>
    </div>
  );
}

export default TimeSlotSelection;
