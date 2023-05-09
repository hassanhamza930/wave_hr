import logo from "../../images/logoBlackWhite.svg";

export default function WaveLooksBestOnDesktop() {
    return (
        <div style={{ fontFamily: 'DM Sans' }} className="fixed z-[90] px-10 bg-darkblue h-screen gap-20 w-screen flex justify-center flex-col items-center">
            <div className="flex flex-col justify-center items-center gap-5">
                <img src={logo} className="h-24 w-24"></img>
                <div className="font-medium text-2xl text-tan text-center">Wave Looks best on <span className="underline">Desktop</span></div>
            </div>

            <div className="mt-10 font-regular text-center text-sm text-tan">
                We're working very hard to bring you a mobile version soon 😀
            </div>

        </div>
    )

}