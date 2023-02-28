import {
  collection,
  getFirestore,
  query,
  onSnapshot,
} from "firebase/firestore";
import { ApplicationDataInterface } from "../../../standards/interfaces/interfaces";


export default function getCurrentApplicationDataInterfaces(setApplicants: Function,jobID: string,searchValue: string) {
  
  const db = getFirestore();

  onSnapshot(query(collection(db, "jobs", jobID, "applications")), (docs) => {
    var tempArray: Array<ApplicationDataInterface> = [];
    docs.forEach((doc) => {
      var applicantData:ApplicationDataInterface=doc.data() as ApplicationDataInterface;
      
      if (applicantData.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) == true && applicantData.applicationStatus!="rejected") {
        tempArray.push({ ...doc.data(), id: doc.id } as ApplicationDataInterface);
      }
    });

    var pendingReviewsArray: any = [];
    var reviewsDoneArray: any = [];

    tempArray.forEach((data, index) => {
      if (data.rating != 0) {
        reviewsDoneArray.splice(0, 0, data);
      }else{
        pendingReviewsArray.splice(0, 0, data);
      }
    });

    reviewsDoneArray = reviewsDoneArray.sort(
      (a: ApplicationDataInterface, b: ApplicationDataInterface) => {
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

    pendingReviewsArray.forEach((data: any, index: number) => {
      reviewsDoneArray.splice(0, 0, data);
    });

    setApplicants(reviewsDoneArray);
  });
}
