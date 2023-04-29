import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import { JobDataInterface } from '../../../standards/interfaces/interfaces';

export const getCompanyJobs = async (id: string) => {
  try {
    const db = getFirestore();
    const jobsRef = collection(db, 'jobs');
    const q = query(jobsRef, where('companyId', '==', id));
    const querySnapshot = await getDocs(q);

    const jobs = querySnapshot.docs.map((doc) => ({
      ...(doc.data() as JobDataInterface),
      id: doc.id,
    }));

    return { status: true, data: jobs, message: 'Jobs Fetched Successfully' };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      data: null,
      message: 'Something went wrong while fetching company jobs!',
    };
  }
};
