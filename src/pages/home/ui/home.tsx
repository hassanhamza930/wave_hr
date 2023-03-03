import { useEffect } from "react";
import { useRecoilState } from "recoil";
import globalUserAtom from "../../../atoms/app/globalUserAtom";
import GettingStarted from "../components/gettingStarted";
import Hello from "../components/hello";
import Schedule from "../components/schedule";



export default function Home() {



    useEffect(() => {
        console.log("testing");
    }, []);

    return (
        <>
            <div className="pt-[80px] h-screen w-full bg-tan flex flex-col justify-center items-center p-10">

                <div style={{zoom:0.9}} className="h-[600px] w-full flex flex-row mt-12">
                    <Hello />
                    <GettingStarted/>
                </div>

            </div>
        </>

    )
}