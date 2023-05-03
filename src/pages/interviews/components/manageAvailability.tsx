import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { SubHeading } from "../../../standards/styles/components/heading";
import { StandardMidBlueButton } from "../../../standards/styles/components/button";
import { AiOutlineEdit } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { MdEditNote } from "react-icons/md";
import userAvailabilityAtom from "../atoms/userAvailabilityAtom";
import { motion } from "framer-motion";
import { collection, doc, getDoc, getDocs, getFirestore, onSnapshot, setDoc } from "@firebase/firestore";
import useLoggedIn from "../../app/logic/useLoggedInAndOnboarded";
import globalUserAtom from "../../../atoms/app/globalUserAtom";
import * as _ from 'lodash';
import TimeSelectionPopupModalOpenAtom, { selectedDayIndexAtom } from "../atoms/timeSelectionPopupModal";

export interface DailyTimeslotsInterface {
  day: string,
  enabled: boolean,
  startTime: string,
  endTime: string,
  onAvailabilityChange: Function,
  index?:number
}




export function DailyTimeslotsCard(props: DailyTimeslotsInterface) {

  const [selectedDayIndex, setselectedDayIndex] = useRecoilState(selectedDayIndexAtom);
  const [timeSelectionPopupOpen, settimeSelectionPopupOpen] = useRecoilState(TimeSelectionPopupModalOpenAtom);


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
        onClick={() => { 
          setselectedDayIndex(props.index!);
          settimeSelectionPopupOpen(true);
        }}
        text="Edit" />

    </div>
  );
}






function ManageAvailability() {

  const [userAvailability, setuserAvailability] = useRecoilState(userAvailabilityAtom);
  const db = getFirestore();
  const [loggedInUser, setloggedInUser] = useRecoilState(globalUserAtom);

  useEffect(() => {
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col justify-start items-start h-full w-full">
      <SubHeading
        text={"Set your per day availability to schedule interviews"}
        customStyles="px-7 py-5 text-sm" />

      {
        loggedInUser.availability?.map((dailyTimeSlot, index) => {
          return (
            <motion.div
              className="w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: (index + 1) * 0.08 }}
            >
              <DailyTimeslotsCard
                index={index}
                onAvailabilityChange={() => {
                  try {
                    const tempSchedule = _.cloneDeep(loggedInUser.availability);
                    tempSchedule[index]={...tempSchedule[index],enabled:!tempSchedule[index].enabled};
                    console.log(tempSchedule);
                    setDoc(doc(db, "users", loggedInUser.id! as string), {availability:tempSchedule},{merge:true});
                  }
                  catch (e) {
                    alert(e);
                  }
                }}
                key={dailyTimeSlot.day} startTime={dailyTimeSlot.startTime} endTime={dailyTimeSlot.endTime} day={dailyTimeSlot.day} enabled={dailyTimeSlot.enabled} />
            </motion.div>
          )
        })
      }

    </motion.div>
  );
}

export default ManageAvailability;
