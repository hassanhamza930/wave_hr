import { HRFirm, Indivisual, Startup } from "./prices";

function Pricing() {
    return (
        <div className="h-screen w-full bg-tan flex flex-col justify-center items-center ">

            <div className="text-2xl tracking-tighter text-black mt-20">Explore what plan works for you</div>

            <div className="h-full w-full flex flex-row justify-center items-start gap-10 px-10 mt-10">
                <Indivisual />
                <Startup />
                {/* <HRFirm /> */}
            </div>

        </div>
    );
}

export default Pricing;