import TwoColumnLayoutPage from "../../../standards/styles/layouts/twoColumnLayout";
import { MdArrowDropDown, MdUpdate } from "react-icons/md";
import InterviewsThisWeek from "../components/interviewsThisWeek";
import StandardDropDown from "../../../standards/styles/components/dropdowns";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import globalUserAtom from "../../../atoms/app/globalUserAtom";
import { doc, getFirestore, setDoc } from "@firebase/firestore";
import ManageAvailability from "../components/manageAvailability";
import userAvailabilityAtom from "../atoms/userAvailabilityAtom";
import TimeSelectionPopupModalOpenAtom, { selectedDayIndexAtom } from "../atoms/timeSelectionPopupModal";
import TimeSelectionPopup from "../components/timeSelectionPopup";
import { UserDataInterface } from "../../../standards/interfaces/interfaces";
import { useRecoilState } from "recoil";
import { StandardLightBlueButton } from "../../../standards/components/button";
import { BiPlus } from "react-icons/bi";

export default function Interviews() {
  const [loggedInUser, setloggedInUser] = useRecoilState(globalUserAtom);
  const [userAvailability, setuserAvailability] = useRecoilState(userAvailabilityAtom);
  const [timeSelectionPopupOpen, settimeSelectionPopupOpen] = useRecoilState(TimeSelectionPopupModalOpenAtom);
  const [selectedDayIndex, setselectedDayIndex] = useRecoilState(selectedDayIndexAtom);

  const db = getFirestore();

  function handleInterviewSlotTimeChange(newTime: string) {
    setDoc(doc(db, "users", loggedInUser.id! as string), {
      interviewSlotTime: newTime,
    }, { merge: true });
  }

  return (
    <>
      {
        timeSelectionPopupOpen &&
        <TimeSelectionPopup />
      }
      <TwoColumnLayoutPage
        header={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-row justify-between items-start w-full h-full">

            <StandardDropDown
              value={loggedInUser.interviewSlotTime!}
              icon={<MdArrowDropDown />}
              placeholder="Select Interview Duration"
              options={
                [
                  { option: "15 Minutes", onClick: () => { handleInterviewSlotTimeChange("15 Minutes") } },
                  { option: "30 Minutes", onClick: () => { handleInterviewSlotTimeChange("30 Minutes") } },
                  { option: "1 Hour", onClick: () => { handleInterviewSlotTimeChange("1 Hour") } },
                ]
              }></StandardDropDown>

            <AnimatePresence>
              {
                loggedInUser.availability == undefined &&
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <StandardLightBlueButton
                    text="Create Availability Schedule"
                    icon={<BiPlus />}
                    onClick={() => {
                      try {
                        console.log(userAvailability);
                        var newData:UserDataInterface={} as UserDataInterface;
                        newData.availability=userAvailability;
                        newData.timezone=Intl.DateTimeFormat().resolvedOptions().timeZone.toString();
                        setDoc(doc(db, "users", loggedInUser.id! as string), newData, { merge: true });
                      }
                      catch (e) {
                        alert(e);
                      }
                    }}
                  />
                </motion.div>
              }
            </AnimatePresence>

            <AnimatePresence>
              {
                loggedInUser.availability != undefined &&
                <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-full bg-blue/10 text-black py-3 px-5 text-sm">
                  Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone.toString()}
                </motion.div>
              }
            </AnimatePresence>

          </motion.div>
        }
        leftBar={<ManageAvailability />}
        rightBar={<InterviewsThisWeek />}
      />
    </>
  );
}
