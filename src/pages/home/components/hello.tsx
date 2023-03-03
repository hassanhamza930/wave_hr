import { useRecoilState } from "recoil";
import globalUserAtom from "../../../atoms/app/globalUserAtom";


export default function Hello() {
    const [globalUser, setGlobalUser] = useRecoilState(globalUserAtom);

    var today = new Date()
    var curHr = today.getHours()
    var time = "";

    if (curHr < 12) {
        time = "Morning";
    } else if (curHr < 18) {
        time = "Afternoon";
    } else {
        time = "Evening"
    }

    return (
        <div className="w-2/4 h-full flex justify-center items-start">
            <div className="mt-10 font-bold text-6xl text-black">Good {time},<br></br>{globalUser.name}👋</div>
        </div>

    )
}