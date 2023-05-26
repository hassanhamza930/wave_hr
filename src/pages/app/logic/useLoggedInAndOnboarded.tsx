import {
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import globalUserAtom from '../atoms/globalUserAtom';
import isLoadingAtom from '../atoms/isLoadingAtom';
import { UserDataInterface } from '../../../standards/interfaces/interfaces';
 

export default function useLoggedIn() {
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
        const userData: UserDataInterface = data.data() as UserDataInterface;
        userData.id=data.id;
        setLoggedInUser(userData);
        setLoggedIn(true);
        setTimeout(()=>{setLoading(false);},1000)
      });
    } else {
      localStorage.clear();
      setLoggedIn(false);
      setLoggedInUser({} as UserDataInterface);
      setTimeout(()=>{setLoading(false);},1000)
      window.location.href = '/';
    }
  };


  useEffect(() => {
    if (localStorage.getItem('uid') != null && loggedInUser.email == null) {
      setLoggedIn(true);
      console.log('syncing');
      syncUserData();
    }
  }, []);

  return { loggedIn };
}