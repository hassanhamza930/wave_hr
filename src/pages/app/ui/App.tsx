import Header from "../../../standards/components/Header";
import LoggedOutRoutes from "../components/LoggedOutRoutes";
import { initializeApp } from "firebase/app";
import useLoggedInAndOnboarded from "../logic/useLoggedInAndOnboarded";
import isLoadingAtom from "../../../atoms/app/isLoadingAtom";
import { useRecoilState } from "recoil";

const firebaseConfig = {
  apiKey: "AIzaSyAleTmGUCRY87baXUHowrBhPGdY5YcGZak",
  authDomain: "wavehr-80f78.firebaseapp.com",
  projectId: "wavehr-80f78",
  storageBucket: "wavehr-80f78.appspot.com",
  messagingSenderId: "558763531536",
  appId: "1:558763531536:web:c326c29f0124991b721995",
  measurementId: "G-1CEPL8EWQ9"
};


function App() {

  const app = initializeApp(firebaseConfig);
  const { loggedIn } = useLoggedInAndOnboarded();
  const [loading, setLoading] = useRecoilState(isLoadingAtom);

  return (
    <>
      {loading==true&&<div className="fixed h-screen w-full bg-red-500 "></div>}
      <div style={{ fontFamily: "Inter" }} className=" h-full w-full bg-tan">
        <Header />
        {loggedIn == true ? <div></div> : <LoggedOutRoutes />}
      </div>
    </>
  );
}

export default App;
