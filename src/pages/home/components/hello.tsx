import { useRecoilState } from "recoil";
import globalUserAtom from "../../../atoms/app/globalUserAtom";


export default function Hello() {
    const [globalUser, setGlobalUser] = useRecoilState(globalUserAtom);

    return (
        <div className="w-2/4 h-full flex justify-center items-center">
            <div className="font-bold text-6xl text-purple">Good Morning,<br></br>{globalUser.name}👋</div>
        </div>

    )
}