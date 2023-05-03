import { BiPlus } from "react-icons/bi";
import { StandardLightBlueButton } from "../../../standards/styles/components/button";
import { useRecoilState } from "recoil";

import TwoColumnLayoutPage from "../../../standards/styles/layouts/twoColumnLayout";
import { momentLocalizer } from "react-big-calendar";
import moment from "moment";
import CalenderComponent from "../components/interviewsThisWeek";
import TimeSlotSelection from "../components/TimeSlotSelection";
import SelectDayModal from "../components/SelectDayModal";
import selectDayModalAtom from "../../../atoms/interview/SelectDayModalAtom";
import SelectStartTimeModal from "../components/SelectStartTimeModal";
import SelectEndTimeModal from "../components/SelectEndTimeModal";
import { MdUpdate } from "react-icons/md";
import { AllSelectedDayAndTimeAtom } from "../../../atoms/interview/AllSelectedDayAndTimeAtom";
import { FinalSelectedDayAndTimeAtom } from "../../../atoms/interview/FinalSelectedDayAndTimeAtom";
import updateInterviewTimes from "../logic/updateInterviewTimes";
import { Event } from "../../../standards/interfaces/interfaces";
import InterviewsThisWeek from "../components/interviewsThisWeek";

export default function Interviews() {
  const [showSelectDayModal, setShowSelectDayModal] =
    useRecoilState(selectDayModalAtom);

  const [AllSelectedDayAndTime] = useRecoilState(AllSelectedDayAndTimeAtom);
  const [FinalSelectedDayAndTime] = useRecoilState(FinalSelectedDayAndTimeAtom);

  const events: Event[] = [
    {
      id: 1,
      start: new Date("2023-05-02T10:00:00"),
      end: new Date("2023-05-02T12:00:00"),
      title: "Meeting with John",
      description: "Discuss new project",
      color: "#3174ad",
    },
    {
      id: 2,
      start: new Date("2023-05-05T14:00:00"),
      end: new Date("2023-05-05T15:30:00"),
      title: "Lunch with Mary",
      description: "Try new restaurant",
      color: "#E6EFFF",
    },
  ];

  const localizer = momentLocalizer(moment);

  return (
    <>
      <SelectDayModal />
      <SelectStartTimeModal />
      <SelectEndTimeModal />
      <TwoColumnLayoutPage
        header={
          <div className="flex flex-row justify-between items-start w-full h-full">
            <StandardLightBlueButton
              onClick={() => {
                setShowSelectDayModal(true);
              }}
              icon={<BiPlus />}
              text="Add Time Slot"
            />
            
          </div>
        }
        leftBar={<TimeSlotSelection />}
        rightBar={<InterviewsThisWeek/>}
      />
    </>
  );
}
