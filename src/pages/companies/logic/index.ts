import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { CompanyDataInterface } from '../../../standards/interfaces/interfaces';

const loggedInUser = localStorage.getItem('uid')!;
// const loggedInUser = 's2vPxnYYAQf2XratArGBFNmlAb82';

export const getAllCompanies = async () => {
  try {
    const db = getFirestore();
    const companiesRef = collection(db, 'companies');
    const q = query(companiesRef, where('companyOwnerId', '==', loggedInUser));
    const querySnapshot = await getDocs(q);

    const companies = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as CompanyDataInterface),
    }));

    return companies;
  } catch (error) {
    console.log(error);
  }
};
