import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { FinalSelectedDayAndTimeAtom } from "../../../atoms/interview/FinalSelectedDayAndTimeAtom";
import { TimeSlot } from "../../../standards/interfaces/interfaces";

interface TimeSlotInterface {
  day: string;
  slotsArr: TimeSlot[];
}
function TimeSlotsComponent(props: TimeSlotInterface) {
  const theDay = props?.day;
  const [weekSchedule, setWeekSchedule] = useRecoilState(
    FinalSelectedDayAndTimeAtom
  );

  const [parentChecked, setParentChecked] = useState(false);

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
      setParentChecked(e.target.checked);
      const childCheckboxes = document.querySelectorAll(
        'input[type="checkbox"][data-parent-id="' + e.target.id + '"]'
      );
      childCheckboxes.forEach((checkbox: any) => {
        checkbox.checked = false;
      });
    } else {
      setParentChecked(e.target.checked);
      const childCheckboxes = document.querySelectorAll(
        'input[type="checkbox"][data-parent-id="' + e.target.id + '"]'
      );
      childCheckboxes.forEach((checkbox: any) => {
        checkbox.checked = false;
      });
      clearDaySchedule(theDay);
    }
  };

  const handleTimeSlotChecked = (e: any, slots: TimeSlot) => {
    if (e.target.checked) {
      addTimeSlot(theDay, slots?.startTime, slots?.endTime);
    } else {
      deleteTimeSlot(theDay, slots?.startTime, slots?.endTime);
    }
  };

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
          id={theDay}
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
              <div key={index} className="ml-12">
                <input
                  type="checkbox"
                  className="w-[14px] h-[14px] mr-3"
                  id={`${theDay}-${slots?.startTime}-${slots?.endTime}`}
                  data-parent-id={theDay}
                  disabled={!parentChecked}
                  value={`${slots?.startTime}-${slots?.endTime}`}
                  onChange={(e) => handleTimeSlotChecked(e, slots)}
                />
                <label
                  className="text-[13px] font-medium "
                  htmlFor={`${theDay}-${slots?.startTime}-${slots?.endTime}`}
                >
                  {slots?.startTime} - {slots?.endTime}
                </label>
              </div>
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
