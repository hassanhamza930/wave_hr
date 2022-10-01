import { useRecoilState } from "recoil";
import globalUserAtom from "../../../atoms/app/globalUserAtom";
import Hello from "../components/hello";
import Schedule from "../components/schedule";

export default function Home() {

    const [globalUser, setGlobalUser] = useRecoilState(globalUserAtom);

    return (
        <div className="pt-[80px] h-screen w-full bg-tan flex flex-col justify-start item-start p-20">
            
            <div className="h-[600px] w-full flex flex-row mt-12">

                <Hello/>
                <Schedule/>

            </div>




        </div>
    )
}