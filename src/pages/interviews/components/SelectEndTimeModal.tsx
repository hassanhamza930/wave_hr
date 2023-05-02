import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { toast } from "react-hot-toast";
import { useRecoilState } from "recoil";
import { AllSelectedDayAndTimeAtom } from "../../../atoms/interview/AllSelectedDayAndTimeAtom";
import SelectedDayAndTimeAtom from "../../../atoms/interview/SelectedDayAndTimeAtom";
import SelectEndTimeModalAtom from "../../../atoms/interview/SelectEndTimeModalAtom";
import { ButtonSolid } from "../../../standards/styles/components/button";

function SelectEndTimeModal() {
  const [showSelectEndTimeModal, setShowSelectEndTimeModal] = useRecoilState(
    SelectEndTimeModalAtom
  );
  const [selectedDayTime, setSelectedDayTime] = useRecoilState(
    SelectedDayAndTimeAtom
  );
  const [workSchedule, setWeekSchedule] = useRecoilState(
    AllSelectedDayAndTimeAtom
  );

  function addTimeSlot(day: string, startTime: string, endTime: string) {
    setWeekSchedule((prevState: any) => ({
      ...prevState,
      [day]: [...prevState[day], { startTime, endTime }],
    }));
  }

  function closeModal() {
    setShowSelectEndTimeModal(false);
    setSelectedDayTime({
      ...selectedDayTime,
      day: "",
      startTime: "",
      endTime: "",
    });
  }

  const handleTimeChange = (e: any) => {
    setSelectedDayTime({
      ...selectedDayTime,

      endTime: e.target.value,
    });
  };

  const handleNext = () => {
    if (selectedDayTime?.endTime) {
      if (
        selectedDayTime?.day &&
        selectedDayTime?.startTime &&
        selectedDayTime?.endTime
      ) {
        addTimeSlot(
          selectedDayTime?.day,
          selectedDayTime?.startTime,
          selectedDayTime?.endTime
        );
        closeModal();
      }
    } else {
      toast.dismiss();
      toast.error("Please select end time");
    }
  };

  return (
    <>
      <Transition appear show={showSelectEndTimeModal} as={Fragment}>
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
                    Ending Time
                  </Dialog.Title>
                  <div className="mt-10 mb-10 justify-center items-center flex flex-row gap-8">
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={selectedDayTime?.endTime}
                      onChange={handleTimeChange}
                    />
                  </div>

                  <div className="mt-4 flex justify-center items-center">
                    <ButtonSolid
                      text="Done"
                      onClick={() => {
                        handleNext();
                      }}
                      customStyles="w-[125px] h-[50px] rounded-[23px]"
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

export default SelectEndTimeModal;
