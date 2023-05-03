import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRecoilState } from "recoil";
import SelectedDayAndTimeAtom from "../../../atoms/interview/SelectedDayAndTimeAtom";
import SelectEndTimeModalAtom from "../../../atoms/interview/SelectEndTimeModalAtom";
import SelectStartTimeModalAtom from "../../../atoms/interview/SelectStartTimeModalAtom";
import { ButtonSolid, StandardBlueButton } from "../../../standards/styles/components/button";

function SelectStartTimeModal() {
  const [showSelectStartTimeModal, setShowSelectStartTimeModal] =
    useRecoilState(SelectStartTimeModalAtom);
  const [showSelectEndTimeModal, setShowSelectEndTimeModal] = useRecoilState(
    SelectEndTimeModalAtom
  );
  const [selectedDayTime, setSelectedDayTime] = useRecoilState(
    SelectedDayAndTimeAtom
  );

  function closeModal() {
    setShowSelectStartTimeModal(false);
    setSelectedDayTime({ ...selectedDayTime, day: "", startTime: "" });
  }

  const handleTimeChange = (e: any) => {
    setSelectedDayTime({ ...selectedDayTime, startTime: e.target.value });
  };

  const handleNext = () => {
    if (selectedDayTime?.startTime) {
      setShowSelectStartTimeModal(false);
      setShowSelectEndTimeModal(true);
    } else {
      toast.dismiss();
      toast.error("Please select start time");
    }
  };
  return (
    <>
      <Transition appear show={showSelectStartTimeModal} as={Fragment}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="font-[Inter] text-[16px] font-bold justify-center items-center flex  text-[#454545]"
                  >
                    Starting Time
                  </Dialog.Title>
                  <div className="mt-10 mb-10 justify-center items-center flex flex-row gap-8">
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={selectedDayTime?.startTime}
                      onChange={handleTimeChange}
                    />
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

export default SelectStartTimeModal;
