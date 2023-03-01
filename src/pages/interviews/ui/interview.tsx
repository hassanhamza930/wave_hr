import dayjs, { Dayjs } from 'dayjs'
import Timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { Timestamp } from "firebase/firestore"
import { useEffect, useState } from "react"
import { AvailabilityInterface } from '../../../standards/interfaces/interfaces';
import { Heading, SubHeading } from "../../../standards/styles/components/heading"
import PageLayout from "../../../standards/styles/layouts/pageLayout"
import TimePicker from 'react-time-picker';
import FormLayout from '../../../standards/styles/layouts/FormLayout';
import SimpleInput from '../../../standards/styles/components/inputs';
import { useNavigate } from 'react-router';
import Logo from "../../../images/logo.svg";
import calendlyLogo from "../../../images/calendly.svg";
import { GiInfinity } from 'react-icons/gi';
import { BiInfinite } from 'react-icons/bi';




export default function Interviews() {


    var availability: AvailabilityInterface = {} as AvailabilityInterface;
    const [calendlyLink, setCalendlyLink] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        var foreignTime = Timestamp.now().toDate().toLocaleString('en-EN', { hour: 'numeric', year: "numeric", hour12: false, timeZone: 'Asia/Calcutta', minute: "numeric" });
        const parsedDate = Date.parse(foreignTime);
        console.log(parsedDate);
        const localTime = new Date(parsedDate);
        console.log(localTime);
    }, [])




    return (
        <PageLayout>
            <FormLayout>

                <div className='gap-5 flex flex-row justify-center items-center '>
                    <img src={Logo} className="h-10 w-10"></img>
                    <BiInfinite className='h-10 w-10 text-black'/>
                    <img src={calendlyLogo} className="h-10 w-40 -mb-1"></img>

                </div>


                <Heading text="Schedule Interviews" customStyles='mt-10' />
                <SubHeading text="Set your availability and start scheduling interviews with potential candidates." />

                <SimpleInput customStyles='mt-20' placeholder='Please enter a calendly link for your meetings*' onChange={setCalendlyLink} value={calendlyLink} />
                <SubHeading customStyles='mt-5 text-sm text-black/70' text="Wave will use this link to email candidates who are approved for interviews, candidates can self schedule interviews on this link." />

                <div className='text-sm mt-5 text-black/90 flex flex-row justify-center items-center'>
                    To Setup a new calendly link, <button onClick={() => { window.open('https://www.calendly.com', '_blank') }} className='text-blue/90 pl-1 hover:scale-105 hover:px-1 font-medium'>Click Here</button>
                </div>



            </FormLayout>
        </PageLayout>
    )
}