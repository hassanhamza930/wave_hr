import dayjs, { Dayjs } from "dayjs";
import Timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Heading,
  SubHeading,
} from "../../../standards/styles/components/heading";
import PageLayout from "../../../standards/styles/layouts/pageLayout";
import TimePicker from "react-time-picker";
import FormLayout from "../../../standards/styles/layouts/FormLayout";
import SimpleInput from "../../../standards/styles/components/inputs";
import { useNavigate } from "react-router";
import Logo from "../../../images/logo.svg";
import calendlyLogo from "../../../images/calendly.svg";
import { GiInfinity } from "react-icons/gi";
import { BiInfinite, BiPlus } from "react-icons/bi";
import {
  ButtonOutlinedWhite,
  ButtonSolid,
  StandardLightBlueButton,
} from "../../../standards/styles/components/button";
import { useRecoilState } from "recoil";
import isLoadingAtom from "../../../atoms/app/isLoadingAtom";
import { UserDataInterface } from "../../../standards/interfaces/interfaces";
import { toast } from "react-hot-toast";
import TwoColumnLayoutPage from "../../../standards/styles/layouts/twoColumnLayout";
import { momentLocalizer } from "react-big-calendar";
import moment from "moment";
import CalenderComponent from "../components/CalenderComponent";
import TimeSlotSelection from "../components/TimeSlotSelection";
import SelectDayModal from "../components/SelectDayModal";
import selectDayModalAtom from "../../../atoms/interview/SelectDayModalAtom";
import SelectStartTimeModal from "../components/SelectStartTimeModal";
import SelectEndTimeModal from "../components/SelectEndTimeModal";
import { MdUpdate } from "react-icons/md";
import { AllSelectedDayAndTimeAtom } from "../../../atoms/interview/AllSelectedDayAndTimeAtom";
import { FinalSelectedDayAndTimeAtom } from "../../../atoms/interview/FinalSelectedDayAndTimeAtom";
import updateInterviewTimes from "../logic/updateInterviewTimes";

export default function Interviews() {
  // const [calendlyLink, setCalendlyLink] = useState("");
  // const [loading, setloading] = useRecoilState(isLoadingAtom);
  // const navigate = useNavigate();
  // const db=getFirestore();

  // useEffect(() => {
  //     // var foreignTime = Timestamp.now().toDate().toLocaleString('en-EN', { hour: 'numeric', year: "numeric", hour12: false, timeZone: 'Asia/Calcutta', minute: "numeric" });
  //     // const parsedDate = Date.parse(foreignTime);
  //     // console.log(parsedDate);
  //     // const localTime = new Date(parsedDate);
  //     // console.log(localTime);
  //     getDoc(doc(db,"users",localStorage.getItem("uid") as string)).then((doc)=>{
  //         var userData:UserDataInterface=doc.data() as UserDataInterface;
  //         setCalendlyLink(userData.calendlyLink!);
  //     });

  // }, [])

  // async function UpdateCalendlyLink(){
  //    if(calendlyLink!=""){
  //     setloading(true);
  //     await setDoc(doc(db,"users",localStorage.getItem("uid") as string),{interviewsSetup:true,calendlyLink:calendlyLink} as UserDataInterface,{merge:true});
  //     setloading(false);
  //     toast.success("Calendly link updated.")
  //    }
  //    else{
  //     toast.error("Kindly provide a calendly link")
  //    }
  // }

  const [showSelectDayModal, setShowSelectDayModal] =
    useRecoilState(selectDayModalAtom);

  const [AllSelectedDayAndTime] = useRecoilState(AllSelectedDayAndTimeAtom);
  const [FinalSelectedDayAndTime] = useRecoilState(FinalSelectedDayAndTimeAtom);

  interface Event {
    id: number;
    start: Date;
    end: Date;
    title: string;
    description?: string;
    color?: string;
  }

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
      color: "#d93b3b",
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
            <StandardLightBlueButton
              onClick={() => {
                updateInterviewTimes(
                  AllSelectedDayAndTime,
                  FinalSelectedDayAndTime
                );
              }}
              icon={<MdUpdate />}
              text="Update"
            />
          </div>
        }
        leftBar={<TimeSlotSelection />}
        rightBar={<CalenderComponent events={events} localizer={localizer} />}
      />
    </>
  );
}
