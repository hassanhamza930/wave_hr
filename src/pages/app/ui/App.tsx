import Header from "../../../standards/components/LoggedOutHeader";
import LoggedOutRoutes from "../components/LoggedOutRoutes";
import { initializeApp } from "firebase/app";
import isLoadingAtom from "../../../atoms/app/isLoadingAtom";
import { useRecoilState } from "recoil";
import Loading from "../../../standards/components/loading";
import LoggedInRoutes from "../components/LoggedInRoutes";
import useLoggedIn from "../logic/useLoggedInAndOnboarded";
import LoggedOutHeader from "../../../standards/components/LoggedOutHeader";
import globalUserAtom from "../../../atoms/app/globalUserAtom";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import WaveLooksGoodOnDesktop from "../components/waveLooksGoodOnDesktop";
import { useLocation } from "react-router";

const firebaseConfig = {
  apiKey: "AIzaSyAleTmGUCRY87baXUHowrBhPGdY5YcGZak",
  authDomain: "wavehr-80f78.firebaseapp.com",
  projectId: "wavehr-80f78",
  storageBucket: "wavehr-80f78.appspot.com",
  messagingSenderId: "558763531536",
  appId: "1:558763531536:web:c326c29f0124991b721995",
  measurementId: "G-1CEPL8EWQ9"
};





export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0 as number,
    height: 0 as number
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return windowSize;
};




function App() {

  const app = initializeApp(firebaseConfig);
  const { loggedIn } = useLoggedIn();
  const [loading, setLoading] = useRecoilState(isLoadingAtom);
  const [loggedInUser, setLoggedInUser] = useRecoilState(globalUserAtom);
  const { height, width } = useWindowSize();



  return (
    <>

      {loading == true && <Loading />}

      <Toaster
        position="top-center"
        reverseOrder={false}
      />

      <div style={{fontFamily: "Inter"}} className="h-full w-full bg-tan relative">
        {
          loggedIn == true ? <LoggedInRoutes /> : <LoggedOutRoutes />
        }
      </div>

    </>
  );
}

export default App;
