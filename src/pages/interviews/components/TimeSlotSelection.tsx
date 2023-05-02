import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { AllSelectedDayAndTimeAtom } from "../../../atoms/interview/AllSelectedDayAndTimeAtom";
import { FinalSelectedDayAndTimeAtom } from "../../../atoms/interview/FinalSelectedDayAndTimeAtom";
import { SubHeading } from "../../../standards/styles/components/heading";
import fetchAllSelectedDayAndTime from "../logic/fetchAllSelectedDayAndTime";
import TimeSlotsComponent from "./TimeSlotsComponent";

function TimeSlotSelection() {
  const [weekSchedule, setWeekSchedule] = useRecoilState(
    AllSelectedDayAndTimeAtom
  );
  const [finalWeekSchedule, setFinalWeekSchedule] = useRecoilState(
    FinalSelectedDayAndTimeAtom
  );

  useEffect(() => {
    fetchAllSelectedDayAndTime(
      weekSchedule,
      setWeekSchedule,
      finalWeekSchedule,
      setFinalWeekSchedule
    );
  }, [fetchAllSelectedDayAndTime]);

  useEffect(() => {
    console.log("hiws", weekSchedule);
    console.log("hifws", finalWeekSchedule);
  });
  return (
    <div>
      <SubHeading
        text={"Set your per day availability to schedule interviews"}
        customStyles="mt-2 mb-1 p-5 text-[15px] font-bold ml-2"
      ></SubHeading>

      <TimeSlotsComponent day="Monday" slotsArr={weekSchedule["Monday"]} />
      <TimeSlotsComponent day="Tuesday" slotsArr={weekSchedule["Tuesday"]} />
      <TimeSlotsComponent
        day="Wednesday"
        slotsArr={weekSchedule["Wednesday"]}
      />
      <TimeSlotsComponent day="Thursday" slotsArr={weekSchedule["Thursday"]} />
      <TimeSlotsComponent day="Friday" slotsArr={weekSchedule["Friday"]} />
      <TimeSlotsComponent day="Saturday" slotsArr={weekSchedule["Saturday"]} />
      <TimeSlotsComponent day="Sunday" slotsArr={weekSchedule["Sunday"]} />
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
