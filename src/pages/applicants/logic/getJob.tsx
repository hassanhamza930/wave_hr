import { doc, getDoc, getFirestore, onSnapshot } from "firebase/firestore";
import { JobData, JobPosting } from "../../jobs/components/JobCard";

export default function getJob(setJobDetails: Function, jobId: string) {
  const db = getFirestore();
  onSnapshot(doc(db, "jobs", jobId as string), (doc) => {
    setJobDetails({
      id: doc.id,
      jobData: doc.data() as JobPosting,
    });
  });
}
