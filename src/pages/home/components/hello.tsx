import { useRecoilState } from "recoil";
import globalUserAtom from "../../../atoms/app/globalUserAtom";


export default function Hello() {
    const [globalUser, setGlobalUser] = useRecoilState(globalUserAtom);

    return (
        <div className="w-2/4 h-full flex justify-center items-start">
            <div className="mt-10 font-bold text-6xl text-black">Good Morning,<br></br>{globalUser.name}👋</div>
        </div>

    )
}