import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { AllSelectedDayAndTimeInterface } from "../../../standards/interfaces/interfaces";

export default async function updateInterviewTimes(
  AllSelectedDayAndTime: AllSelectedDayAndTimeInterface,
  FinalSelectedDayAndTime: AllSelectedDayAndTimeInterface
) {
  const db = getFirestore();
  const loggedInUser = localStorage.getItem("uid")!;

  const userDocRef = doc(db, "users", loggedInUser);

  updateDoc(userDocRef, {
    // Use the dot notation to add the new object as a field in the existing document
    AllTimeSlots: AllSelectedDayAndTime,
    SelectedTimeSlots: FinalSelectedDayAndTime,
  })
    .then(() => {
      toast.dismiss();
      toast.success("Interview Schedule updated");
    })
    .catch((error) => {
      toast.dismiss();
      toast.error("An error occured while updating the interview schedule");
    });
}
