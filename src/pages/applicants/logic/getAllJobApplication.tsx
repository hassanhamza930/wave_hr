import {
  collection,
  getFirestore,
  query,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { JobApplication } from "../../apply/atoms/applyPageAtoms";

export default async function getAllJobApplications(
  setAllApplicants: Function,
  jobID: string,
  searchValue: string
) {
  const db = getFirestore();

  const q = query(collection(db, "jobs", jobID, "applications"));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    // var datalist = querySnapshot.docs.map((d) => {
    //   return [d.id, d.data()] as Object;
    // });
    var tempArray: Array<JobApplication> = [];
    querySnapshot.forEach((doc) => {
      var userName: string = doc.data()["name"] as string;
      if (
        userName
          .toLocaleLowerCase()
          .includes(searchValue.toLocaleLowerCase()) == true
      ) {
        tempArray.push({ ...doc.data(), id: doc.id } as JobApplication);
      }
    });
    setAllApplicants(tempArray);
  });
}
