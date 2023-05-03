import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRecoilState } from "recoil";
import selectDayModalAtom from "../../../atoms/interview/SelectDayModalAtom";
import SelectedDayAndTimeAtom from "../../../atoms/interview/SelectedDayAndTimeAtom";
import SelectStartTimeModalAtom from "../../../atoms/interview/SelectStartTimeModalAtom";
import { ButtonSolid, StandardBlueButton } from "../../../standards/styles/components/button";

function SelectDayModal() {
  const daysArr = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat","Sun"];
  const [selectedDay, setSelectedDay] = useState("");
  const [showSelectDayModal, setShowSelectDayModal] =useRecoilState(selectDayModalAtom);
  const [showSelectStartTimeModal, setShowSelectStartTimeModal] =useRecoilState(SelectStartTimeModalAtom);
  const [selectedDayTime, setSelectedDayTime] = useRecoilState(SelectedDayAndTimeAtom);

  function closeModal() {
    setShowSelectDayModal(false);
    setSelectedDayTime({ ...selectedDayTime, day: "" });
    setSelectedDay("");
  }

  const handleClick = (day: string) => {
    setSelectedDay(day);
  };


  const handleNext = () => {
    if (selectedDay) {
      if (selectedDay === "Mon") {
        setSelectedDayTime({ ...selectedDayTime, day: "Monday" });
      } else if (selectedDay === "Tue") {
        setSelectedDayTime({ ...selectedDayTime, day: "Tuesday" });
      } else if (selectedDay === "Wed") {
        setSelectedDayTime({ ...selectedDayTime, day: "Wednesday" });
      } else if (selectedDay === "Thu") {
        setSelectedDayTime({ ...selectedDayTime, day: "Thursday" });
      } else if (selectedDay === "Fri") {
        setSelectedDayTime({ ...selectedDayTime, day: "Friday" });
      } else if (selectedDay === "Sat") {
        setSelectedDayTime({ ...selectedDayTime, day: "Saturday" });
      } else if (selectedDay === "Sun") {
        setSelectedDayTime({ ...selectedDayTime, day: "Sunday" });
      }
      setShowSelectDayModal(false);
      setShowSelectStartTimeModal(true);
    } else {
      toast.dismiss();
      toast.error("Please select a day");
    }
  };



  return (
    <>
      <Transition appear show={showSelectDayModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => closeModal()}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="font-[Inter] text-[16px] font-bold justify-center items-center flex  text-[#454545]"
                  >
                    Select Day
                  </Dialog.Title>
                  <div className="mt-10 mb-10 justify-center items-center flex flex-row gap-8">
                    {daysArr?.map((day: string, index: number) => {
                      return (
                        <p
                          className={
                            day === selectedDay
                              ? "text-[14px] font-[Inter] bg-blue cursor-pointer text-white p-4 justify-center items-center flex rounded-full flex-row"
                              : "text-[14px] font-[Inter] p-4 cursor-pointer text-[#737373] flex flex-row"
                          }
                          onClick={() => handleClick(day)}
                        >
                          {day}
                        </p>
                      );
                    })}
                  </div>

                  <div className="flex justify-center items-center">
                    <StandardBlueButton
                    text="Next"
                    onClick={() => {
                      handleNext();
                    }}
                    />
                    
                  </div>
                  
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default SelectDayModal;
