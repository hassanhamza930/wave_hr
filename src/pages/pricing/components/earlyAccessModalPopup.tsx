import isEarlyAccessModalOpenAtom from "../../../atoms/pricing/earlyAccess"
import { useRecoilState } from "recoil";


export default function EarlyAccessModalPopup() {

    const [isEarlyAccessModalOpen, setIsEarlyAcessModalOpen] = useRecoilState(isEarlyAccessModalOpenAtom);

    return (
        <div className="fixed z-50 bg-bray/90 h-screen w-full flex justify-center items-center">
            <div className="h-min w-2/4 bg-tan rounded-xl flex justify-start items-start p-10 flex-col gap-3">
                <div className="flex flex-row w-full justify-between items-center">
                    <div className="text-breen text-6xl font-bold">Help us develop,</div>
                    <button onClick={()=>{setIsEarlyAcessModalOpen(false)}} className="bg-breen text-white rounded-md h-12 w-12 flex justify-center items-center text-breen text-3xl font-bold">X</button>
                </div>
                <div className="text-breen text-3xl">The future of recruitment software</div>
                <div className="text-breen text-xl mt-5 w-3/4">Wave allows a new generation of small scale startups to hire more efficiently with less resources and better outcomes</div>

                <div className="text-breen text-xl mt-5 w-24 text-white flex justify-center items-center px-4 py-2 bg-breen rounded-md">Buy</div>

                <div className="text-breen text-md mt-5 w-3/4">Buy the early access plan to support development and get exclusive features</div>


            </div>
        </div>
    )
}
