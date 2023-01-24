import GetAccess from "../components/getAccess";
import HumanInTheLoop from "../components/HumanInTheLoop";
import Pricing from "../components/pricing/pricing";


export default function LandingPage() {
    return (
        <div className="w-full bg-white flex justify-start items-center flex-col">
            <GetAccess />
            <Pricing />
            <HumanInTheLoop/>
        </div>
    )
}