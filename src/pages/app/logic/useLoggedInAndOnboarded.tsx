import {
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import globalUserAtom, { UserInterface } from '../../../atoms/app/globalUserAtom';
import isLoadingAtom from '../../../atoms/app/isLoadingAtom';
 

export default function useLoggedInAndOnboarded() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loggedInUser, setLoggedInUser] = useRecoilState(globalUserAtom);
  const [loading, setLoading] = useRecoilState(isLoadingAtom);

  const db = getFirestore();

  const syncUserData = async () => {
    let loggedInUserId: string = localStorage.getItem('uid')!;
    const userRef = doc(db, 'users', loggedInUserId);
    const userDataExists = (await getDoc(userRef)).exists();

    if (userDataExists == true) {
      const unsub = onSnapshot(userRef, (data) => {
        const userData: UserInterface = data.data() as UserInterface;
        setLoggedInUser(userData);
        setLoggedIn(true);
        setLoading(false);
      });
    } else {
      localStorage.clear();
      setLoggedIn(false);
      setLoggedInUser({} as UserInterface);
      window.location.href = '/';
    }
  };


  useEffect(() => {
    if (localStorage.getItem('uid') != null && loggedInUser.email == null) {
      setLoading(true);
      setLoggedIn(true);
      console.log('syncing');
      syncUserData();
    }
  }, []);

  return { loggedIn };
}