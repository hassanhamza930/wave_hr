import {
  collection,
  getFirestore,
  query,
  onSnapshot,
} from "firebase/firestore";
import { JobApplication } from "../../apply/atoms/applyPageAtoms";

export default function getCurrentJobApplications(
  setApplicants: Function,
  jobID: string,
  searchValue: string
) {
  const db = getFirestore();

  onSnapshot(query(collection(db, "jobs", jobID, "applications")), (docs) => {
    var tempArray: Array<JobApplication> = [];
    docs.forEach((doc) => {
      var userName: string = doc.data()["name"] as string;
      if (
        userName
          .toLocaleLowerCase()
          .includes(searchValue.toLocaleLowerCase()) == true &&
        doc.data()["rejected"] == false
      ) {
        tempArray.push({ ...doc.data(), id: doc.id } as JobApplication);
      }
    });

    var pendingReviewsArray: any = [];
    var reviewsDoneArray: any = [];

    tempArray.forEach((data, index) => {
      if (data.rating != null) {
        reviewsDoneArray.splice(0, 0, data);
      }
    });

    reviewsDoneArray = reviewsDoneArray.sort(
      (a: JobApplication, b: JobApplication) => {
        if (+a.rating! > +b.rating!) {
          return +1;
        } else if (+a.rating! < +b.rating!) {
          return -1;
        } else {
          return 0;
        }
      }
    );
    reviewsDoneArray = reviewsDoneArray.reverse();

    tempArray.forEach((data, index) => {
      if (data.rating == null) {
        pendingReviewsArray.splice(0, 0, data);
      }
    });

    pendingReviewsArray.forEach((data: any, index: number) => {
      reviewsDoneArray.splice(0, 0, data);
    });

    setApplicants(reviewsDoneArray);
  });
}
