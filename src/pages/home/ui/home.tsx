import { useEffect } from "react";
import { useRecoilState } from "recoil";
import globalUserAtom from "../../../atoms/app/globalUserAtom";
import GettingStarted from "../components/gettingStarted";
import Hello from "../components/hello";
import Schedule from "../components/schedule";
import TwoColumnLayoutPage from "../../../standards/styles/layouts/twoColumnLayout";
import LeftBar from "../components/leftBar";
import RightBar from "../components/rightBar";



export default function Home() {



    useEffect(() => {
        console.log("testing");
    }, []);

    return (
        <>
           <TwoColumnLayoutPage
            header={<div className="text-blue text-md p-5">At a glance,</div>}
            leftBar={<LeftBar/>}
            rightBar={<RightBar></RightBar> }
           /> 
      </>

    )
}