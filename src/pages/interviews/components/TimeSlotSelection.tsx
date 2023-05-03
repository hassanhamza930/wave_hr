import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { AllSelectedDayAndTimeAtom } from "../../../atoms/interview/AllSelectedDayAndTimeAtom";
import { SubHeading } from "../../../standards/styles/components/heading";
import { StandardMidBlueButton } from "../../../standards/styles/components/button";
import { AiOutlineEdit } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { MdEditNote } from "react-icons/md";
import userAvailabilityAtom from "../atoms/userAvailabilityAtom";


export interface DailyTimeslotsInterface {
  day: string,
  enabled: boolean,
  startTime: string,
  endTime: string,
  onAvailabilityChange: Function
}




export function DailyTimeslotsCard(props: DailyTimeslotsInterface) {


  useEffect(() => {

  }, [])

  return (
    <div className="hover:bg-blue/5 transition ease-in-out duration-150 flex px-7 py-4 w-full flex-row justify-between items-center border-t-[1px] border-gray">

      <input checked={props.enabled} onChange={() => { props.onAvailabilityChange() }} type="checkbox" className=""></input>

      <div className="flex flex-col justify-start items-start h-full w-full ml-5 ">
        <div className={`w-full text-md font-medium ${props.enabled == true ? 'text-black' : 'text-black/40'} overflow-hidden`}>
          {props.day}
        </div>
        <div className={`text-sm font-regular ${props.enabled == true ? 'text-dark-gray' : 'text-dark-gray/40'}`}>{props.startTime} - {props.endTime}</div>

      </div>

      <StandardMidBlueButton
        icon={<MdEditNote />}
        onClick={() => { }}
        text="Edit" />

    </div>
  );
}






function TimeSlotSelection() {

  const [userAvailability, setuserAvailability] = useRecoilState(userAvailabilityAtom);

  useEffect(() => {
    setuserAvailability(
      [
        { day: "Monday", enabled: true, startTime: "9:00 AM", endTime: "5:00 PM" },
        { day: "Tuesday", enabled: true, startTime: "9:00 AM", endTime: "5:00 PM" },
        { day: "Wednesday", enabled: true, startTime: "9:00 AM", endTime: "5:00 PM" },
        { day: "Thursday", enabled: true, startTime: "9:00 AM", endTime: "5:00 PM" },
        { day: "Friday", enabled: true, startTime: "9:00 AM", endTime: "5:00 PM" },
        { day: "Saturday", enabled: false, startTime: "9:00 AM", endTime: "5:00 PM" },
        { day: "Sunday", enabled: false, startTime: "9:00 AM", endTime: "5:00 PM" },
      ] as Array<DailyTimeslotsInterface>
    );
  }, []);

  return (
    <div className="flex flex-col justify-start items-start h-full w-full">
      <SubHeading
        text={"Set your per day availability to schedule interviews"}
        customStyles="px-7 py-5 text-sm" />

      {
        userAvailability.map((dailyTimeSlot, index) => {
          return (
            <DailyTimeslotsCard
              onAvailabilityChange={() => {
                try {
                var tempIndex:DailyTimeslotsInterface=userAvailability[index] as DailyTimeslotsInterface;
                tempIndex.enabled=!tempIndex.enabled;
                alert(tempIndex); 
                // setuserAvailability();
                }
                catch (e) {
                  alert(e);
                }
              }}
              key={dailyTimeSlot.day} startTime={dailyTimeSlot.startTime} endTime={dailyTimeSlot.endTime} day={dailyTimeSlot.day} enabled={dailyTimeSlot.enabled} />
          )
        })
      }

    </div>
  );
}

export default TimeSlotSelection;
