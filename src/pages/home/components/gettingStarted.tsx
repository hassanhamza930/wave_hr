import { Heading } from "../../../standards/styles/components/heading";



function GettingStarted() {
    return ( 
        <div className="flex flex-col justify-start items-start">
            <Heading customStyles="mb-10" text="Let's get you started,"></Heading>
            <div className="flex flex-row justify-end items-center gap-4">
                <div className="h-4 w-4 rounded-full bg-blue"></div>
                <div className="text-md font-medium text-black">Setup a company profile</div>
            </div>
            <div className="h-20 w-1 ml-[6px] -mt-2 -mb-2 bg-blue">
            </div>
            <div className="flex flex-row justify-end items-center gap-4">
                <div className="h-4 w-4 rounded-full bg-blue"></div>
                <div className="text-md font-medium text-black">Post a job</div>
            </div>
            <div className="h-20 w-1 ml-[6px] -mt-2 -mb-2 bg-blue">
            </div>
            <div className="flex flex-row justify-end items-center gap-4">
                <div className="h-4 w-4 rounded-full bg-blue"></div>
                <div className="text-md font-medium text-black">Setup Interviews</div>
            </div>

        </div>
     );
}

export default GettingStarted;