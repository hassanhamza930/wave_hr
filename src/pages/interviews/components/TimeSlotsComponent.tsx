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

  useEffect(() => {
    // Check the day checkbox if it is present in the weekSchedule object
    const dayCheckbox = document.getElementById(theDay) as HTMLInputElement;
    if (dayCheckbox) {
      const daySchedule = weekSchedule[theDay];
      const allTimeSlots = document.querySelectorAll(
        'input[type="checkbox"][data-parent-id="' + theDay + '"]'
      );
      if (daySchedule && daySchedule.length > 0) {
        // Check the day checkbox if it has time slots in the weekSchedule object
        dayCheckbox.checked = true;
        allTimeSlots.forEach((checkbox: any) => {
          const startTime = checkbox.getAttribute("data-start-time");
          const endTime = checkbox.getAttribute("data-end-time");
          const timeSlotExists = daySchedule.find(
            (timeSlot: TimeSlot) =>
              timeSlot.startTime === startTime && timeSlot.endTime === endTime
          );
          if (timeSlotExists) {
            // Check the time slot checkbox if it is present in the weekSchedule object
            checkbox.checked = true;
          }
        });
      } else {
        // Uncheck the day checkbox if it has no time slots in the weekSchedule object
        dayCheckbox.checked = false;
        allTimeSlots.forEach((checkbox: any) => {
          checkbox.checked = false;
        });
      }
    }
  }, [theDay, weekSchedule]);

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
    const { checked, value } = e.target;
    if (checked) {
      addTimeSlot(theDay, slots?.startTime, slots?.endTime);
    } else {
      deleteTimeSlot(theDay, slots?.startTime, slots?.endTime);
    }

    // Update parent checkbox state based on checked state of child checkboxes
    const childCheckboxes = document.querySelectorAll(
      `input[type="checkbox"][data-parent-id="${theDay}"]`
    );
    let allChecked = true;
    let allUnchecked = true;
    childCheckboxes.forEach((checkbox: any) => {
      if (checkbox.checked) {
        allUnchecked = false;
      } else {
        allChecked = false;
      }
    });
    const parentCheckbox = document.getElementById(theDay) as HTMLInputElement;
    if (allChecked) {
      parentCheckbox.checked = true;
      parentCheckbox.disabled = false;
    } else if (allUnchecked) {
      parentCheckbox.checked = false;
      parentCheckbox.disabled = false;
    } else {
      parentCheckbox.checked = false;
      parentCheckbox.disabled = true;
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
            const isTimeSlotSelected = weekSchedule[theDay].some(
              (selectedTimeSlot: TimeSlot) =>
                selectedTimeSlot.startTime === slots.startTime &&
                selectedTimeSlot.endTime === slots.endTime
            );
            return (
              <div key={index} className="ml-12">
                <input
                  type="checkbox"
                  className="w-[14px] h-[14px] mr-3"
                  id={`${theDay}-${slots.startTime}-${slots.endTime}`}
                  data-parent-id={theDay}
                  disabled={!parentChecked}
                  checked={isTimeSlotSelected}
                  value={`${slots.startTime}-${slots.endTime}`}
                  onChange={(e) => handleTimeSlotChecked(e, slots)}
                />
                <label
                  className={`text-[13px] font-medium ${
                    !parentChecked ? "text-gray-400" : ""
                  }`}
                  htmlFor={`${theDay}-${slots.startTime}-${slots.endTime}`}
                >
                  {slots.startTime} - {slots.endTime}
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
