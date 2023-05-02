import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { AllSelectedDayAndTimeInterface } from "../../../standards/interfaces/interfaces";

export default async function fetchAllSelectedDayAndTime(
  selectedDaytime: AllSelectedDayAndTimeInterface,
  setSelectedDaytime: Function,
  finalDaytime: AllSelectedDayAndTimeInterface,
  setFinalDaytime: Function
) {
  const db = getFirestore();
  const loggedInUser = localStorage.getItem("uid")!;

  const userDocRef = doc(db, "users", loggedInUser);

  getDoc(userDocRef)
    .then((docSnapshot) => {
      if (docSnapshot.exists()) {
        // Use the data() method to extract the user object from the document
        Object?.keys(docSnapshot?.data()?.AllTimeSlots) &&
          setSelectedDaytime(docSnapshot.data().AllTimeSlots);
        Object?.keys(docSnapshot?.data()?.SelectedTimeSlots) &&
          setFinalDaytime(docSnapshot.data().SelectedTimeSlots);
      } else {
        console.log("User document does not exist!");
      }
    })
    .catch((error) => {
      console.error("Error getting user object: ", error);
    });
}