import { TimeSlot } from "../../../standards/interfaces/interfaces";

interface TimeSlotInterface {
  day: string;
  slotsArr: TimeSlot[];
}
function TimeSlotsComponent(props: TimeSlotInterface) {
  const theDay = props?.day;
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
      <label className="pt-5 pl-5 pr-5 pb-1">
        <input type="checkbox" className="w-[14px] h-[14px] mr-3" />
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
                <input type="checkbox" className="w-[14px] h-[14px] mr-3" />
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
