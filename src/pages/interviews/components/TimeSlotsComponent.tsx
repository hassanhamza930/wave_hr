import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { FinalSelectedDayAndTimeAtom } from "../../../atoms/interview/FinalSelectedDayAndTimeAtom";
import {
  AllSelectedDayAndTimeInterface,
  TimeSlot,
} from "../../../standards/interfaces/interfaces";

interface TimeSlotInterface {
  day: string;
  slotsArr: TimeSlot[];
}
function TimeSlotsComponent(props: TimeSlotInterface) {
  const theDay = props?.day;
  // const [isChecked, setIsChecked] = useState(false);
  const [weekSchedule, setWeekSchedule] = useRecoilState(
    FinalSelectedDayAndTimeAtom
  );

  const [parentChecked, setParentChecked] = useState(false);
  const [childChecked, setChildChecked] = useState(false);

  function addTimeSlot(day: string, startTime: string, endTime: string) {
    setWeekSchedule((prevState: any) => ({
      ...prevState,
      [day]: [...prevState[day], { startTime, endTime }],
    }));
  }

  const deleteTimeSlot = (day: string, startTime: string, endTime: string) => {
    setWeekSchedule((prevWeekSchedule: any) => {
      const timeSlots = prevWeekSchedule[day];
      const nextTimeSlots = timeSlots.filter(
        (timeSlot: TimeSlot) =>
          timeSlot.startTime !== startTime || timeSlot.endTime !== endTime
      );
      return {
        ...prevWeekSchedule,
        [day]: nextTimeSlots,
      };
    });
  };

  const clearDaySchedule = (day: string) => {
    setWeekSchedule((prevWeekSchedule) => {
      return {
        ...prevWeekSchedule,
        [day]: [],
      };
    });
  };

  const handleChecked = (e: any) => {
    if (e.target.checked) {
      const { checked } = e.target;
      setParentChecked(checked);
      setChildChecked(checked ? childChecked : false);
    } else {
      const { checked } = e.target;
      setParentChecked(checked);
      setChildChecked(checked ? childChecked : false);
      clearDaySchedule(theDay);
    }
  };

  const handleTimeSlotChecked = (e: any, slots: TimeSlot) => {
    if (e.target.checked) {
      const { checked } = e.target;
      setChildChecked(checked);
      setParentChecked(checked && parentChecked);
      addTimeSlot(theDay, slots?.startTime, slots?.endTime);
    } else {
      const { checked } = e.target;
      setChildChecked(checked);
      setParentChecked(checked && parentChecked);
      deleteTimeSlot(theDay, slots?.startTime, slots?.endTime);
    }
  };

  useEffect(() => {
    console.log(weekSchedule);
  }, [weekSchedule]);

  return (
    <div className="ml-5 flex flex-col">
      <svg
        className="w-full mt-2"
        height="1"
        viewBox="0 0 720 1"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line y1="0.5" x2="720" y2="0.5" stroke="black" stroke-opacity="0.13" />
      </svg>
      <label className="pt-5 pl-5 pr-5 pb-1">
        <input
          type="checkbox"
          checked={parentChecked}
          className="w-[14px] h-[14px] mr-3"
          onChange={(e) => handleChecked(e)}
        />
        <span className="text-[15px] font-medium ">{theDay}</span>
      </label>{" "}
      <>
        {props?.slotsArr?.length ? (
          props?.slotsArr?.map((slots: TimeSlot, index: number) => {
            return (
              <label
                key={index}
                className="pl-[45px] flex items-center mb-1 mt-1"
              >
                <input
                  type="checkbox"
                  disabled={!parentChecked}
                  checked={childChecked}
                  onChange={(e) => handleTimeSlotChecked(e, slots)}
                  className="w-[14px] h-[14px] mr-3"
                />
                <span className="text-[13px] font-medium ">
                  {slots?.startTime} - {slots?.endTime}
                </span>
              </label>
            );
          })
        ) : (
          <span className="text-[13px] ml-[46px] mb-5">No time slot added</span>
        )}
      </>
    </div>
  );
}

export default TimeSlotsComponent;
