import logo from "../../../images/logoBlackWhite.svg";

export default function WaveLooksGoodOnDesktop(){
    return(
        <div className="fixed z-[90] px-10 bg-blue h-screen gap-5 w-screen flex justify-center flex-col items-center">
            <img src={logo} className="h-24 w-24"></img>
            <div className="font-regular text-center text-xl text-tan">
                <b>Wave</b> Looks best on Desktop
            </div>

            <div className="mt-10 font-regular text-center text-md text-tan">
                We're working very hard to bring you a mobile version soon 😀 
            </div>

        </div>
    )

}