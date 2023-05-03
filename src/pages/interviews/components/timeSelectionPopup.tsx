import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useRecoilState } from "recoil";
import TimeSelectionPopupModalOpenAtom, { selectedDayIndexAtom } from "../atoms/timeSelectionPopupModal";
import globalUserAtom from "../../../atoms/app/globalUserAtom";
import { doc, getFirestore, setDoc } from "@firebase/firestore";
import { StandardBlueButton } from "../../../standards/styles/components/button";
import * as _ from 'lodash';

function TimeSelectionPopup() {

    const [selectedDayIndex, setselectedDayIndex] = useRecoilState(selectedDayIndexAtom);
    const [timeSelectionPopupOpen, settimeSelectionPopupOpen] = useRecoilState(TimeSelectionPopupModalOpenAtom);
    const [loggedInUser, setloggedInUser] = useRecoilState(globalUserAtom);
    const db=getFirestore();

    return ( 
        <Transition appear show={timeSelectionPopupOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {settimeSelectionPopupOpen(false);}}>
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
                    className="font-[Inter] text-xl font-regular justify-center items-center flex  text-dark-gray"
                  >
                    Please select a time window.
                  </Dialog.Title>
                  <div className="mt-10 mb-10 justify-center items-center flex flex-row gap-8">
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={loggedInUser.availability![selectedDayIndex].startTime}
                      onChange={(e)=>{
                        var tempAvailability = _.cloneDeep(loggedInUser.availability);
                        tempAvailability![selectedDayIndex].startTime = e.target.value;
                        setDoc(doc(db, "users", loggedInUser.id! as string), {
                            availability:tempAvailability
                        },{merge:true});
                      }}
                    />
                    --
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={loggedInUser.availability![selectedDayIndex].endTime}
                      onChange={(e)=>{
                        var tempAvailability = _.cloneDeep(loggedInUser.availability);
                        tempAvailability![selectedDayIndex].endTime = e.target.value;
                        setDoc(doc(db, "users", loggedInUser.id! as string), {
                            availability:tempAvailability
                        },{merge:true});
                      }}
                    />
                  </div>

                  <div className="flex justify-center items-center">
                    <StandardBlueButton
                      text="Done"
                      onClick={() => {
                        settimeSelectionPopupOpen(false);
                      }}
                    />
                  </div>


                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
     );
}

export default TimeSelectionPopup;