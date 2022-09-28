import isEarlyAccessModalOpenAtom from "../../../atoms/pricing/earlyAccess"
import { useRecoilState } from "recoil";

interface PricingCardProps{
    title:string,
    price:string,
    featureList:Array<string>,
    bray?:boolean
}



function PricingCard(props:PricingCardProps) {
    return (
        <div className={`border-2 ${props.bray==true?"border-bray/80":"border-purple"} hover:border-purple text-purple hover:text-white flex flex-col justify-start items-start gap-1 p-5 w-3/4 ${props.bray==true?"text-bray/80":"text-purple"} hover:bg-purple rounded-xl`}>
            <div className="flex flex-row justify-between items-center w-full">
                <div className="font-bold text-3xl">{props.title}</div>
                <div className="font-bold text-3xl flex flex-col justify-center items-center">{props.price} <div className="text-sm">per month</div></div>
            </div>
            <div className="ml-4">
                {
                props.featureList.map((e,index)=>{
                    return(
                        <li>{e}</li>
                    )
                })
                }
            </div>
        </div>
    )
}


function EarlyAccessPricingCard(props:PricingCardProps) {

    const [isEarlyAccessModalOpen,setIsEarlyAcessModalOpen]=useRecoilState(isEarlyAccessModalOpenAtom);

    return (
        <button onClick={()=>{
            setIsEarlyAcessModalOpen(true);
        }} className={`hover:border-2 ${props.bray==true?"border-bray/80":"border-[#F96666]"} hover:border-purple text-purple hover:text-white flex flex-col justify-start text-start items-start gap-1 p-5 w-3/4 ${props.bray==true?"text-bray/80":"text-bray"} hover:bg-purple bg-[#F96666]/90 rounded-xl`}>
            
            <div className="flex flex-row justify-between items-center w-full">
                <div className="font-bold text-3xl">{props.title}</div>
                <div className="font-bold text-3xl flex flex-col justify-center items-center">{props.price} <div className="text-sm">per month</div></div>
            </div>
            <div className="ml-4">
                {
                props.featureList.map((e,index)=>{
                    return(
                        <li>{e}</li>
                    )
                })
                }
            </div>


        </button>
    )
}



export default function PricingOptions() {
    return (
        <div className="w-[50%] h-full flex justify-center items-start flex-col text-start p-20 gap-5">

            <PricingCard bray={true} title="Free" price="$0.0" featureList={["1x1 Interview Calls","Upto 2 Job Postings","Email Automation"]} />
            <PricingCard title="Pro" price="$17" featureList={["Multiple Team Members on Interview Calls","Upto 10 Job Postings","Customized Emails"]} />
            <EarlyAccessPricingCard title="Early Access" price="$5" featureList={["Early Access to Features before they roll out","Custom Company banner and sticker on job applications","Unlimited Job Postings"]} />
            <div className="ml-2 text-bray">Help us develop the future of Recruitment Software 😀</div>
        </div>
    )
}