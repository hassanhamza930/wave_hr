import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { AllSelectedDayAndTimeAtom } from "../../../atoms/interview/AllSelectedDayAndTimeAtom";
import { SubHeading } from "../../../standards/styles/components/heading";
import fetchAllSelectedDayAndTime from "../logic/fetchAllSelectedDayAndTime";
import TimeSlotsComponent from "./TimeSlotsComponent";

function TimeSlotSelection() {
  const [workSchedule, setWeekSchedule] = useRecoilState(
    AllSelectedDayAndTimeAtom
  );

  useEffect(() => {
    fetchAllSelectedDayAndTime(workSchedule, setWeekSchedule);
  }, [fetchAllSelectedDayAndTime]);
  return (
    <div>
      <SubHeading
        text={"Set your per day availability to schedule interviews"}
        customStyles="mt-2 mb-1 p-5 text-[15px] font-bold ml-2"
      ></SubHeading>

      <TimeSlotsComponent day="Monday" slotsArr={workSchedule["Monday"]} />
      <TimeSlotsComponent day="Tuesday" slotsArr={workSchedule["Tuesday"]} />
      <TimeSlotsComponent
        day="Wednesday"
        slotsArr={workSchedule["Wednesday"]}
      />
      <TimeSlotsComponent day="Thursday" slotsArr={workSchedule["Thursday"]} />
      <TimeSlotsComponent day="Friday" slotsArr={workSchedule["Friday"]} />
      <TimeSlotsComponent day="Saturday" slotsArr={workSchedule["Saturday"]} />
      <TimeSlotsComponent day="Sunday" slotsArr={workSchedule["Sunday"]} />
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
