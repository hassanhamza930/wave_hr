import {
  collection,
  getFirestore,
  query,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

export default async function getAllJobApplications(
  setAllApplicants: Function,
  jobID: string
) {
  const db = getFirestore();

  const q = query(collection(db, "jobs", jobID, "applications"));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    var datalist = querySnapshot.docs.map((d) => {
      return [d.id, d.data()] as Object;
    });
    setAllApplicants(datalist);
  });
}
