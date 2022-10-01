import isEarlyAccessModalOpenAtom from "../../../atoms/pricing/earlyAccess"
import GoPro from "../components/GoPro"
import PricingOptions from "../components/PricingOptions"
import { useRecoilState } from "recoil";
import EarlyAccessModalPopup from "../components/earlyAccessModalPopup";

export default function Pricing() {

    const [isEarlyAccessModalOpen, setIsEarlyAcessModalOpen] = useRecoilState(isEarlyAccessModalOpenAtom);

    return (
        <>
            {isEarlyAccessModalOpen==true&&<EarlyAccessModalPopup/>}
            <div className="bg-tan h-full w-full flex justify-center items-center p-20">

                <div className="flex h-full w-full flex-row justify-center items-center">

                    <GoPro />
                    <PricingOptions />
                </div>

            </div>
        </>
    )
}